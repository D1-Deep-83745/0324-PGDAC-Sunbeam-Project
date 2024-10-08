package com.app.entities;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Setter
@Getter
@NoArgsConstructor

@Entity
public class BookDetails extends BaseEntity{
	@Column(length = 50 ,unique = true)
	private String title;
	
	@Column(length = 100)
	private String description;
	
	private double price;

	private LocalDate publishDate;
	
	@ManyToOne (fetch = FetchType.LAZY)
	@JoinColumn(name = "category_id")
	private Category bookCategory;
	
	@OneToMany(mappedBy = "book", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Review> reviews = new ArrayList<Review>();

	@OneToOne(mappedBy = "book", cascade = CascadeType.ALL  )
	private BookInventory stock;
	
	@ManyToOne (fetch = FetchType.LAZY)
	@JoinColumn(name = "publisher_id")
	private Publisher publication;
	
	@ManyToOne (fetch = FetchType.LAZY)
	@JoinColumn(name = "author_id")
	private Author author;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "admin_id")
	private User user;
	
	@OneToMany(mappedBy = "book", cascade = CascadeType.ALL, orphanRemoval = true)
	private List<OrderItem> orderItems = new ArrayList<>();
	
	private String imagePath;
}
