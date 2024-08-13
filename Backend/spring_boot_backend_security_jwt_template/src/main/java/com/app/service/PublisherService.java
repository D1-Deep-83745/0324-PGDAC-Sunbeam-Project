package com.app.service;

import java.util.List;

import com.app.dto.PublisherDTO;

public interface PublisherService {
       List<PublisherDTO> getAllPublishers();
       
       String addPublisher(PublisherDTO publisher);
}
