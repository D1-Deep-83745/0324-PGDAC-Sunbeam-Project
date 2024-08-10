package com.app.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.app.dto.BookDetailsDTO;
import com.app.entities.BookDetails;
import com.app.entities.Category;
import com.app.service.BookService;

import io.swagger.v3.oas.annotations.parameters.RequestBody;
import io.swagger.v3.oas.models.responses.ApiResponse;

@RestController
@RequestMapping("/books")
@CrossOrigin(origins = "http://localhost:3000")
public class BookController {
   
	@Autowired
   private BookService bookService;
	

	@GetMapping("/count")
	public ResponseEntity<?> totalBooks(){
		return ResponseEntity.status(HttpStatus.OK).body(bookService.totalBooks());
	}
	
	@GetMapping("/list")
	public List<BookDetailsDTO> listBooks() {
		List<BookDetailsDTO> bdto= bookService.getAllBooks();
		return bdto;
	}
	
	@GetMapping("/category/{categoryName}")
	List<BookDetails> getBooksByCategory(@PathVariable Category categoryName){
		return bookService.findByCategory(categoryName);
	}
	
//	 @GetMapping("/{id}")
//	    public ResponseEntity<BookDetails> getBookById(@PathVariable Long id) {
//	      ResponseEntity<BookDetails> bdto= bookService.getBookById(id)
//	                .map(book -> ResponseEntity.ok().body(book))
//	                .orElseGet(() -> ResponseEntity.notFound().build());
//	      return bdto;
//	    }
	
	@GetMapping("/{id}")
	public ResponseEntity<BookDetailsDTO> getBookById(@PathVariable Long id) {
	    Optional<BookDetailsDTO> bookDTOOptional = bookService.getBookById(id);
	    return bookDTOOptional
	            .map(bookDTO -> ResponseEntity.ok().body(bookDTO))
	            .orElseGet(() -> ResponseEntity.notFound().build());
	}
	
	  @GetMapping("/searchByTitle")
	    public BookDetailsDTO getBookByTitle(@RequestParam String title) {
	        return bookService.getBookByTitle(title);
	    }

	
	@PostMapping("/add")
	public ResponseEntity<?> addNewBook(@RequestBody BookDetails newbookDetails) {
		System.out.println("in add new Book " + newbookDetails);
		try {
			return ResponseEntity.status(HttpStatus.CREATED).body(bookService.saveBookDetails(newbookDetails));
		} catch (RuntimeException e) {
			System.out.println("err " + e);
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ApiResponse());
	}
	}

	
}
