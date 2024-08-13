package com.app.entities;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
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
@ToString
@Entity
public class OrderDetails extends BaseEntity {
   private String status;
   
   @ManyToOne
   @JoinColumn(name = "user_id")
   private User user;
   
   @OneToMany(mappedBy = "order",cascade = CascadeType.ALL, orphanRemoval = true)
   private List<OrderItem> itemList = new ArrayList<OrderItem>();
   
   @OneToOne(mappedBy = "orders" ,cascade = CascadeType.ALL )
   private Transaction transaction;
   
   public double getTotalAmount() {
       return itemList.stream()
               .mapToDouble(item -> item.getPrice() * item.getQuantity())
               .sum();
   }
}
