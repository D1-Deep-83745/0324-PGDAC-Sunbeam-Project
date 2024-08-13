package com.app.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.app.entities.User;

public interface UserRepository extends JpaRepository<User, Long> {
        Optional<User> findByEmailAndPassword(String email,String pwd);
 
        Optional<User> findByEmail(String email);
 
        boolean existsByEmail(String email);
        
        @Query(value = "SELECT COUNT(*) FROM user", nativeQuery = true)
   	    int totalUsers();
}
