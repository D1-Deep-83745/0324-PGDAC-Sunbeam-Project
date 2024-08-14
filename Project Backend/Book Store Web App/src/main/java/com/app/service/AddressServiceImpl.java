package com.app.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.app.dto.AddressDto;
import com.app.dto.UserDTO;
import com.app.entities.Address;
import com.app.entities.User;
import com.app.repository.AddressRepository;
import com.app.repository.UserRepository;

@Service
@Transactional
public class AddressServiceImpl implements AddressService{
	
	@Autowired
	private AddressRepository addressRepo;
	
	@Autowired
	private UserRepository userRepo;

	@Override
	public List<AddressDto> getAddressesByUserId(Long userId) {
		 List<Address> addresses = addressRepo.findByUserId(userId);
	        return addresses.stream()
	                .map(this::mapToDTO)
	                .collect(Collectors.toList());
	}

	
	 private AddressDto mapToDTO(Address address) {
	        if (address == null) return null;
	        
	        AddressDto dto = new AddressDto();
	        dto.setId(address.getId());
	        dto.setStreet(address.getStreet());
	        dto.setCity(address.getCity());
	        dto.setState(address.getState());
	        dto.setZipCode(address.getZipCode());
	        dto.setCountry(address.getCountry());
	        if (address.getUser() != null) {
	            UserDTO userDTO = new UserDTO();
	            userDTO.setId(address.getUser().getId());
	            dto.setUser(userDTO);
	        }
	        return dto;
	    }



	    @Override
	    public AddressDto addAddress(Long userId, AddressDto addressDto) {
	        // Fetch the user by ID
	        User user = userRepo.findById(userId)
	                .orElseThrow(() -> new RuntimeException("User not found"));

	        // Convert AddressDto to Address entity
	        Address address = new Address();
	        address.setStreet(addressDto.getStreet());
	        address.setCity(addressDto.getCity());
	        address.setState(addressDto.getState());
	        address.setZipCode(addressDto.getZipCode());
	        address.setCountry(addressDto.getCountry());
	        address.setUser(user);

	        // Save address and return saved address details
	        Address savedAddress = addressRepo.save(address);
	        return new AddressDto(savedAddress);
	    }

	

}
