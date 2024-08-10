package com.app.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.dto.BookDetailsDTO;
import com.app.entities.BookDetails;
import com.app.entities.Category;
import com.app.repository.BookRepository;
import com.app.repository.CategoryRepository;

@Service
@Transactional
public class BookServiceImpl implements BookService {
    
	@Autowired
	private BookRepository bookRepo;

	
	@Override
	public int totalBooks() {		
		return bookRepo.totalBooks();
	}

//	@Override
//	public List<BookDetails> getAllBooks() {
//		return bookRepo.findAll();
//	}
	    
        @Override
	    public List<BookDetailsDTO> getAllBooks() {
	        List<BookDetails> books = bookRepo.findAll();
	        return books.stream().map(this::convertToDTO).collect(Collectors.toList());
	    }

        private BookDetailsDTO convertToDTO(BookDetails book) {
            if (book == null) {
                throw new IllegalArgumentException("BookDetails cannot be null");
            }

            BookDetailsDTO dto = new BookDetailsDTO();
            dto.setId(book.getId());
            dto.setTitle(book.getTitle());
            dto.setDescription(book.getDescription());
            dto.setPrice(book.getPrice());
            dto.setPublishDate(book.getPublishDate());

            // Null checks for nested objects
            dto.setCategoryName(book.getBookCategory() != null ? book.getBookCategory().getCategoryName() : "Unknown");
            dto.setAuthorName(book.getAuthor() != null ? book.getAuthor().getAuthorName() : "Unknown");
            dto.setPublisherName(book.getPublication() != null ? book.getPublication().getPublisherName() : "Unknown");
            
            return dto;
        }

	
	

	@Override
	public BookDetails saveBookDetails(BookDetails book) {
		if (bookRepo.existsByTitle(book.getTitle()))
			throw new com.app.custom_exception.ApiException("Category name duplicate !!!!!");
		return bookRepo.save(book);
	}

	@Override
	public List<BookDetails> findByCategory(Category category) {
		return findByCategory(category);
	}

//	@Override
//	public Optional<BookDetails> getBookById(Long id) {
//		return bookRepo.findById(id);
//	}
	
	@Override
	public Optional<BookDetailsDTO> getBookById(Long id) {
	    Optional<BookDetails> bookOptional = bookRepo.findById(id);
	    if (bookOptional.isPresent()) {
	        BookDetails book = bookOptional.get();
	        return Optional.of(convertToDTO(book));
	    } else {
	        return Optional.empty();
	    }
	}

@Override
public BookDetailsDTO getBookByTitle(String title) {
	 BookDetails book = bookRepo.findByTitle(title);
     return book != null ? convertToDTO(book) : null;
}




	

}
