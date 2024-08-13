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
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
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

@RestController
@RequestMapping("/books")
@CrossOrigin(origins = "http://localhost:3000")
public class BookController {
   
	@Autowired
   private BookService BookService;
	
	@Autowired
	private BookInventoryService inventoryService;
	
	@Autowired
	private AuthorService authorService;
	
	@Autowired
	private PublisherService publisherService;
	
	@GetMapping("/count")
	public ResponseEntity<?> totalBooks(){
		return ResponseEntity.status(HttpStatus.OK).body(BookService.totalBooks());
	}
	
	
	  @PostMapping("/add") 
	  public ResponseEntity<?> addNewBook(@RequestBody BookRequestDTO newbookDetails){ 
		  
		      System.out.println(newbookDetails);
	         return ResponseEntity.status(HttpStatus.OK).body(BookService.addBook(newbookDetails));
	  }
	 
	
	
	@GetMapping("/list")
	public List<BookDetailsDTO> listBooks() {
		List<BookDetailsDTO> bdto= BookService.getAllBooks();
		return bdto;
		
	}
	
	@GetMapping("/category/{categoryName}")
	List<BookDetails> getBooksByCategory(@PathVariable Category categoryName){
		return BookService.findByCategory(categoryName);
	}

	
	@GetMapping("/bookchartData")
	public ResponseEntity<?> getTrendingBooks(){
		return ResponseEntity.status(HttpStatus.OK).body(BookService.getTopSoldBooksAvailableQuantities());
	}
	
	@GetMapping("/dayWiseSale")
	public ResponseEntity<?> getDayWiseSale(){
		return ResponseEntity.status(HttpStatus.OK).body(BookService.getDayWiseSalesForLast7Days());
	}
	
	@GetMapping("/inventory")
	public ResponseEntity<?> getInventory(){
		return ResponseEntity.status(HttpStatus.OK).body(inventoryService.getALLInventory());
	}
	
	@DeleteMapping("/deletebook/{id}")
	public ResponseEntity<?> deleteBook(@PathVariable Long id){
		 BookService.deleteBook(id);
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
	
	@GetMapping("/{id}")
	public ResponseEntity<?> getBookById(@PathVariable Long id) {
	    Optional<BookDetailsDTO> bookDTOOptional = BookService.getBookById(id);
	    return bookDTOOptional
	            .map(bookDTO -> ResponseEntity.ok().body(bookDTO))
	            .orElseGet(() -> ResponseEntity.notFound().build());
	}
	
	@PutMapping("/{id}")
	public ResponseEntity<?> updateBook(@PathVariable Long id, @RequestBody BookRequestDTO bookDetails) {
       return ResponseEntity.ok(BookService.updateBook(id, bookDetails));   
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
