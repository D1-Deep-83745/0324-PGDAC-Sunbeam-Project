package com.app.service;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.dto.SignInDto;
import com.app.entities.User;
import com.app.repository.UserRepository;

@Transactional
@Service
public class UserServiceImpl implements UserService {
    @Autowired
    private UserRepository udao;
	
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

}
