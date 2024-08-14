package com.app.controller;

import java.io.IOException;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
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
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.app.dto.SignInDto;
import com.app.dto.SignInResponse;
import com.app.dto.SignupDto;
import com.app.dto.SignupResponse;
import com.app.dto.UserDTO;
import com.app.dto.UserProfileDTO;
import com.app.entities.Role;
import com.app.entities.User;
import com.app.repository.UserRepository;
import com.app.security.CustomUserDetails;
import com.app.security.JwtUtils;
import com.app.service.UserService;





@RestController
@RequestMapping("/user")
@CrossOrigin(origins = {"http://localhost:3000" ,"http://localhost:3001"})
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
	 @PostMapping("/signup")
	    public ResponseEntity<?> registerUser(@RequestBody @Valid SignupDto signUpRequest) {
	       
	        if (userService.existsByEmail(signUpRequest.getEmail())) {
	            return ResponseEntity
	                    .status(HttpStatus.BAD_REQUEST)
	                    .body(new SignupResponse("Error: Email is already in use!"));
	        }

	        
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
		UsernamePasswordAuthenticationToken token=new UsernamePasswordAuthenticationToken(request.getEmail(),request.getPassword());
		Authentication verifiedToken = authMgr.authenticate(token);
		System.out.println(verifiedToken.getPrincipal().getClass());
		CustomUserDetails userDetails = (CustomUserDetails) verifiedToken.getPrincipal();
        String firstName = userDetails.getFirstName();
        String lastName = userDetails.getLastName();
        String Role = userDetails.getRole();
        Long id = userDetails.getId();
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
	
	@GetMapping("/profile")
	public ResponseEntity<?> getUserProfile() {
	
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		String email = authentication.getName(); 

	
		return userService.getUserProfile(email).map(profile -> new ResponseEntity<>(profile, HttpStatus.OK))
				.orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
	}
	
	@PutMapping("/profile")
	public ResponseEntity<?> updateUserProfile(@RequestBody UserProfileDTO userProfileDTO) {
		
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		String email = authentication.getName(); 

		try {
			
			UserProfileDTO updatedProfile = userService.updateUserProfile(userProfileDTO, email);
			return new ResponseEntity<>(updatedProfile, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}
}
