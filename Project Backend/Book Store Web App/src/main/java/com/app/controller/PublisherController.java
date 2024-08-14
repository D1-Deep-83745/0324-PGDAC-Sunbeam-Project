package com.app.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.dto.PublisherDTO;
import com.app.service.PublisherService;

@RestController
@RequestMapping("/publisher")
@CrossOrigin(origins = {"http://localhost:3000" ,"http://localhost:3001"})
public class PublisherController {
	
	  @Autowired
      private PublisherService publisherService;
	  
	  @PostMapping("/add")
	  public ResponseEntity<?> addPublisher(@RequestBody PublisherDTO publisher){
		      return ResponseEntity.status(HttpStatus.OK).body(publisherService.addPublisher(publisher));
	  }
}
