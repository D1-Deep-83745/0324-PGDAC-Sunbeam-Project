package com.app.controller;

import java.awt.Image;
import java.io.IOException;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.app.dto.SignInDto;
import com.app.dto.SignInResponse;
import com.app.dto.SignupDto;
import com.app.dto.SignupResponse;
import com.app.dto.UserDTO;
import com.app.entities.Role;
import com.app.entities.User;
import com.app.repository.UserRepository;
import com.app.security.CustomUserDetails;
import com.app.security.JwtUtils;
import com.app.service.UserImageHandlingService;
import com.app.service.UserService;
import static org.springframework.http.MediaType.IMAGE_GIF_VALUE;
import static org.springframework.http.MediaType.IMAGE_JPEG_VALUE;
import static org.springframework.http.MediaType.IMAGE_PNG_VALUE;





@RestController
@RequestMapping("/user")
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {
	
	@Autowired
	private PasswordEncoder enc;
	@Autowired
	private UserService userService;
	@Autowired
	private UserRepository userRepo;
	@Autowired
	private JwtUtils jwtUtils;
	
	@Autowired
	private AuthenticationManager authMgr;
	
	@Autowired
	private UserImageHandlingService imageService;

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
            user.setUserRole(Role.valueOf(signUpRequest.getRole()));
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
        String Role = userDetails.getRole();
        Long id = userDetails.getId();
		//create JWT n send it to the clnt in response
		SignInResponse resp=new SignInResponse(jwtUtils.generateJwtToken(verifiedToken),"Successful Auth!!!!",firstName,lastName,Role,id);
		return ResponseEntity.status(HttpStatus.CREATED).body(resp);
	}
    
	
	@GetMapping("/count")
	public ResponseEntity<?> Users(){
		return ResponseEntity.status(HttpStatus.OK).body(userService.totalUsers());
	}
    
	@GetMapping("/getAll")
	public ResponseEntity<?> getallUsers(){
		return ResponseEntity.status(HttpStatus.OK).body(userService.getAllUsers());
	}
	
	@PostMapping("/RegisterSalesPerson")
	public ResponseEntity<?> addSalesPerson(@RequestBody User user) {
	   
	    if (userService.existsByEmail(user.getEmail())) {
	        return ResponseEntity
	                .status(HttpStatus.BAD_REQUEST)
	                .body(new SignupResponse("Error: Email is already in use!"));
	    }

	   
	    user.setPassword(enc.encode(user.getPassword()));
	    user.setUserRole(Role.SALES); 

	   
	    return ResponseEntity.status(HttpStatus.OK).body(userRepo.save(user));
	}
	
	@DeleteMapping("/{id}")
     public ResponseEntity<?> blockUserById(@PathVariable Long id){
		userRepo.deleteById(id);
		return ResponseEntity.status(HttpStatus.OK).body("User Deleted Successfully !!");
	}
	
	@GetMapping("/{id}" )
	public ResponseEntity<?> getById(@PathVariable Long id){
		return ResponseEntity.status(HttpStatus.OK).body(userService.getUserbyId(id));
	}
	
	@PutMapping(value = "/{id}", consumes = "multipart/form-data")
	public ResponseEntity<?> editProfile(
	        @PathVariable Long id,
	        @ModelAttribute("user") UserDTO userinfo,
	        @RequestPart(value = "profilePicture", required = false) MultipartFile file) throws IOException {
	    return ResponseEntity.status(HttpStatus.ACCEPTED).body(userService.updateProfile(id, userinfo, file));
	}
}
