// Review.java
package com.example.demo.entity;

import lombok.Data;

import javax.persistence.*;
import java.util.Date;

@Data
@Entity
@Table(name = "review")
public class Review {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long reviewId;

    @ManyToOne
    @JoinColumn(name = "book_id")
    private BookDetails book;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private UserDetails user;

    private int rating;
    private String comment;
    private Date reviewDate;

    @ManyToOne
    @JoinColumn(name = "admin_id")
    private Admin admin;
}
