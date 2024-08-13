package com.app.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.dto.inventoryDto;
import com.app.entities.BookDetails;
import com.app.entities.BookInventory;
import com.app.entities.Location;
import com.app.repository.BookInventoryRepository;
import com.app.repository.BookRepository;
import java.util.Map;

@Service
@Transactional
public class BookInventoryServiceImpl implements BookInventoryService {

	@Autowired
	private BookInventoryRepository inventoryRepo;
	
	@Autowired
	private BookRepository bookRepo;
	
	@Override
	public List<inventoryDto> getALLInventory() {
	    List<BookInventory> allInventory = inventoryRepo.findAll();
	    List<inventoryDto> dtolist = new ArrayList<>();

	    // Using a Map to keep track of unique combinations of book and location
	    Map<String, inventoryDto> inventoryMap = new HashMap<>();
	    
	    for (BookInventory inventory : allInventory) {
	        // Creating a unique key for book and location
	        String uniqueKey = inventory.getBook().getTitle() + "_" + (inventory.getLocation() != null ? inventory.getLocation().name() : "Unknown");
	        
	        if (!inventoryMap.containsKey(uniqueKey)) {
	            inventoryDto dto = new inventoryDto();
	            dto.setId(inventory.getId());
	            dto.setTitle(inventory.getBook() != null ? inventory.getBook().getTitle() : null);
	            dto.setAvailable_quantity(inventory.getAvailableQuantity());
	            dto.setLocation(inventory.getLocation() != null ? inventory.getLocation().name() : null);
	            
	            inventoryMap.put(uniqueKey, dto);
	        } else {
	            // You can handle the case of duplicates here if necessary
	            // For example, you might want to aggregate quantities if needed
	            inventoryDto existingDto = inventoryMap.get(uniqueKey);
	            existingDto.setAvailable_quantity(existingDto.getAvailable_quantity() + inventory.getAvailableQuantity());
	        }
	    }
	    
	    // Adding all unique records to the DTO list
	    dtolist.addAll(inventoryMap.values());
	    
	    return dtolist;
	}

	@Override
	public String updateInventory(Long id, inventoryDto dto) {
		    BookInventory inventory=inventoryRepo.findById(id).orElse(null);
		    inventory.setAvailableQuantity(dto.getAvailable_quantity());
		    
		    inventoryRepo.save(inventory);
		return "inventory updated Successfully";
	}

	@Override
	public String createInventory(inventoryDto dto) {

	    BookDetails book = bookRepo.findByTitle(dto.getTitle()).orElse(null);
	    

	    if (book == null) {

	        return "Book with title " + dto.getTitle() + " not found.";
	    }
	    
	    BookInventory inventory = new BookInventory();
	    inventory.setBook(book);
	    inventory.setAvailableQuantity(dto.getAvailable_quantity());
	    inventory.setLocation(Location.valueOf(dto.getLocation()));    
	    inventoryRepo.save(inventory);
	    return "Inventory for book " + dto.getTitle() + " created successfully.";
	}


}
