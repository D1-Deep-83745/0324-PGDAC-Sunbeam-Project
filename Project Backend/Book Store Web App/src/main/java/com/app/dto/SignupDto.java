package com.app.dto;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
public class SignupDto {

	@NotBlank
    @Size(min = 3, max = 50)
    private String firstName;

	@NotBlank
    @Size(min = 3, max = 50)
    private String lastName;

    @NotBlank
    @Email
    private String email;

    @NotBlank
    @Size(min = 6, max = 100)
    private String password;
    
    private String role;
}
