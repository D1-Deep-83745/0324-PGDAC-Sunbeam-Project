package com.app.service;

import java.util.List;
import java.util.stream.Collectors;

import javax.transaction.Transactional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.dto.CategoryDTO;
import com.app.entities.Category;
import com.app.repository.CategoryRepository;

@Transactional
@Service
public class CategoryServiceImpl implements CategoryService {
	@Autowired
	private CategoryRepository catRepo;

	@Autowired
	private ModelMapper map;

	@Override
	public int totalCategories() {

		return catRepo.totalCategories();
	}

	@Override
	public List<CategoryDTO> getAllCategories() {
		List<Category> categories = catRepo.findAll();
		return categories.stream().map(this::convertToDTO).collect(Collectors.toList());
	}

	private CategoryDTO convertToDTO(Category category) {
		CategoryDTO dto = new CategoryDTO();
		dto.setId(category.getId());
		dto.setCategoryName(category.getCategoryName());
		return dto;
	}

	@Override
	public String addCategory(CategoryDTO categoryDTO) {
		Category category = map.map(categoryDTO, Category.class);
		catRepo.save(category);
		return "Category added successfully";
	}
}
