package com.app.dto;

import java.time.LocalDate;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserDTO {
	private Long id;
     private String firstName;
     private String lastName;
     private String email;
     private LocalDate dob;
     private String gender;
     private String phoneNo;
     private String userRole;
     private byte[] image;
}
