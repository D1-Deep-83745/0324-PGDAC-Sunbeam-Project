package com.app.dto;

import java.util.ArrayList;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class OrderDto {
    
	private List<CartDTO> cartItems = new ArrayList<CartDTO>();
	private String paymentMethod;
	private double amount;
}
