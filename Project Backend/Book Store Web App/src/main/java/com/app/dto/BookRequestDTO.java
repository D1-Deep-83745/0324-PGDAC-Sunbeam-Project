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
public class BookRequestDTO {
	    private String title;
	    private String description;
	    private double price;
	    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
	    private LocalDate publishDate;
	    private Long categoryId;
	    private Long authorId;
	    private Long publisherId;
        private Long userId;
}
