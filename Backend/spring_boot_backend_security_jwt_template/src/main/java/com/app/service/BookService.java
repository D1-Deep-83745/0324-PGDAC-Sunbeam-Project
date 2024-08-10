package com.app.service;

import java.util.List;
import java.util.Optional;

import com.app.dto.BookDetailsDTO;
import com.app.entities.BookDetails;
import com.app.entities.Category;

public interface BookService {
     int totalBooks() ;
    List<BookDetailsDTO> getAllBooks();
 	BookDetails saveBookDetails(BookDetails book);
 	List<BookDetails> findByCategory(Category category);
 	Optional<BookDetailsDTO> getBookById(Long id);
	BookDetailsDTO getBookByTitle(String title);
}
