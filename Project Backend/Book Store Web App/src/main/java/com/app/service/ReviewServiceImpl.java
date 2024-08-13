package com.app.service;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.repository.ReviewRepository;

@Service
@Transactional
public class ReviewServiceImpl implements ReviewService {
    
	@Autowired
    private ReviewRepository reviewRepo;
	
	
	@Override
	public int totalReviews() {
		
		return reviewRepo.totalReviews();
	}

}
