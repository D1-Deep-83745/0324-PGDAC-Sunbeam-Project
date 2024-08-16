package com.app.controller;

import java.util.Collections;
import java.util.List;

import org.hibernate.annotations.common.util.impl.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.dto.AddReviewDto;
import com.app.dto.ReviewDto;
import com.app.service.ReviewService;

@RestController
@RequestMapping("/reviews")
@CrossOrigin(origins = {"http://localhost:3000" ,"http://localhost:3001"})
public class ReviewController {
     
	@Autowired
	private ReviewService reviewService;
	
	
	@GetMapping("/count")
	public ResponseEntity<?> totalReviews(){
		return ResponseEntity.status(HttpStatus.OK).body(reviewService.totalReviews());
	}
	
	@GetMapping("/getReviews")
	public ResponseEntity<?> getAllReviews() {
	    List<ReviewDto> reviews = reviewService.getAll();
	    
	    return ResponseEntity.status(HttpStatus.OK).body(reviews);
	}
	
	@GetMapping("/book/{bookId}")
	public ResponseEntity<?> getReviewsByBookId(@PathVariable Long bookId) {
	    try {
	        List<ReviewDto> reviews = reviewService.getReviewsByBookId(bookId);

	        if (reviews == null || reviews.isEmpty()) {
	            // Optionally, return an empty list instead of 204
	            return ResponseEntity.ok(Collections.emptyList());
	        }

	        return ResponseEntity.ok(reviews);
	    } catch (Exception e) {
	        // Log the exception
	        LoggerFactory.logger(getClass()).error("Error fetching reviews for bookId: {}", bookId, e);
	        
	        // Return an internal server error response
	        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
	    }
	    
}
	  
	   @PostMapping("/add")
	   public ResponseEntity<?> addReview(@RequestBody AddReviewDto review){
		   return ResponseEntity.status(HttpStatus.OK).body(reviewService.addReview(review));
	   }
	
}
