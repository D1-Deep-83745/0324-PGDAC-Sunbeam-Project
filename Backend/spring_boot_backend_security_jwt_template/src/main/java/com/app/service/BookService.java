package com.app.service;

import java.util.List;
import java.util.Optional;

import com.app.dto.BookChartData;
import com.app.dto.BookDetailsDTO;
import com.app.dto.BookRequestDTO;
import com.app.dto.BookSalesDTO;
import com.app.dto.DayWiseSalesDTO;
import com.app.entities.BookDetails;
import com.app.entities.Category;

public interface BookService {
    int totalBooks() ;
    
    List<BookSalesDTO> getTopBooks();
    
    List<BookChartData> getTopSoldBooksAvailableQuantities();
    
    List<DayWiseSalesDTO> getDayWiseSalesForLast7Days();
    
    List<BookDetailsDTO> getAllBooks();
 	
 	List<BookDetails> findByCategory(Category category);
 	
 	void deleteBook(Long id);
	 
 	String updateBook(Long id, BookRequestDTO bookDetails);
    
    String addBook(BookRequestDTO newBook);
 	
 	Optional<BookDetailsDTO> getBookById(Long id);
 	
	BookDetailsDTO getBookByTitle(String title);
}
