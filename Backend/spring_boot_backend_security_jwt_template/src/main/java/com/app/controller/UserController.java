package com.app.controller;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.dto.SignInDto;
import com.app.dto.SignInResponse;
import com.app.dto.SignupDto;
import com.app.dto.SignupResponse;
import com.app.entities.Role;
import com.app.entities.User;
import com.app.security.CustomUserDetails;
import com.app.security.JwtUtils;
import com.app.service.UserService;



@RestController
@RequestMapping("/user")
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {
	
	@Autowired
	private PasswordEncoder enc;
	@Autowired
	private UserService userService;
	
	@Autowired
	private JwtUtils jwtUtils;
	
	@Autowired
	private AuthenticationManager authMgr;

	/*
	 * URL - http://host:port/users/signin Method - POST request payload : Auth req
	 * DTO : email n password resp payload : In case of success : Auth Resp DTO :
	 * mesg + JWT token + SC 201 In case of failure : SC 401
	 * 
	 */
	
	
	 @PostMapping("/signup")
	    public ResponseEntity<?> registerUser(@RequestBody @Valid SignupDto signUpRequest) {
	        // Check if user already exists
	        if (userService.existsByEmail(signUpRequest.getEmail())) {
	            return ResponseEntity
	                    .status(HttpStatus.BAD_REQUEST)
	                    .body(new SignupResponse("Error: Email is already in use!"));
	        }

	        // Create new user's account
	        User user = new User();
	        user.setFirstName(signUpRequest.getFirstName());
	        user.setLastName(signUpRequest.getLastName());
	        user.setEmail(signUpRequest.getEmail());
	        user.setPassword(enc.encode(signUpRequest.getPassword()));
            Role userRole;
            if (signUpRequest.getRole() == null || signUpRequest.getRole().isEmpty()) {
                userRole = Role.CUSTOMER;  // Default role
            } else {
                try {
                    userRole = Role.valueOf(signUpRequest.getRole());
                } catch (IllegalArgumentException e) {
                    userRole = Role.CUSTOMER;  // Fallback to default role if invalid
                }
            }
            user.setUserRole(userRole);
	        userService.saveUser(user);

	        return ResponseEntity
	                .status(HttpStatus.CREATED)
	                .body(new SignupResponse("User registered successfully!"));
	    }
	
	
	@PostMapping("/signin")
	public ResponseEntity<?> authenticateUser(@RequestBody 
			@Valid SignInDto request) {
		System.out.println("in sign in" + request);
		//create a token(implementation of Authentication i/f)
		//to store un verified user email n pwd
		UsernamePasswordAuthenticationToken token=new UsernamePasswordAuthenticationToken(request.getEmail(),request.getPassword());
		//invoke auth mgr's authenticate method;
		Authentication verifiedToken = authMgr.authenticate(token);
		//=> authentication n authorization  successful !
		System.out.println(verifiedToken.getPrincipal().getClass());//custom user details object
		CustomUserDetails userDetails = (CustomUserDetails) verifiedToken.getPrincipal();
        String firstName = userDetails.getFirstName();
        String lastName = userDetails.getLastName();
		//create JWT n send it to the clnt in response
		SignInResponse resp=new SignInResponse(jwtUtils.generateJwtToken(verifiedToken),"Successful Auth!!!!",firstName,lastName);
		return ResponseEntity.status(HttpStatus.CREATED).body(resp);
	}
    
	
	@GetMapping("/count")
	public ResponseEntity<?> Users(){
		return ResponseEntity.status(HttpStatus.OK).body(userService.totalUsers());
	}
 
}
