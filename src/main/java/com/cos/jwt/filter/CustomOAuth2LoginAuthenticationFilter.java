package com.cos.jwt.filter;

import java.io.IOException;
import java.util.Date;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.convert.converter.Converter;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.oauth2.client.OAuth2AuthorizedClient;
import org.springframework.security.oauth2.client.OAuth2AuthorizedClientService;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.oauth2.client.authentication.OAuth2LoginAuthenticationToken;
import org.springframework.security.oauth2.client.registration.ClientRegistration;
import org.springframework.security.oauth2.client.registration.ClientRegistrationRepository;
import org.springframework.security.oauth2.client.web.AuthorizationRequestRepository;
import org.springframework.security.oauth2.client.web.HttpSessionOAuth2AuthorizationRequestRepository;
import org.springframework.security.oauth2.client.web.OAuth2AuthorizedClientRepository;
import org.springframework.security.oauth2.client.web.OAuth2LoginAuthenticationFilter;
import org.springframework.security.oauth2.core.endpoint.OAuth2AuthorizationExchange;
import org.springframework.security.oauth2.core.endpoint.OAuth2AuthorizationRequest;
import org.springframework.security.oauth2.core.endpoint.OAuth2AuthorizationResponse;
import org.springframework.security.oauth2.core.endpoint.OAuth2ParameterNames;
import org.springframework.security.web.util.UrlUtils;
import org.springframework.util.Assert;
import org.springframework.util.MultiValueMap;
import org.springframework.web.util.UriComponentsBuilder;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.cos.jwt.config.jwt.JwtProperties;
import com.cos.security1.config.auth.PrincipalDetails;
import com.cos.security1.utils.OAuth2AuthorizationResponseUtils;

/*
 * 
 * 
 * security_react_test02에서 사용해보려다가 구현이 너무 힘들어서 다른 방법으로 채택. -> exclude 해놓음.
 * handler에서 성공 실패 나눠서 처리 후 성공 시 토큰 전송
 * 
 * 
 */








public class CustomOAuth2LoginAuthenticationFilter extends OAuth2LoginAuthenticationFilter  {
    
    @Autowired
    private ClientRegistrationRepository clientRegistrationRepository;

    @Autowired
    private OAuth2AuthorizedClientRepository authorizedClientRepository;

    @Autowired
    private AuthorizationRequestRepository<OAuth2AuthorizationRequest> authorizationRequestRepository = new HttpSessionOAuth2AuthorizationRequestRepository();

    @Autowired
    private Converter<OAuth2LoginAuthenticationToken, OAuth2AuthenticationToken> authenticationResultConverter = this::createAuthenticationResult;
    
    public CustomOAuth2LoginAuthenticationFilter(ClientRegistrationRepository clientRegistrationRepository,
            OAuth2AuthorizedClientService authorizedClientService) {
        super(clientRegistrationRepository, authorizedClientService);
        this.clientRegistrationRepository = clientRegistrationRepository;
    }


    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response)
            throws AuthenticationException {
        
        System.out.println("여기 나 있어요");
        MultiValueMap<String, String> params = OAuth2AuthorizationResponseUtils.toMultiMap(request.getParameterMap());
        System.out.println("params : " + params);
        
        OAuth2AuthorizationRequest authorizationRequest = this.authorizationRequestRepository
                .removeAuthorizationRequest(request, response);
        
        String registrationId = authorizationRequest.getAttribute(OAuth2ParameterNames.REGISTRATION_ID);
        
        ClientRegistration clientRegistration = this.clientRegistrationRepository.findByRegistrationId(registrationId);
        System.out.println("==========");
        System.out.println(clientRegistration);
        
        // @formatter:off
        String redirectUri = UriComponentsBuilder.fromHttpUrl(UrlUtils.buildFullRequestUrl(request))
                .replaceQuery(null)
                .build()
                .toUriString();
        
        // @formatter:on
        OAuth2AuthorizationResponse authorizationResponse = OAuth2AuthorizationResponseUtils.convert(params,
                redirectUri);
        System.out.println("^^^^^^^^^^^^^^^^^^");
        System.out.println(authorizationResponse);
        
        Object authenticationDetails = this.authenticationDetailsSource.buildDetails(request);
        OAuth2LoginAuthenticationToken authenticationRequest = new OAuth2LoginAuthenticationToken(clientRegistration,
                new OAuth2AuthorizationExchange(authorizationRequest, authorizationResponse));
        authenticationRequest.setDetails(authenticationDetails);
        System.out.println("***********");
        System.out.println(authenticationRequest);
        
        // 여기서부터 진행 x
        OAuth2LoginAuthenticationToken authenticationResult = (OAuth2LoginAuthenticationToken) this
                .getAuthenticationManager().authenticate(authenticationRequest);
        System.out.println("&&&&&&&&&&&&&&&&&&&&");
        System.out.println(authenticationResult);
        
        OAuth2AuthenticationToken oauth2Authentication = this.authenticationResultConverter
                .convert(authenticationResult);
        Assert.notNull(oauth2Authentication, "authentication result cannot be null");
        oauth2Authentication.setDetails(authenticationDetails);
        OAuth2AuthorizedClient authorizedClient = new OAuth2AuthorizedClient(
                authenticationResult.getClientRegistration(), oauth2Authentication.getName(),
                authenticationResult.getAccessToken(), authenticationResult.getRefreshToken());

        this.authorizedClientRepository.saveAuthorizedClient(authorizedClient, oauth2Authentication, request, response);
        return oauth2Authentication;
    }
    
    @Override
    protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain,
            Authentication authResult) throws IOException, ServletException {
        PrincipalDetails principalDetails = (PrincipalDetails) authResult.getPrincipal();
        
        System.out.println("successfulAuthentication 실행됨. 인증이 완료 되었다는 뜻임.");
        
        // RSA방식이 아닌 Hash암호방식
        String jwtToken = JWT.create()
                .withSubject("cos토큰")   // 토큰 이름. 큰 의미는 없음.
                .withExpiresAt(new Date(System.currentTimeMillis()+JwtProperties.EXPIRATION_TIME))  // 토큰 만료 시간((1분) * 10)
                .withClaim("email", principalDetails.getUser().getEmail())    // 내가 넣고 싶은 비공개 key와 value 값
                .sign(Algorithm.HMAC512(JwtProperties.SECRET));
        
        response.addHeader("Authorization", "Bearer " + jwtToken);;
    }
	
    private OAuth2AuthenticationToken createAuthenticationResult(OAuth2LoginAuthenticationToken authenticationResult) {
        return new OAuth2AuthenticationToken(authenticationResult.getPrincipal(), authenticationResult.getAuthorities(),
                authenticationResult.getClientRegistration().getRegistrationId());
    }
    
}
