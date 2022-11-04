package com.cos.security1.loginconfig.handler.oauth;

import java.io.IOException;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.util.MimeTypeUtils;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.cos.jwt.config.jwt.JwtProperties;
import com.cos.security1.config.auth.PrincipalDetails;
import com.cos.security1.model.User;
import com.fasterxml.jackson.databind.ObjectMapper;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Configuration
public class Oauth2LoginSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

    private final ObjectMapper objectMapper;
    
    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
        String targetUrl = determineTargetUrl(request, response, authentication);

        if (response.isCommitted()) {
            logger.debug("Response has already been committed. Unable to redirect to " + targetUrl);
            return;
        }
        System.out.println("oauth 로그인 성공. handler에서 토큰 발급.");
        
        response.setStatus(HttpStatus.OK.value());
        response.setContentType(MimeTypeUtils.APPLICATION_JSON_VALUE);
        response.setCharacterEncoding("utf-8");
        
        PrincipalDetails principalDetails = (PrincipalDetails)authentication.getPrincipal();
        
        
        User userEntity = principalDetails.getUser();
        
        // RSA방식이 아닌 Hash암호방식
        String jwtToken = JWT.create()
                .withSubject("cos토큰")   // 토큰 이름. 큰 의미는 없음.
                .withExpiresAt(new Date(System.currentTimeMillis()+JwtProperties.EXPIRATION_TIME))  // 토큰 만료 시간((1분) * 10)
                .withClaim("email", principalDetails.getUser().getUserEmail())    // 내가 넣고 싶은 비공개 key와 value 값
                .sign(Algorithm.HMAC512(JwtProperties.SECRET));
        
        Map<String, String> map = new HashMap<>();
        
        map.put("result", "true");
        map.put("email", userEntity.getUserEmail());
        
        String result = objectMapper.writeValueAsString(map);
        
//        response.sendRedirect("/");
        response.addHeader("Authorization", "Bearer " + jwtToken);
        response.getWriter().write(result);
//        getRedirectStrategy().sendRedirect(request, response, targetUrl);
        
        
        
    }
    
    
}
