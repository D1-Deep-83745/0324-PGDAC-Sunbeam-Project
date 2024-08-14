package com.app.dto;

import com.app.entities.Address;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@ToString
@AllArgsConstructor
public class AddressDto {
    public AddressDto(Address savedAddress) {
    	 this.street = savedAddress.getStreet();
         this.city = savedAddress.getCity();
         this.state = savedAddress.getState();
         this.zipCode = savedAddress.getZipCode();
         this.country = savedAddress.getCountry();
	}
	private Long id;
    private String street;
    private String city;
    private String state;
    private String zipCode;
    private String country;
    private UserDTO user;
}


