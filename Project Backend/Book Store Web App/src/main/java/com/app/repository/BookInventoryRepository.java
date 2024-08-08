package com.app.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.app.entities.BookInventory;

public interface BookInventoryRepository extends JpaRepository<BookInventory, Long> {
	Optional<BookInventory> findByBookId(Long bookId);
	
	  @Query("SELECT b.id FROM BookDetails b WHERE b.title = :title")
	  Long findBookIdByTitle(@Param("title") String title);
}
