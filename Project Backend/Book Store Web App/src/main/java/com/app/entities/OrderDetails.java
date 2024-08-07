package com.app.entities;

import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Setter
@Getter
@NoArgsConstructor
@ToString
@Entity
public class OrderDetails extends BaseEntity {
   private String status;
   
   @ManyToOne
   @JoinColumn(name = "user_id")
   private User user;
   
   @ManyToMany
   @JoinTable(name = "order_book",joinColumns = @JoinColumn(name = "order_id"),inverseJoinColumns =  @JoinColumn(name = "book_id"))
   private Set<BookDetails> books = new HashSet<BookDetails>();
}
