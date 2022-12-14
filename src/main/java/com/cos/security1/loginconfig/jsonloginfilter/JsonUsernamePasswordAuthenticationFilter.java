package com.cos.security1.loginconfig.jsonloginfilter;

import java.io.IOException;
import java.util.Date;
import java.util.stream.Collectors;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.authentication.AuthenticationServiceException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.util.MimeTypeUtils;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.cos.security1.config.auth.PrincipalDetails;
import com.cos.security1.jwt.config.JwtProperties;
import com.cos.security1.model.User;
import com.fasterxml.jackson.databind.ObjectMapper;

public class JsonUsernamePasswordAuthenticationFilter extends UsernamePasswordAuthenticationFilter{

    private final ObjectMapper objectMapper = new ObjectMapper();
    
    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response)
            throws AuthenticationException {
        
        UsernamePasswordAuthenticationToken authenticationToken;
        
        System.out.println(request.getContentType());
        
        if (request.getContentType().equals(MimeTypeUtils.APPLICATION_JSON_VALUE)) {    // application/json
            // json request
            try {
                // read request body and mapping to login dto class by object mapper
                User user = objectMapper.readValue(request.getReader().lines().collect(Collectors.joining()), User.class);
                authenticationToken = UsernamePasswordAuthenticationToken.unauthenticated(user.getUserId(), user.getPassword());
                System.out.println(authenticationToken);
                
            } catch (IOException e) {
                e.printStackTrace();
                throw new AuthenticationServiceException("Request Content-Type(application/json) Parsing Error");
            }
            
        }else {
            // form-request
            String userId = obtainUsername(request);
            String password = obtainPassword(request);
            authenticationToken = UsernamePasswordAuthenticationToken.unauthenticated(userId, password);
        }
        this.setDetails(request, authenticationToken);
        return this.getAuthenticationManager().authenticate(authenticationToken);
    }

    // attemptAuthentication ?????? ??? ????????? ??????????????? ???????????? successfulAuthentication ????????? ?????????.
    // JWT ????????? ???????????? request????????? ??????????????? JWT????????? response ????????? ???.
//    @Override
//    protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain,
//            Authentication authResult) throws IOException, ServletException {
//        
//        PrincipalDetails principalDetails = (PrincipalDetails) authResult.getPrincipal();
//        
//        System.out.println("successfulAuthentication ?????????. ????????? ?????? ???????????? ??????.");
//        
//        // RSA????????? ?????? Hash????????????
//        String jwtToken = JWT.create()
//                .withSubject("cos??????")   // ?????? ??????. ??? ????????? ??????.
//                .withExpiresAt(new Date(System.currentTimeMillis()+JwtProperties.EXPIRATION_TIME))  // ?????? ?????? ??????((1???) * 10)
//                .withClaim("userId", principalDetails.getUser().getUserId())    // ?????? ?????? ?????? ????????? key??? value ???
//                .withClaim("email", principalDetails.getUser().getEmail())    // ?????? ?????? ?????? ????????? key??? value ???
//                .withClaim("username", principalDetails.getUser().getUsername())    // ?????? ?????? ?????? ????????? key??? value ???
//                .sign(Algorithm.HMAC512(JwtProperties.SECRET));
//        
//        response.addHeader("Authorization", "Bearer " + jwtToken);
//    }
    
}