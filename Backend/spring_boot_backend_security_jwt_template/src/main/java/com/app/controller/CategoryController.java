package com.app.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.dto.CategoryDTO;
import com.app.service.CategoryService;

@RestController
@RequestMapping("/categories")
@CrossOrigin(origins = "http://localhost:3000")
public class CategoryController {
   
	@Autowired
	private CategoryService catService;
	
	@GetMapping("/count")
	public ResponseEntity<?> totalBooks(){
		return ResponseEntity.status(HttpStatus.OK).body(catService.totalCategories());
	}
	
	@GetMapping("/listAll")
    public ResponseEntity<List<CategoryDTO>> getAllCategories() {
        List<CategoryDTO> categories = catService.getAllCategories();
        if (categories.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(categories);
    }
	
	@PostMapping("/addCategory")
	public ResponseEntity<?> addCategory(@RequestBody CategoryDTO category){
		return ResponseEntity.ok(catService.addCategory(category));
	}
}
