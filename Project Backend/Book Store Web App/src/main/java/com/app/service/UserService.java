package com.app.service;

import com.app.dto.SignInDto;
import com.app.entities.User;

public interface UserService {
	
     String signIn(SignInDto user);

	 boolean existsByEmail(String email);

	 void saveUser(User user);   
	 
	 int totalUsers();
	
}
