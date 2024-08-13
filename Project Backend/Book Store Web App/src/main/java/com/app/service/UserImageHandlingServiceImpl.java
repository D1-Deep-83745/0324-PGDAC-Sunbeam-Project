package com.app.service;

import static org.apache.commons.io.FileUtils.readFileToByteArray;
import static org.apache.commons.io.FileUtils.writeByteArrayToFile;

import java.io.File;
import java.io.IOException;

import javax.annotation.PostConstruct;
import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.app.dto.ApiResponse;
import com.app.entities.User;
import com.app.repository.UserRepository;

@Service
@Transactional
public class UserImageHandlingServiceImpl implements UserImageHandlingService {
	

	@Autowired
	private UserRepository userRepo;

	

	@Override
	public ApiResponse uploadImage(Long userId, MultipartFile image) throws IOException {
		
		User user = userRepo.
				findById(userId).orElseThrow(() -> new RuntimeException("User not Found"));
		user.setImage(image.getBytes());
		return new ApiResponse("Image file uploaded successfully for emp id " + userId);
	}

	@Override
	public void uploadImage(User user, MultipartFile image) throws IOException {
		user.setImage(image.getBytes());
	}

	@Override
	public byte[] serveImage(Long userId) throws IOException {
		User user = userRepo.findById(userId).orElseThrow(() -> new RuntimeException("Invalid emp ID!!!!"));
		byte [] image = user.getImage();
		if (image != null) {
			return image;
		} else
			throw new RuntimeException("Image not yet assigned !!!!");
	    }

}
