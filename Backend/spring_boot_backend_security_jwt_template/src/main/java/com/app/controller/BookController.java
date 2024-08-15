package com.app.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.app.dto.BookDetailsDTO;
import com.app.dto.BookRequestDTO;
import com.app.dto.inventoryDto;
import com.app.entities.BookDetails;
import com.app.entities.Category;
import com.app.service.AuthorService;
import com.app.service.BookInventoryService;
import com.app.service.BookService;
import com.app.service.PublisherService;

import io.swagger.v3.oas.annotations.parameters.RequestBody;

@RestController
@RequestMapping("/books")
@CrossOrigin(origins = "http://localhost:3000")
public class BookController {

	@Autowired
	private BookService bookService;

	@Autowired
	private BookInventoryService inventoryService;

	@Autowired
	private AuthorService authorService;

	@Autowired
	private PublisherService publisherService;

	@GetMapping("/count")
	public ResponseEntity<?> totalBooks() {
		return ResponseEntity.status(HttpStatus.OK).body(bookService.totalBooks());
	}

	@GetMapping("/list")
	public List<BookDetailsDTO> listBooks() {
		List<BookDetailsDTO> bdto = bookService.getAllBooks();
		return bdto;
	}

	@GetMapping("/category/{categoryName}")
	List<BookDetails> getBooksByCategory(@PathVariable Category categoryName) {
		return bookService.findByCategory(categoryName);
	}


	@GetMapping("/{id}")
	public ResponseEntity<BookDetailsDTO> getBookById(@PathVariable Long id) {
		Optional<BookDetailsDTO> bookDTOOptional = bookService.getBookById(id);
		return bookDTOOptional.map(bookDTO -> ResponseEntity.ok().body(bookDTO))
				.orElseGet(() -> ResponseEntity.notFound().build());
	}

	@GetMapping("/searchByTitle")
	public BookDetailsDTO getBookByTitle(@RequestParam String title) {
		return bookService.getBookByTitle(title);
	}

	@PostMapping("/add") 
	  public ResponseEntity<?> addNewBook(@RequestBody BookRequestDTO newbookDetails){ 
		  
		      System.out.println(newbookDetails);
	         return ResponseEntity.status(HttpStatus.OK).body(bookService.addBook(newbookDetails));
	  }
	

	@GetMapping("/bookchartData")
	public ResponseEntity<?> getTrendingBooks(){
		return ResponseEntity.status(HttpStatus.OK).body(bookService.getTopSoldBooksAvailableQuantities());
	}
	
	@GetMapping("/dayWiseSale")
	public ResponseEntity<?> getDayWiseSale(){
		return ResponseEntity.status(HttpStatus.OK).body(bookService.getDayWiseSalesForLast7Days());
	}
	
	@GetMapping("/inventory")
	public ResponseEntity<?> getInventory(){
		return ResponseEntity.status(HttpStatus.OK).body(inventoryService.getALLInventory());
	}
	
	@DeleteMapping("/deletebook/{id}")
	public ResponseEntity<?> deleteBook(@PathVariable Long id){
		bookService.deleteBook(id);
	    return ResponseEntity.noContent().build(); 
	}
	
	@GetMapping("/getAuthors")
	public ResponseEntity<?> getAuthors(){
		return ResponseEntity.status(HttpStatus.OK).body(authorService.getAllAuthors());
	}
	
	@GetMapping("/publishers")
	public ResponseEntity<?> getPublishers(){
		return ResponseEntity.status(HttpStatus.OK).body(publisherService.getAllPublishers());
	}
	
	@PutMapping("/{id}")
	public ResponseEntity<?> updateBook(@PathVariable Long id, @RequestBody BookRequestDTO bookDetails) {
       return ResponseEntity.ok(bookService.updateBook(id, bookDetails));   
	}
    
	
	@PutMapping("/inventory/{id}")
	public ResponseEntity<?> updateInventory(@PathVariable Long id , @RequestBody inventoryDto inventory){
		return ResponseEntity.status(HttpStatus.OK).body(inventoryService.updateInventory(id, inventory));
	}
	
	@PostMapping("/inventory/add")
	public ResponseEntity<?> createInventory(@RequestBody inventoryDto inventory){
		return ResponseEntity.status(HttpStatus.CREATED).body(inventoryService.createInventory(inventory));
	}

}
