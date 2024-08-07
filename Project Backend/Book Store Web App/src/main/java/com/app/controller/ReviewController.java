package com.app.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.service.ReviewService;

@RestController
@RequestMapping("/reviews")
@CrossOrigin(origins = "http://localhost:3000")
public class ReviewController {
     
	@Autowired
	private ReviewService reviewService;
	
	
	@GetMapping("/count")
	public ResponseEntity<?> totalReviews(){
		return ResponseEntity.status(HttpStatus.OK).body(reviewService.totalReviews());
	}
}
