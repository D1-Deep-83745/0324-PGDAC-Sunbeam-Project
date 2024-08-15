package com.app.repository;

import org.springframework.data.domain.Pageable;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.app.dto.BookSalesDTO;
import com.app.entities.OrderDetails;

public interface OrderDetailsRepository extends JpaRepository<OrderDetails, Long> {
	  
	  @Query("SELECT new com.app.dto.BookSalesDTO(b.id, b.title, SUM(oi.quantity)) " +
	           "FROM OrderItem oi JOIN oi.book b " +
	           "GROUP BY b.id, b.title " +
	           "ORDER BY SUM(oi.quantity) DESC")
	    List<BookSalesDTO> findTopSoldBooks(Pageable pageable);
	  
	  
	  @Query(value = "SELECT DATE(oi.created_on) AS date, SUM(oi.quantity) AS totalQuantity " +
              "FROM order_item oi " +
              "WHERE oi.created_on >= CURRENT_DATE - INTERVAL 7 DAY " +
              "GROUP BY DATE(oi.created_on) " +
              "ORDER BY DATE(oi.created_on)", nativeQuery = true)
		List<Object[]> findDayWiseSalesForLast7Days();

        
		List<OrderDetails> findTop7ByOrderByCreatedOnDesc();
		
		List<OrderDetails> findAllByOrderByCreatedOnDesc();
}
