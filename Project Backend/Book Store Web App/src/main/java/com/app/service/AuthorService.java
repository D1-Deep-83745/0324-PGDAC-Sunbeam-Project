package com.app.service;

import java.util.List;

import com.app.dto.AuthorDTO;

public interface AuthorService {
     List<AuthorDTO> getAllAuthors();
     
     String addAuthor(AuthorDTO author);
}
