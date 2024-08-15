package com.app.controller;

import java.util.List;

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

import com.app.dto.AddressDto;
import com.app.service.AddressService;


@RestController
@RequestMapping("/address")
@CrossOrigin(origins = {"http://localhost:3000" ,"http://localhost:3001"})
public class AddressController {
	@Autowired
	private AddressService addressService;
	
	   @GetMapping("/user/{userId}")
	    public ResponseEntity<?> getAddressesByUserId(@PathVariable Long userId) {
	        List<AddressDto> addresses = addressService.getAddressesByUserId(userId);
	        return ResponseEntity.ok(addresses);
	    }
	   
	   @PostMapping("/user/{userId}")
	    public ResponseEntity<?> addAddress(@PathVariable Long userId, @RequestBody AddressDto addressDto) {
	        try {
	            AddressDto savedAddress = addressService.addAddress(userId, addressDto);
	            return ResponseEntity.status(HttpStatus.CREATED).body(savedAddress);
	        } catch (Exception e) {
	            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error adding address: " + e.getMessage());
	        }
	    }
}
