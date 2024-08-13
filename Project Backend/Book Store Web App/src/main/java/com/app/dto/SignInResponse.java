package com.app.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class SignInResponse {
	private String jwt;
	private String mesg;
	private String firstName;
	private String lastName;
	private String Role;
	private Long id;
}