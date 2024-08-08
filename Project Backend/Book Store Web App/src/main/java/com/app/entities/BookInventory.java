package com.app.entities;

import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class BookInventory extends BaseEntity {
   private int availableQuantity; 
   
   @OneToOne
   @JoinColumn(name = "book_id")
   private BookDetails book;
   
   @Enumerated(EnumType.STRING)
   private Location location;
}
