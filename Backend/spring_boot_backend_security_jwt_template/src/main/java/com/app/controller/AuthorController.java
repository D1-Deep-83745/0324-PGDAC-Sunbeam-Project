package com.app.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.dto.AuthorDTO;
import com.app.service.AuthorService;

@RestController
@RequestMapping("/author")
@CrossOrigin(origins = "http://localhost:3000")
public class AuthorController {
	   
	  @Autowired
      private AuthorService authorService;
	  
	  
	  
	  @PostMapping("/add")
	  public ResponseEntity<?> addAuthor(@RequestBody AuthorDTO author){
		  return ResponseEntity.status(HttpStatus.OK).body(authorService.addAuthor(author));
	  }
	  
}
