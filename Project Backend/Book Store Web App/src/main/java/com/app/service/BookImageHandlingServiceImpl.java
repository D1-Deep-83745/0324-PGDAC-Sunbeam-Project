package com.app.service;

import static org.apache.commons.io.FileUtils.readFileToByteArray;
import static org.apache.commons.io.FileUtils.writeByteArrayToFile;

import java.io.File;
import java.io.IOException;
import java.util.Base64;

import javax.annotation.PostConstruct;
import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.app.dto.ApiResponse;
import com.app.entities.BookDetails;
import com.app.repository.BookRepository;

@Service
@Transactional
public class BookImageHandlingServiceImpl implements BookImageHandlingService {
	
	@Value("${file.upload.location}") 
	private String uploadFolder;

	@Autowired
	private BookRepository bookRepo;

	@PostConstruct
	public void init() throws IOException {
		File folder = new File(uploadFolder);
		if (folder.exists()) {
			System.out.println("folder exists alrdy !");
		} else {
			folder.mkdir();
			System.out.println("created a folder !");
		}
	}

	@Override
	public ApiResponse uploadImage(Long bookId, MultipartFile image) throws IOException {
		BookDetails book = bookRepo.
				findById(bookId).orElseThrow(() -> new RuntimeException("Invalid book ID!!!!"));
		String path = uploadFolder.concat(image.getOriginalFilename());
		System.out.println(path);
		writeByteArrayToFile(new File(path), image.getBytes());
		book.setImagePath(path);
		return new ApiResponse("Image file uploaded successfully for book id " + bookId);
	}

	@Override
	public void uploadImage(BookDetails book, MultipartFile image) throws IOException {		
		String path = uploadFolder.concat(image.getOriginalFilename());
		System.out.println(path);
		writeByteArrayToFile(new File(path), image.getBytes());
		book.setImagePath(path);
		System.out.println("Image file uploaded successfully for book " + book.getTitle());
	}

	@Override
	public String serveImage(Long bookId) throws IOException {
	    BookDetails book = bookRepo.findById(bookId).orElseThrow(() -> new RuntimeException("Invalid book ID!!!!"));
	    String path = book.getImagePath();
	    if (path != null) {
	        byte[] imageBytes = readFileToByteArray(new File(path));
	        return Base64.getEncoder().encodeToString(imageBytes);
	    } else {
	        return null;
	    }
	}

}
