package com.app.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.app.entities.BookDetails;

public interface BookRepository extends JpaRepository<BookDetails, Long> {
	 @Query(value = "SELECT COUNT(*) FROM book_details", nativeQuery = true)
	 int totalBooks();
	 boolean existsByTitle(String title);
	BookDetails findByTitle(String title);
}
