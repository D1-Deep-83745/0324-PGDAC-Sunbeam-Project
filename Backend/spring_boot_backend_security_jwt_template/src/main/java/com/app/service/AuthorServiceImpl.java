package com.app.service;

import java.util.List;
import java.util.stream.Collectors;

import javax.transaction.Transactional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.dto.AuthorDTO;
import com.app.entities.Author;
import com.app.repository.AuthorRepository;

@Service
@Transactional
public class AuthorServiceImpl implements AuthorService {
    @Autowired
	private ModelMapper mapper;  
	@Autowired
	private AuthorRepository authorRepo;
		
	@Override
	public List<AuthorDTO> getAllAuthors() {
	    List<Author> authors = authorRepo.findAll();
	    return authors.stream()
	                  .map(author -> mapper.map(author, AuthorDTO.class))
	                  .collect(Collectors.toList());
	}

	
	@Override
	public String addAuthor(AuthorDTO author) {
           Author authorEntity = mapper.map(author, Author.class); 
    	   authorRepo.save(authorEntity);
	       return "Category added successfully";	
	}


}
