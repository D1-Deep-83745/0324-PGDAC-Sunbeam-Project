package com.app.entities;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.OneToMany;

import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString(exclude = {"password"})
@EqualsAndHashCode(of = "email",callSuper = false)
public class User extends BaseEntity {
  @Column(length = 25,nullable = false)
  private String firstName;
  
  @Column(length = 25 , nullable = false)
  private String lastName;
  
  @Column(length = 25 ,unique = true, nullable = false)
  private String email;
  
  @Column(length=15)
  private String phoneNo;
  
  
  private LocalDate dob;
  
  @Column(length = 1 )
  private String gender;
  
  @Enumerated(EnumType.STRING)
  @Column(length = 8)
  private Role userRole;
  
  @Column(length = 100 , nullable = false)
  private String password;
  
  @OneToMany(mappedBy = "user" , cascade = CascadeType.ALL , orphanRemoval = true )
  private List<Transaction> transactions = new ArrayList<Transaction>();
  
  @OneToMany(mappedBy = "user" , cascade = CascadeType.ALL , orphanRemoval = true )
  private List<OrderDetails> orders = new ArrayList<OrderDetails>();
  
  @OneToMany(mappedBy = "user" , cascade = CascadeType.ALL , orphanRemoval = true )
  private List<Address> address=new ArrayList<Address>();
}
