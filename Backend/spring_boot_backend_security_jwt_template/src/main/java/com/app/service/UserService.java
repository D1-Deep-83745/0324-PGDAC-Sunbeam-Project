package com.app.service;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

import org.springframework.web.multipart.MultipartFile;

import com.app.dto.SignInDto;
import com.app.dto.UserDto;
import com.app.dto.UserProfileDTO;
import com.app.entities.User;

public interface UserService {

	String signIn(SignInDto user);

	boolean existsByEmail(String email);

	void saveUser(User user);

	int totalUsers();

	Optional<UserProfileDTO> getUserProfile(String email);

	UserProfileDTO updateUserProfile(UserProfileDTO userProfileDTO, String email);

	List<UserDto> getAllUsers();

	UserDto getUserbyId(Long id);

	String updateProfile(Long id, UserDto user, MultipartFile file) throws IOException;

}
