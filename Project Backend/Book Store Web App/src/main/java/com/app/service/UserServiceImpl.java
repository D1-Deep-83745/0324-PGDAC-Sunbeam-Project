package com.app.service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import javax.transaction.Transactional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.app.dto.SignInDto;
import com.app.dto.UserDTO;
import com.app.entities.User;
import com.app.repository.UserRepository;

@Transactional
@Service
public class UserServiceImpl implements UserService {
    @Autowired
    private UserRepository udao;
    
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
		if(existingUser != null) {
		existingUser = map.map(user, User.class);
		existingUser.setImage(file.getBytes());
		udao.save(existingUser);
		return "profile updation successful";
		}
		return "user not found";
	}


}
