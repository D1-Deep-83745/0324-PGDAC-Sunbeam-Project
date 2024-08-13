package com.app.service;

import java.util.List;

import com.app.dto.CategoryDTO;

public interface CategoryService {
	int totalCategories() ;
	
	List<CategoryDTO> getAllCategories();
	
	String addCategory(CategoryDTO category);
}
