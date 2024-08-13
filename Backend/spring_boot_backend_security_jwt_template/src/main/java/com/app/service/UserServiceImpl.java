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
import com.app.dto.UserDto;
import com.app.dto.UserProfileDTO;
import com.app.entities.User;
import com.app.repository.UserRepository;

@Transactional
@Service
public class UserServiceImpl implements UserService {
    @Autowired
    private UserRepository userRepo;
    
    @Autowired
    private ModelMapper map;
	
	@Override
	public String signIn(SignInDto user) {
		User signedIn =userRepo.findByEmailAndPassword(user.getEmail(),user.getPassword()).orElseThrow(()-> new RuntimeException());
		return "Login Successful";
	}

	@Override
	public boolean existsByEmail(String email) {
		return userRepo.existsByEmail(email);
	}

	@Override
	public void saveUser(User user) {
		userRepo.save(user);	
	}

	@Override
	public int totalUsers() {
		return userRepo.totalUsers();
	}


	    @Override
	    public Optional<UserProfileDTO> getUserProfile(String email) {
	        return userRepo.findByEmail(email)
	                .map(user -> map.map(user, UserProfileDTO.class));
	    }

	    @Override
	    public UserProfileDTO updateUserProfile(UserProfileDTO userProfileDTO, String email) {
	        User user = userRepo.findByEmail(email)
	                .orElseThrow(() -> new RuntimeException("User not found"));

	        // Update user fields
	        user.setFirstName(userProfileDTO.getFirstName());
	        user.setLastName(userProfileDTO.getLastName());
	        user.setPhoneNo(userProfileDTO.getPhoneNo());
	        user.setDob(userProfileDTO.getDob());
	        user.setGender(userProfileDTO.getGender());

	        // Save updated user
	        User updatedUser = userRepo.save(user);

	        // Map to DTO and return
	        return map.map(updatedUser, UserProfileDTO.class);
	    }

		@Override
		public List<UserDto> getAllUsers() {
			  List<User> users = userRepo.findAll();
			    List<UserDto> response = new ArrayList<UserDto>();

			    for (User u : users) {
			    	UserDto userResponse = map.map(u, UserDto.class);
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
		public UserDto getUserbyId(Long id) {
			 User user = userRepo.findById(id).orElse(null);
		     return map.map(user, UserDto.class);
		}

		//TODO
		@Override
		public String updateProfile(Long id, UserDto user, MultipartFile file) throws IOException {
//			User existingUser = userRepo.findById(id).orElse(null);
//			if(existingUser != null) {
//			existingUser = map.map(user, User.class);
//			existingUser.setImage(file.getBytes());
//			userRepo.save(existingUser);
//			return "profile updation successful";
//			}
			return "user not found";
		}

	

}
