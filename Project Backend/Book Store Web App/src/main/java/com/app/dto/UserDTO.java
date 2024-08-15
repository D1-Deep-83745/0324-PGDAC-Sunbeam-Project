package com.app.dto;

import java.time.LocalDate;

import org.springframework.format.annotation.DateTimeFormat;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class UserDTO {
	 private Long id;
     private String firstName;
     private String lastName;
     private String email;
     @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
     private LocalDate dob;
     private String gender;
     private String phoneNo;
     private String userRole;
     private byte[] image;
}
