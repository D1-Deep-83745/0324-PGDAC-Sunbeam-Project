// OrderItem.java
package com.example.demo.entity;

import lombok.Data;

import javax.persistence.*;

@Data
@Entity
@Table(name = "orderitem")
public class OrderItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long orderItemId;

    @ManyToOne
    @JoinColumn(name = "order_id")
    private OrderDetails order;

    @ManyToOne
    @JoinColumn(name = "book_id")
    private BookDetails book;

    private int quantity;
    private double price;
}
