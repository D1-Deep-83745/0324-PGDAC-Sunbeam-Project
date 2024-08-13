package com.app.service;

import java.util.List;
import java.util.stream.Collectors;

import javax.transaction.Transactional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.dto.PublisherDTO;
import com.app.entities.Publisher;
import com.app.repository.PublisherRepository;

@Transactional
@Service
public class PublisherServiceImpl implements PublisherService {
	@Autowired
	private ModelMapper mapper;  
	@Autowired
	private PublisherRepository publisherRepo;
		

	@Override
	public List<PublisherDTO> getAllPublishers() {
		 List<Publisher> publishers = publisherRepo.findAll();
		    return publishers.stream()
		                  .map(publisher -> mapper.map(publisher, PublisherDTO.class))
		                  .collect(Collectors.toList());
		
	}


	@Override
	public String addPublisher(PublisherDTO publisher) {
         Publisher publisherEntity = mapper.map(publisher, Publisher.class);
	     publisherRepo.save(publisherEntity);
         return "Category added successfully";
		
	}

}
