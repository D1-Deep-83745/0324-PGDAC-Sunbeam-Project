package com.app.dto;

import java.time.LocalDate;

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
	    private LocalDate publishDate;
	    private Long categoryId;
	    private Long authorId;
	    private Long publisherId;
        private Long userId;
}
