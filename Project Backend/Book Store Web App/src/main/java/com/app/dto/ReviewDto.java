package com.app.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ReviewDto {
	private Long id;
	private String userName;
    private Long bookId;
    private Long userId;
    private String title;
    private int rating;
    private String comment;
}
