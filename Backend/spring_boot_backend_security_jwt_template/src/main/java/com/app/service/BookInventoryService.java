package com.app.service;

import java.util.List;

import com.app.dto.inventoryDto;

public interface BookInventoryService {
       List<inventoryDto> getALLInventory();
       
       String updateInventory(Long id , inventoryDto dto);
       
       String createInventory(inventoryDto dto);
}
