package com.app.service;

import java.util.List;

import com.app.entities.Category;

public interface CategoryService {
	int totalCategories() ;

	List<Category> getAllCategories();
}
