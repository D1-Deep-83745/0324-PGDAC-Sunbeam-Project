package com.app.service;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.repository.BookRepository;

@Service
@Transactional
public class BookServiceImpl implements BookService {
    
	@Autowired
	private BookRepository bookRepo;
	
	@Override
	public int totalBooks() {		
		return bookRepo.totalBooks();
	}

}
