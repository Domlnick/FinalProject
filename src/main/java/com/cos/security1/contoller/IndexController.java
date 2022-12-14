package com.cos.security1.contoller;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.auth0.jwt.exceptions.TokenExpiredException;
import com.cos.security1.config.auth.PrincipalDetails;
import com.cos.security1.config.auth.PrincipalDetailsService;
import com.cos.security1.email.EmailService;
import com.cos.security1.jwt.config.JwtProperties;
import com.cos.security1.jwt.config.JwtRefreshTokenService;
import com.cos.security1.model.NotSignedUser;
import com.cos.security1.model.User;
import com.cos.security1.repository.NotSignedUserRepository;
import com.cos.security1.repository.UserRepository;
import com.fasterxml.jackson.databind.ObjectMapper;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequiredArgsConstructor
@RestController
public class IndexController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private NotSignedUserRepository notSignedUserRepository;
    
    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    @Autowired
    private PrincipalDetailsService principalDetailService;
    
    @Autowired
    private JwtRefreshTokenService jwtRefreshTokenService;

    private final EmailService emailService;

    private final ObjectMapper objectMapper = new ObjectMapper();

    @GetMapping("/test/login")
    public @ResponseBody String loginTest(Authentication authentication, // DI(????????? ??????). ????????? ?????? ???????????? ?????? ????????? ??? ??????. ????????? ?????????
                                                                         // ????????? ??? null???
            @AuthenticationPrincipal PrincipalDetails userDetails) { // @AuthenticationPrincipal??? ?????? session ????????? ????????? ???
                                                                     // ??????. PrincipalDetails??? userDetails??? ??????????????? ????????? ??????
                                                                     // ?????? ?????? ??????.

        System.out.println("/test/login==========");
        PrincipalDetails principalDetails = (PrincipalDetails) authentication.getPrincipal(); // Down Casting
        System.out.println("authentication:" + principalDetails.getUser());
        System.out.println("userDetails:" + userDetails.getUser());
        return "?????? ?????? ????????????";
    }

    @GetMapping("/test/oauth/login")
    public @ResponseBody String oauthLoginTest(Authentication authentication, // DI(????????? ??????)
            @AuthenticationPrincipal OAuth2User oauth) {

        System.out.println("/test/oauth/login==========");
        OAuth2User oauth2User = (OAuth2User) authentication.getPrincipal(); // Down Casting
        System.out.println("authentication:" + oauth2User.getAttributes());
        System.out.println("oauth2User:" + oauth.getAttributes());

        return "OAuth ?????? ?????? ????????????";
    }

    // localhost:8080 //
    @GetMapping({ "", "/" })
    public @ResponseBody String index(HttpServletRequest request) {
        // mustache ?????? (template??? ??? ??????). ?????? ?????? src/main/resources/
        // view resolver ?????? : templates (prefix).mustache (suffix) ?????? ??????.
        return "index"; // src/main/resources/templates/index.mustache ??? ?????? ????????? ??????.
    }

    /*
     * security session ?????? ????????? Authentication ????????? ????????? ??? ????????? ??? ?????? ????????? UserDetails ?????????
     * OAuth2User ????????? ?????????.
     * ????????? ????????? ????????? ??? ?????? ?????? ???????????? ??? ??? ????????? ???????????? ?????????????????? ?????????????????? UserDetails??? OAuth2User???
     * ?????? ???????????? ?????? PrincipalDetails??? method??? override?????? ????????????.
     */
    // OAuth ??? ?????? ???????????? ?????? PrincipalDetails??? ?????????.
    @GetMapping("/user")
    public @ResponseBody String user(@AuthenticationPrincipal PrincipalDetails principalDetails) {
        System.out.println("principalDetails:" + principalDetails.getUser());
        return "user";
    }

    @GetMapping("/admin")
    public @ResponseBody String admin() {
        return "admin";
    }

    @GetMapping("/manager")
    public @ResponseBody String manager() {
        return "manager";
    }

    // ????????? ??????????????? ?????? ????????? intercept???..
    // -> SecurityConfig ?????? ?????? ??? @Bean?????? ????????? ?????? ?????? ?????? ?????? ??? intercept??? ?????? ??????!
    @GetMapping("/loginForm")
    public String loginForm() {
        return "loginForm";
    }

    @GetMapping("/joinForm")
    public String joinForm() {
        return "joinForm";
    }

    // JSON, xml ????????? ?????????
    @PostMapping("/join")
    public @ResponseBody Map<String, Boolean> joinUser(@RequestBody User user) throws Exception {
        
        System.out.println(user.getUserId());
        User newUser = user;
        Map<String, Boolean> result = new HashMap<>();
        
        boolean isExistId = principalDetailService.checkExistUserId(user.getUserId());
        boolean isExistEmail = principalDetailService.checkExistUserEmail(user.getUserEmail());
        
        if(!isExistId && !isExistEmail) {
            principalDetailService.joinUser(newUser);
            emailService.sendMail(user, "register");
            result.put("result", true);
            
            return result;
        } else if(isExistId == true || isExistEmail == true) {
            result.put("result", false);
            result.put("isExistId", isExistId);
            result.put("isExistEmail", isExistEmail);

            return result;
        }
        
        return result;
    }
    
    @GetMapping("/sendcodeid")
    public Map<String, String> sendCodeToUserMailForUserId(HttpServletRequest httpServletRequest, User user) throws Exception{
        String type = "findid";
        Map<String, String> result = new HashMap<>();
        User newUser = userRepository.findByUserEmail(user.getUserEmail());
        String sentKey = emailService.sendMail(newUser, type);
        
        result.put("authcode", sentKey);
        
        return result;
    }
    
    @GetMapping("/sendcodepw")
    public Map<String, String> sendCodeToUserMailForUserPw(HttpServletRequest httpServletRequest, User user) throws Exception{
        String type = "findpw";
        Map<String, String> result = new HashMap<>();
        int memberCnt = userRepository.countUserByUserIdAndUserNameAndUserEmail(user.getUserId(), user.getUserName(), user.getUserEmail());
        
        if(memberCnt == 1) {
        String sentKey = emailService.sendMail(user, type);
            
        result.put("authcode", sentKey);
            result.put("result", "true");                  
        } else {
            result.put("result", "false");
        }
        
        return result;
    }
    
    @GetMapping("/checkexistemail")
    public @ResponseBody Map<String, Boolean> isExistEmail(User user) throws Exception {
        
        Map<String, Boolean> result = new HashMap<>();
        
        boolean isExistEmail = principalDetailService.checkExistUserEmail(user.getUserEmail());
        System.out.println(isExistEmail);
        
        if(isExistEmail == true) {
            result.put("result", true);
            return result;
        }else if(isExistEmail == false) {
            result.put("result", false);
            return result;
        }
        return result;
    }
    
    @GetMapping("/checkexistid")
    public @ResponseBody Map<String, Boolean> isExistid(User user) throws Exception {
        
        Map<String, Boolean> result = new HashMap<>();
        
        boolean isExistid = principalDetailService.checkExistUserId(user.getUserId());
        System.out.println(isExistid);
        
        if(isExistid == true) {
            result.put("result", true);
            return result;
        }else if(isExistid == false) {
            result.put("result", false);
            return result;
        }
        return result;
    }
    
    
    @PostMapping("/issignedin")
    public @ResponseBody Map<String, Integer> isSignedIn(@RequestBody NotSignedUser notSignedUser) throws Exception {
        
        Map<String, Integer> result = new HashMap<>();
        NotSignedUser thisUser = notSignedUserRepository.findByvisitUserIp(notSignedUser.getVisitUserIp());
        int totalCnt = 0;
        if(thisUser != null) {
            totalCnt += thisUser.getUsedCount();
        }
        
        boolean signedIn = principalDetailService.manageVisitingUser(notSignedUser);
        
        if(signedIn) {
            result.put("result", totalCnt);
            return result;
        }else {
            result.put("result", 999);
        }
        
        return result;
    }

    @Secured("ROLE_ADMIN") // ?????? ????????? ?????? ????????? ??????????????? ?????? ??????. SecurityConfig?????? ?????? Class???
                           // @EnableGlobalMethodSecurity(securedEnabled=true) ?????? ???????????? ???!
    @GetMapping("/info")
    public @ResponseBody String info() {
        return "????????????";
    }

    @PreAuthorize("hasRole('ROLE_MANAGER') or hasRole('ROLE_ADMIN')") // data?????? method ????????? ??????????????? ?????? ????????? ?????? ????????? ?????? ??????.
                                                                      // SecurityConfig?????? ?????? Class???
                                                                      // @EnableGlobalMethodSecurity(prePostEnabled=true)
                                                                      // ?????? ???????????? ???!
    @GetMapping("/data")
    public @ResponseBody String data() {
        return "???????????????";
    }

    // JSON ???????????? ?????? ??? return
    @GetMapping("/findUserId")
    public @ResponseBody boolean findUserId(User user) {

        boolean findUsername = principalDetailService.findUserId(user);

        return findUsername;
    }

    // JSON ???????????? ?????? ??? return
    @GetMapping("/findEmail")
    public @ResponseBody boolean findEmail(User user) {

        boolean findEmail = principalDetailService.findUserEmail(user);

        return findEmail;
    }

    // JSON ???????????? ?????? ??? return
    @GetMapping("/findUserIdByEmailAndUsername")
    public @ResponseBody Map<String, String> findUserIdByEmailAndUsername(HttpServletRequest httpServletRequest, User user) {

        Map<String, String> result = new HashMap<>();

        String userId = principalDetailService.findUserIdByUserEmailAndUserName(user);

        result.put("result", userId);

        return result;
    }

    // JSON ???????????? ?????? ??? return. ????????? ??? session??? ????????? ???????????? ??????????????? ????????? ??? ????????? ????????? ??????.
    @PostMapping("/updatelogineduserpw")
    public @ResponseBody Map<String, String> updateLoginedUserPassword(@RequestBody User user,
            @AuthenticationPrincipal PrincipalDetails principalDetails) {

        Map<String, String> result = new HashMap<>();
        System.out.println(principalDetails);
        System.out.println(user);
        if (principalDetails != null) {

            String updateUserPassword = principalDetailService.updateLoginedUserPassword(user, principalDetails);

            result.put("result", updateUserPassword);
            result.put("test", "????????????");

        } else {
            result.put("result", "???????????? ??????????????? ???????????????"); // SecurityConfig?????? user/**??? ?????? ????????? ????????? loginForm?????? ?????? ????????? ???????????????.

        }

        return result;
    }

    @PostMapping("/updateuserpw")
    public @ResponseBody Map<String, String> updateUnloginedUserPassword(@RequestBody User user) {

        Map<String, String> result = new HashMap<>();
        System.out.println(user.getUserId());
        System.out.println(user.getUserEmail());
        System.out.println(user.getPassword());
        
        if (user.getUserId() != null && user.getUserEmail() != null) {

            String updateUserPassword = principalDetailService.updateUnloginedUserPassword(user);

            result.put("result", updateUserPassword);
        } else {
            result.put("result", "????????? ????????? ????????? ??????????????????.");
        }

        return result;
    }

    @GetMapping("/refresh")
    public @ResponseBody Map<String, String> refreshToken(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException{
        Map<String, String> result = new HashMap<>();
        
        String authorizationHeader = request.getHeader(JwtProperties.HEADER_STRING);
//        System.out.println(authorizationHeader);

        if(authorizationHeader != null && authorizationHeader.startsWith(JwtProperties.TOKEN_PREFIX)) {
            try {
                Map<String, String> refreshTokenRequest = jwtRefreshTokenService.refresh(authorizationHeader.substring("Bearer.".length()));
                for (String mapKey:refreshTokenRequest.keySet()) {
                    System.out.println("Key:"+mapKey+", Value:"+refreshTokenRequest.get(mapKey));
                    
                    response.addHeader(mapKey, refreshTokenRequest.get(mapKey));
                    
//                    Cookie cookie = new Cookie(mapKey, refreshTokenRequest.get(mapKey));
//                    cookie.setDomain("localhost");
//                    cookie.setPath("/");
//                    // ????????????
//                    cookie.setMaxAge(JwtProperties.RT_EXPIRATION_TIME / 1000);
//                    cookie.setSecure(true);
//                    response.addCookie(cookie);
//                    System.out.println("******");
                }
                result.put("result", "?????? ????????? ??????.");
            }catch(TokenExpiredException e) {
                result.put("result", "????????? ???????????????. ?????? ????????? ?????????.(refresh ???????????? ?????????)");
            }
            
        }else {
            result.put("result", "header ????????? ???????????????.");
        }
        return result;
    }
    
}
