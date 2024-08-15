package com.app.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.app.entities.Category;

public interface CategoryRepository extends JpaRepository<Category, Long> {
	
	@Query(value = "SELECT COUNT(*) FROM category", nativeQuery = true)
	 int totalCategories();
}
