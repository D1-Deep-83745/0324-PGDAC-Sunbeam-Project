// UserCredentials.java
package com.example.demo.entity;

import lombok.Data;

import javax.persistence.*;

@Data
@Entity
@Table(name = "user_credentials")
public class UserCredentials {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userId;

    private String password;
    private boolean isAdmin;

    @OneToOne(mappedBy = "userCredentials")
    private UserDetails userDetails;
}