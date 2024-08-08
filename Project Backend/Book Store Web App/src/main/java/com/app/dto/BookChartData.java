package com.app.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class BookChartData {
	    
	    private Long id;
	    private String title;
	    private long quantitySold;
	    private int remainingInventory;
	    
}
