// TransactionDetails.java
package com.example.demo.entity;

import lombok.Data;

import javax.persistence.*;
import java.util.Date;

@Data
@Entity
@Table(name = "transactiondetails")
public class TransactionDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long transactionId;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private UserDetails user;

    @ManyToOne
    @JoinColumn(name = "order_id")
    private OrderDetails order;

    private double amount;
    private Date transactionDate;
    private String paymentMethod;
    private String paymentStatus;
}
