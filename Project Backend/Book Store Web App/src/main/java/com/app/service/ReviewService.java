package com.app.service;

import java.util.List;

import com.app.dto.ReviewDto;

public interface ReviewService {
	 int totalReviews();
	 List<ReviewDto> getAll();
	 
	 List<ReviewDto> getReviewsByBookId(Long bookId);

}
