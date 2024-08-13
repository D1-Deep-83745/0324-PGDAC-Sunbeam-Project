package com.app.service;

import java.io.IOException;
import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.app.dto.SignInDto;
import com.app.dto.UserDTO;
import com.app.entities.User;

public interface UserService {
	
     String signIn(SignInDto user);

	 boolean existsByEmail(String email);

	 void saveUser(User user);   
	 
	 int totalUsers();
	 
	 List<UserDTO> getAllUsers();
	 
	 UserDTO getUserbyId(Long id);
	 
	 String updateProfile(Long id , UserDTO user , MultipartFile file)throws IOException;
}
