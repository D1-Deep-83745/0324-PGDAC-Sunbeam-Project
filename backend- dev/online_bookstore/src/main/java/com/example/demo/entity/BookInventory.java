// BookInventory.java
package com.example.demo.entity;

import lombok.Data;

import javax.persistence.*;

@Data
@Entity
@Table(name = "bookinventory")
public class BookInventory {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long inventoryId;

    private int availableQuantity;

    @OneToOne
    @JoinColumn(name = "book_id", nullable = false)
    private BookDetails book;
}
