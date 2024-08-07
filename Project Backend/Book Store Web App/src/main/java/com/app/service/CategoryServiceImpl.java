package com.app.service;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.repository.CategoryRepository;

@Transactional
@Service
public class CategoryServiceImpl implements CategoryService{
      @Autowired
      private CategoryRepository catRepo;

	@Override
	public int totalCategories() {
		
		return catRepo.totalCategories();
	}
      
      
}
