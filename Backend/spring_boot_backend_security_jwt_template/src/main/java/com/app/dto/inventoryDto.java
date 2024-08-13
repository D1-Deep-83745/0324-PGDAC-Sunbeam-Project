package com.app.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class inventoryDto {
	 private Long id;
     private String title;
     private int available_quantity;
     private String  location;    
}
