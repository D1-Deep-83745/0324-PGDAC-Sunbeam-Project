package com.app.dto;

import java.time.LocalDate;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@NoArgsConstructor
public class BookDetailsDTO {
    private Long id;
    private String title;
    private String description;
    private double price;
    private LocalDate publishDate;
    private String categoryName;
    private String authorName;
    private String publisherName;
    // Getters and setters
}

