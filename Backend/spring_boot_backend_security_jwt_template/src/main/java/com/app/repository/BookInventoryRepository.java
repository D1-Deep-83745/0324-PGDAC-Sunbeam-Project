package com.app.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.entities.BookInventory;

public interface BookInventoryRepository extends JpaRepository<BookInventory, Long> {
	Optional<BookInventory> findByBookId(Long bookId);
	   
}
