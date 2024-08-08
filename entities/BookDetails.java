package com.app.entities;

import java.time.LocalDate;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;

import org.springframework.web.bind.annotation.RequestMapping;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Setter
@Getter
@NoArgsConstructor
@ToString
@Entity
public class BookDetails extends BaseEntity{
	
	@Column(length = 20)
	private String title;
	
	@Column
	private String description;
	
	@Column
	private double price;
	
	@Column
	private LocalDate publishDate;
	
	@ManyToOne
	@JoinColumn(name = "author_id")
	private Author author;
	
	@ManyToOne
	@JoinColumn(name = "publisher_id")
	private Publisher publisher;
	
//	@ManyToMany(fetch = FetchType.EAGER, mappedBy = "bookDetails")
//	@JoinColumn(name="category_id")
//	private Set<Category> category;
	
}
