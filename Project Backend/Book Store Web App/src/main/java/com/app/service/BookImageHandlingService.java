package com.app.service;

import java.io.IOException;

import org.springframework.web.multipart.MultipartFile;

import com.app.dto.ApiResponse;
import com.app.entities.BookDetails;

public interface BookImageHandlingService {
	ApiResponse uploadImage(Long bookId, MultipartFile image) throws IOException;
	String serveImage(Long bookId) throws IOException;

	void uploadImage(BookDetails book, MultipartFile image) throws IOException;
}
