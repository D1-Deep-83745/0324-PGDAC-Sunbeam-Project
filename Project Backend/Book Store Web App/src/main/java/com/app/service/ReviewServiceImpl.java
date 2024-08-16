package com.app.service;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.dto.AddReviewDto;
import com.app.dto.ReviewDto;
import com.app.entities.OrderItem;
import com.app.entities.Review;
import com.app.repository.OrderItemRepository;
import com.app.repository.ReviewRepository;



@Service
@Transactional
public class ReviewServiceImpl implements ReviewService {
    
	@Autowired
    private ReviewRepository reviewRepo;
	
	
	@Autowired
	private OrderItemRepository orderItemRepo;
	
	@Override
	public int totalReviews() {
		
		return reviewRepo.totalReviews();
	}


	@Override
	public List<ReviewDto> getAll() {

	    List<Review> reviews = reviewRepo.findAll();
	    

	    if (reviews.isEmpty()) {
	        return Collections.emptyList();
	        
	    }

	    
	    return reviews.stream()
	                  .map(review -> {
	                      ReviewDto dto = new ReviewDto();
	                      dto.setUserName(review.getUser().getFirstName()+" "+review.getUser().getLastName()); // Ensure User entity has getUserName method
	                      dto.setBookId(review.getBook().getId());
	                      dto.setTitle(review.getBook().getTitle()); // Assuming BookDetails has a getTitle method
	                      dto.setRating(review.getRating());
	                      dto.setComment(review.getComment());
	                      return dto;
	                  })
	                  .collect(Collectors.toList());
	}
     
	@Override
    public List<ReviewDto> getReviewsByBookId(Long bookId) {
        List<Review> reviews = reviewRepo.findByBookId(bookId);
        return reviews.stream()
                      .map(this::convertToDTO)
                      .collect(Collectors.toList());
    } 
	
	  private ReviewDto convertToDTO(Review review) {
	        ReviewDto dto = new ReviewDto();
	        dto.setId(review.getId());
	        dto.setUserId(review.getUser().getId());
	        dto.setBookId(review.getBook().getId());
	        dto.setRating(review.getRating());
	        dto.setComment(review.getComment());  
	        return dto;
	    }


	@Override
	public String addReview(AddReviewDto review) {
		Review reviewInfo = new Review();
		
		OrderItem item = orderItemRepo.findById(review.getItemId()).orElse(null);
		
		reviewInfo.setBook(item.getBook());
		reviewInfo.setComment(review.getComment());
		reviewInfo.setRating(review.getRating());
		reviewInfo.setUser(item.getOrder().getUser());
		
		reviewRepo.save(reviewInfo);
		return "Review submited Successfully";
	}
	  
	  
	  

}
