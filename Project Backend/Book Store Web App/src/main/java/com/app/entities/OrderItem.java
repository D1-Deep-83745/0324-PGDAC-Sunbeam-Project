package com.app.entities;

import java.util.Set;

import javax.persistence.Entity;
import javax.persistence.JoinColumn;
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
public class OrderItem extends BaseEntity {
	private int quantity;  
    private double price;  

    @ManyToOne
    @JoinColumn(name = "order_id")
    private OrderDetails order;  

    @ManyToOne
    @JoinColumn(name = "book_id")
    private BookDetails book; 
}
