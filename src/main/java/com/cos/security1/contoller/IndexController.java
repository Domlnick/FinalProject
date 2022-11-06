package com.cos.security1.contoller;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

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
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.cos.security1.config.auth.PrincipalDetails;
import com.cos.security1.config.auth.PrincipalDetailsService;
import com.cos.security1.email.EmailService;
import com.cos.security1.model.User;
import com.cos.security1.repository.UserRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.nimbusds.jose.shaded.json.parser.ParseException;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequiredArgsConstructor
@RestController
public class IndexController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    @Autowired
    PrincipalDetailsService principalDetailService;

    private final EmailService emailService;

    private final ObjectMapper objectMapper = new ObjectMapper();

    @GetMapping("/test/login")
    public @ResponseBody String loginTest(Authentication authentication, // DI(의존성 주입). 로그인 성공 이후에만 권한 가져올 수 있음. 로그인 이전에
                                                                         // 불러올 시 null값
            @AuthenticationPrincipal PrincipalDetails userDetails) { // @AuthenticationPrincipal을 통해 session 정보를 가져올 수
                                                                     // 있다. PrincipalDetails는 userDetails을 상속받았기 때문에 해당
                                                                     // 타입 사용 가능.

        System.out.println("/test/login==========");
        PrincipalDetails principalDetails = (PrincipalDetails) authentication.getPrincipal(); // Down Casting
        System.out.println("authentication:" + principalDetails.getUser());
        System.out.println("userDetails:" + userDetails.getUser());
        return "세션 정보 확인하기";
    }

    @GetMapping("/test/oauth/login")
    public @ResponseBody String oauthLoginTest(Authentication authentication, // DI(의존성 주입)
            @AuthenticationPrincipal OAuth2User oauth) {

        System.out.println("/test/oauth/login==========");
        OAuth2User oauth2User = (OAuth2User) authentication.getPrincipal(); // Down Casting
        System.out.println("authentication:" + oauth2User.getAttributes());
        System.out.println("oauth2User:" + oauth.getAttributes());

        return "OAuth 세션 정보 확인하기";
    }

    // localhost:8080 //
    @GetMapping({ "", "/" })
    public @ResponseBody String index(HttpServletRequest request) {
        // mustache 사용 (template의 한 종류). 기본 폴더 src/main/resources/
        // view resolver 설정 : templates (prefix).mustache (suffix) 생략 가능.
        return "index"; // src/main/resources/templates/index.mustache 를 기본 경로로 찾음.
    }

    /*
     * security session 객체 안에는 Authentication 객체만 들어갈 수 있는데 이 객체 안에는 UserDetails 객체와
     * OAuth2User 객체만 가능함.
     * 그런데 구글로 로그인 할 때와 일반 로그인을 할 떄 다르게 메소드를 작성해버리면 복잡해지므로 UserDetails와 OAuth2User를
     * 다중 상속받게 하여 PrincipalDetails에 method를 override해서 사용한다.
     */
    // OAuth 및 일반 로그인을 해도 PrincipalDetails로 받아옴.
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

    // 스프링 시큐리티가 해당 주소를 intercept함..
    // -> SecurityConfig 파일 생성 후 @Bean에서 등록한 특정 경로 제외 설정 후 intercept를 하지 않음!
    @GetMapping("/loginForm")
    public String loginForm() {
        return "loginForm";
    }

    @GetMapping("/joinForm")
    public String joinForm() {
        return "joinForm";
    }

    // JSON, xml 타입만 받도록
    @PostMapping("/join")
    public @ResponseBody Map<String, Boolean> joinUser(@RequestBody User user) throws Exception {
        
//        System.out.println(user.getEmail());
//        System.out.println(user.getName());
//        System.out.println(user.getUserId());
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
    public @ResponseBody Map<String, String> sendCodeToUserMailForUserId(HttpServletRequest httpServletRequest, User user) throws Exception{
        String type = "findid";
        Map<String, String> result = new HashMap<>();
        User newUser = userRepository.findByUserEmail(user.getUserEmail());
//        String sentKey = emailService.sendMail(newUser, type);
        
//        result.put("authcode", sentKey);
        result.put("authcode", "aaaaaa");
        
        return result;
    }
    
    @GetMapping("/sendcodepw")
    public @ResponseBody Map<String, String> sendCodeToUserMailForUserPw(HttpServletRequest httpServletRequest, User user) throws Exception{
        String type = "findpw";
        Map<String, String> result = new HashMap<>();
        int memberCnt = userRepository.countUserByUserIdAndUserNameAndUserEmail(user.getUserId(), user.getUserName(), user.getUserEmail());
        
        if(memberCnt == 1) {
        String sentKey = emailService.sendMail(user, type);
            
        result.put("authcode", sentKey);
            result.put("result", "true");
            result.put("authcode", sentKey);            
//            result.put("authcode", "aaaaaa");            
        } else {
            result.put("result", "false");
        }
        
        return result;
    }
    
    @GetMapping("/checkexistemail")
    public @ResponseBody Map<String, Boolean> isExistEmail(HttpServletRequest httpServletRequest, User user) throws Exception {
        
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
    public @ResponseBody Map<String, Boolean> isExistid(@RequestBody User user) throws Exception {
        
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
    

    @PostMapping("/upload")
    public Map<String, String> uploadImage(@RequestBody String file) throws ParseException {
        Map<String, String> result = new HashMap<>();
        
        
//        JSONObject jsonObject = new JSONObject(file);
        
//        System.out.println(stringFile);
        
//        result.put("file", file);
        
        
        
        System.out.println(file);
        System.out.println("clear");
        
        return result;
    }

    @Secured("ROLE_ADMIN") // 특정 권한을 가진 유저만 해당경로로 접근 가능. SecurityConfig에서 해당 Class를
                           // @EnableGlobalMethodSecurity(securedEnabled=true) 처리 해주어야 함!
    @GetMapping("/info")
    public @ResponseBody String info() {
        return "개인정보";
    }

    @PreAuthorize("hasRole('ROLE_MANAGER') or hasRole('ROLE_ADMIN')") // data라는 method 직전에 실행되면서 특정 권한을 가진 사람만 접근 가능.
                                                                      // SecurityConfig에서 해당 Class를
                                                                      // @EnableGlobalMethodSecurity(prePostEnabled=true)
                                                                      // 처리 해주어야 함!
    @GetMapping("/data")
    public @ResponseBody String data() {
        return "데이터정보";
    }

    // JSON 타입으로 변환 후 return
    @GetMapping("/findUserId")
    public @ResponseBody boolean findUserId(@RequestBody User user) {

        boolean findUsername = principalDetailService.findUserId(user);

        return findUsername;
    }

    // JSON 타입으로 변환 후 return
    @GetMapping("/findEmail")
    public @ResponseBody boolean findEmail(@RequestBody User user) {

        boolean findEmail = principalDetailService.findUserEmail(user);

        return findEmail;
    }

    // JSON 타입으로 변환 후 return
    @GetMapping("/findUserIdByEmailAndUsername")
    public @ResponseBody Map<String, String> findUserIdByEmailAndUsername(HttpServletRequest httpServletRequest, User user) {

        Map<String, String> result = new HashMap<>();

        String userId = principalDetailService.findUserIdByUserEmailAndUserName(user);

        result.put("result", userId);

        return result;
    }

    // JSON 타입으로 변환 후 return. 로그인 후 session에 권한이 저장되어 있어야지만 수정할 수 있도록 해놓을 예정.
    @PostMapping("/user/updateLoginedUserPassword")
    public @ResponseBody Map<String, String> updateLoginedUserPassword(@RequestBody User user,
            @AuthenticationPrincipal PrincipalDetails principalDetails) {

        Map<String, String> result = new HashMap<>();

        if (principalDetails != null) {

            String updateUserPassword = principalDetailService.updateLoginedUserPassword(user, principalDetails);

            result.put("result", updateUserPassword);

        } else {
            result.put("result", "로그인이 되어있는지 확인하세요"); // SecurityConfig에서 user/**에 대해 권한이 없으면 loginForm으로 바로 가도록 설정해놓음.

        }

        return result;
    }

    @PostMapping("/updateUnloginedUserPassword")
    public @ResponseBody Map<String, String> updateUnloginedUserPassword(@RequestBody User user) {

        Map<String, String> result = new HashMap<>();

        if (user.getUserId() != null && user.getUserEmail() != null && user.getUserName() != null) {

            String updateUserPassword = principalDetailService.updateUnloginedUserPassword(user);

            result.put("result", updateUserPassword);
        } else {
            result.put("result", "누락된 정보가 없는지 확인해주세요.");
        }

        return result;
    }

}