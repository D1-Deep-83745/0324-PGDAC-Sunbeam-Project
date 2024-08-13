package com.app.dto;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;

import org.hibernate.validator.constraints.Length;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class SignInDto {
	@NotEmpty(message = "Email can't be blank")
	@Email(message = "Invalid email format")
	private String email;
	@NotEmpty
	@Length(min = 3,max=20,message = "Invalid password length")
	private String password;}
