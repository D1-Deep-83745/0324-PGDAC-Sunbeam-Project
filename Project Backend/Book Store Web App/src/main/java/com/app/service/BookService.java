package com.app.service;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

import org.springframework.web.multipart.MultipartFile;

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

	 List<BookDetails> findByCategory(Category categoryName);

	 List<BookDetailsDTO> getAllBooks() throws IOException; 
	 
	 void deleteBook(Long id);
	 
     BookDetailsDTO getBookById(Long id) throws IOException;
		   
     String updateBook(Long id, BookRequestDTO bookDetails , MultipartFile file) throws IOException ;
     
     String addBook(BookRequestDTO newBook , MultipartFile file) throws IOException;
     
      BookDetailsDTO getBookByTitle(String title) throws IOException;
}
