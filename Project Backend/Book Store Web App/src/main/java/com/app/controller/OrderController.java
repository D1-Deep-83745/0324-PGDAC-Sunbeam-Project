package com.app.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.dto.OrderDto;
import com.app.repository.OrderDetailsRepository;
import com.app.service.OrderService;

@RestController
@RequestMapping("/orders")
@CrossOrigin(origins = {"http://localhost:3000" ,"http://localhost:3001"})
public class OrderController { 
	
	@Autowired
	private OrderService orderService;
	
	@GetMapping("/latest")
	public ResponseEntity<?> getLatest(){
		return ResponseEntity.status(HttpStatus.OK).body(orderService.getLatestInvoices());
	}
     
	@GetMapping("/allInvoices")
	public ResponseEntity<?> getAllInvoices(){
		return ResponseEntity.status(HttpStatus.OK).body(orderService.getAllInvoices());
	}
	
    @PostMapping("/placeOrder/{id}")
    public ResponseEntity<?> placeOrder(@PathVariable Long id , @RequestBody OrderDto order){
    	return ResponseEntity.status(HttpStatus.OK).body(orderService.placeOrder(id, order));
    }
    
    @GetMapping("/orderDetails/{id}")
    public ResponseEntity<?> getOrders(@PathVariable Long id){
    	return ResponseEntity.status(HttpStatus.OK).body(orderService.getOrders(id));
    }
}
