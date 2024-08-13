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
import com.app.dto.UserDto;
import com.app.dto.UserProfileDTO;
import com.app.entities.Role;
import com.app.entities.User;
import com.app.repository.UserRepository;
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
	private UserRepository userRepo;

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
			return ResponseEntity.status(HttpStatus.BAD_REQUEST)
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
			userRole = Role.CUSTOMER; // Default role
		} else {
			try {
				userRole = Role.valueOf(signUpRequest.getRole());
			} catch (IllegalArgumentException e) {
				userRole = Role.CUSTOMER; // Fallback to default role if invalid
			}
		}
		user.setUserRole(userRole);
		userService.saveUser(user);

		return ResponseEntity.status(HttpStatus.CREATED).body(new SignupResponse("User registered successfully!"));
	}

	@PostMapping("/signin")
	public ResponseEntity<?> authenticateUser(@RequestBody @Valid SignInDto request) {
		System.out.println("in sign in" + request);

		// Create a token (implementation of Authentication interface)
		UsernamePasswordAuthenticationToken token = new UsernamePasswordAuthenticationToken(request.getEmail(),
				request.getPassword());

		// Invoke auth manager's authenticate method
		Authentication verifiedToken = authMgr.authenticate(token);

		// Authentication and authorization successful
		System.out.println(verifiedToken.getPrincipal().getClass()); // Custom user details object

		CustomUserDetails userDetails = (CustomUserDetails) verifiedToken.getPrincipal();
		String firstName = userDetails.getFirstName();
		String lastName = userDetails.getLastName();
		String Role = userDetails.getRole();
		Long Userid = userDetails.getUserId();

		// Create JWT and send it to the client in response
		SignInResponse resp = new SignInResponse(jwtUtils.generateJwtToken(verifiedToken), "Successful Auth!!!!",
				firstName, lastName, Role, Userid // Include userId in the response
		);

		return ResponseEntity.status(HttpStatus.CREATED).body(resp);
	}

	@GetMapping("/count")
	public ResponseEntity<?> Users() {
		return ResponseEntity.status(HttpStatus.OK).body(userService.totalUsers());
	}

	@GetMapping("/getAll")
	public ResponseEntity<?> getallUsers() {
		return ResponseEntity.status(HttpStatus.OK).body(userService.getAllUsers());
	}

	@PostMapping("/RegisterSalesPerson")
	public ResponseEntity<?> addSalesPerson(@RequestBody User user) {

		if (userService.existsByEmail(user.getEmail())) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST)
					.body(new SignupResponse("Error: Email is already in use!"));
		}

		user.setPassword(enc.encode(user.getPassword()));
		user.setUserRole(Role.SALES);

		return ResponseEntity.status(HttpStatus.OK).body(userRepo.save(user));
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<?> blockUserById(@PathVariable Long id) {
		userRepo.deleteById(id);
		return ResponseEntity.status(HttpStatus.OK).body("User Deleted Successfully !!");
	}

	@GetMapping("/{id}")
	public ResponseEntity<?> getById(@PathVariable Long id) {
		return ResponseEntity.status(HttpStatus.OK).body(userService.getUserbyId(id));
	}

	@PutMapping(value = "/{id}", consumes = "multipart/form-data")
	public ResponseEntity<?> editProfile(@PathVariable Long id, @ModelAttribute("user") UserDto userinfo,
			@RequestPart(value = "profilePicture", required = false) MultipartFile file) throws IOException {
		return ResponseEntity.status(HttpStatus.ACCEPTED).body(userService.updateProfile(id, userinfo, file));
	}

	@GetMapping("/profile")
	public ResponseEntity<?> getUserProfile() {
		// Get the authenticated user's email from the SecurityContext
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		String email = authentication.getName(); // Assumes the username is the email

		// Fetch user profile using UserService
		return userService.getUserProfile(email).map(profile -> new ResponseEntity<>(profile, HttpStatus.OK))
				.orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
	}

	@PutMapping("/profile")
	public ResponseEntity<?> updateUserProfile(@RequestBody UserProfileDTO userProfileDTO) {
		// Get the authenticated user's email from the SecurityContext
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		String email = authentication.getName(); // Assumes the username is the email

		try {
			// Update user profile using UserService
			UserProfileDTO updatedProfile = userService.updateUserProfile(userProfileDTO, email);
			return new ResponseEntity<>(updatedProfile, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}
}
