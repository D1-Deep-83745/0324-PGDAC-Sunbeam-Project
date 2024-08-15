package com.app.service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.app.dto.SignInDto;
import com.app.dto.UserDTO;
import com.app.dto.UserProfileDTO;
import com.app.entities.Role;
import com.app.entities.User;
import com.app.repository.UserRepository;

@Transactional
@Service
public class UserServiceImpl implements UserService {
    @Autowired
    private UserRepository udao;
    
	@Autowired
	private UserImageHandlingService imageService;
    
    @Autowired
    private ModelMapper map;
	
	@Override
	public String signIn(SignInDto user) {
		User signedIn =udao.findByEmailAndPassword(user.getEmail(),user.getPassword()).orElseThrow(()-> new RuntimeException());
		return "Login Successful";
	}

	@Override
	public boolean existsByEmail(String email) {
		
		return udao.existsByEmail(email);
	}

	@Override
	public void saveUser(User user) {
		udao.save(user);
		
	}

	@Override
	public int totalUsers() {
		return udao.totalUsers();
	}

	@Override
	public List<UserDTO> getAllUsers() {
	    List<User> users = udao.findAll();
	    List<UserDTO> response = new ArrayList<UserDTO>();

	    for (User u : users) {
	        UserDTO userResponse = map.map(u, UserDTO.class);
	        String gender = userResponse.getGender();
	        if ("M".equals(gender)) {
	            userResponse.setGender("Male");
	        } else if ("F".equals(gender)) {
	            userResponse.setGender("Female");
	        } else {
	            userResponse.setGender("Other");
	        }
	        response.add(userResponse);
	    }

	    return response;
	}
	 @Override
	    public UserDTO getUserbyId(Long id) {
	        User user = udao.findById(id).orElse(null);
	        return map.map(user, UserDTO.class);
	    }

	 @Override
	 public String updateProfile(Long id, UserDTO user, MultipartFile file) throws IOException {
		 
	     User existingUser = udao.findById(id).orElse(null);
	     System.out.println("Received UserDTO: " + user);
	     if (existingUser != null) {
	         // Update the fields from UserDTO to the existing user
	         existingUser.setFirstName(user.getFirstName());
	         existingUser.setLastName(user.getLastName());
	         existingUser.setEmail(user.getEmail());
	         existingUser.setDob(user.getDob());
	         existingUser.setGender(user.getGender());
	         existingUser.setPhoneNo(user.getPhoneNo());
	       
	         
	         // Only update the image if a new file is provided
	         if (file != null && !file.isEmpty()) {
	             imageService.uploadImage(id, file);
	         }

	         udao.save(existingUser);
	         return "Profile update successful";
	     }
	     return "User not found";
	 }

	  @Override
	    public UserProfileDTO updateUserProfile(UserProfileDTO userProfileDTO, String email) {
	        User user = udao.findByEmail(email)
	                .orElseThrow(() -> new RuntimeException("User not found"));

	        
	        user.setFirstName(userProfileDTO.getFirstName());
	        user.setLastName(userProfileDTO.getLastName());
	        user.setPhoneNo(userProfileDTO.getPhoneNo());
	        user.setDob(userProfileDTO.getDob());
	        user.setGender(userProfileDTO.getGender());

	        
	        User updatedUser = udao.save(user);

	        
	        return map.map(updatedUser, UserProfileDTO.class);
	    }
	  
	  
	  @Override
	    public Optional<UserProfileDTO> getUserProfile(String email) {
	        return udao.findByEmail(email)
	                .map(user -> map.map(user, UserProfileDTO.class));
	    }
	  
}
