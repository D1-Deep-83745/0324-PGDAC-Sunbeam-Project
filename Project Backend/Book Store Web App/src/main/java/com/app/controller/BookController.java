package com.app.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.service.BookService;

@RestController
@RequestMapping("/books")
@CrossOrigin(origins = "http://localhost:3000")
public class BookController {
   
	@Autowired
   private BookService BookService;
	
	@GetMapping("/count")
	public ResponseEntity<?> totalBooks(){
		return ResponseEntity.status(HttpStatus.OK).body(BookService.totalBooks());
	}
	
}
