package com.app.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.app.entities.BookDetails;

public interface BookRepository extends JpaRepository<BookDetails, Long> {
	 @Query(value = "SELECT COUNT(*) FROM book_details", nativeQuery = true)
	 int totalBooks();
	 
	 @Query("SELECT b.id FROM BookDetails b WHERE b.title = :title")
	  Long findBookIdByTitle(@Param("title") String title);
	 
	 boolean existsByTitle(String title);
	 
	 //BookDetails findByTitle(String title);
	 
	 Optional<BookDetails> findByTitle(String title);
}
