package com.app.service;

import java.util.List;

import com.app.dto.AddressDto;


public interface AddressService {
 List<AddressDto> getAddressesByUserId(Long userId);
 AddressDto addAddress(Long userId , AddressDto addressDto);
}
