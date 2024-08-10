package com.app.entities;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.OneToMany;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Setter
@Getter
@NoArgsConstructor
@ToString
@Entity
public class Publisher extends BaseEntity{	
	@Column(length = 20)
	private String publisherName;
	
	@OneToMany
	(mappedBy = "publication",
	cascade = CascadeType.ALL)
	private List<BookDetails> books = new ArrayList<BookDetails>();
}
