package com.app.service;

import com.app.dto.SignInDto;
import com.app.entities.User;

public interface UserService {
     public String signIn(SignInDto user);

	public boolean existsByEmail(String email);

	public void saveUser(User user);   
	
}
