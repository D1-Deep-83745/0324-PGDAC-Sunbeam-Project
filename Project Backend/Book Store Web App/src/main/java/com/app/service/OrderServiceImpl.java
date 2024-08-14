package com.app.service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.dto.CartDTO;
import com.app.dto.InvoiceTableData;
import com.app.dto.OrderDto;
import com.app.entities.BookInventory;
import com.app.entities.ModeOfPayment;
import com.app.entities.OrderDetails;
import com.app.entities.OrderItem;
import com.app.entities.Transaction;
import com.app.entities.User;
import com.app.repository.BookInventoryRepository;
import com.app.repository.BookRepository;
import com.app.repository.OrderDetailsRepository;
import com.app.repository.UserRepository;

@Transactional
@Service
public class OrderServiceImpl implements OrderService {
    
	@Autowired
	private OrderDetailsRepository orderDetailsRepo;
	
	@Autowired
	private BookRepository bookRepo;
	
	@Autowired
	private UserRepository userRepo;
	
	@Autowired
	private BookInventoryRepository inventoryRepo;
	
	@Override
	public List<InvoiceTableData> getLatestInvoices() {
	    List<OrderDetails> details = orderDetailsRepo.findTop7ByOrderByCreatedOnDesc();
	    
	    return details.stream().map(od -> {
	        Long invoiceId = od.getId();
	        User user = od.getUser();
	        Long userId = (user != null) ? user.getId() : null;

	        LocalDate invoiceDate = od.getCreatedOn();
	        LocalDate dueDate = invoiceDate.plusMonths(1);
	        double totalAmount = od.getTotalAmount();
	        
	        Transaction transaction = od.getTransaction();
	        double paidAmount = (transaction != null) ? transaction.getAmount() : 0;
	        String status = (transaction != null) ? od.getStatus() : null;

	        
	        return new InvoiceTableData(invoiceId, userId, invoiceDate, dueDate, totalAmount, paidAmount, status);
	    }).collect(Collectors.toList());
	}


	@Override
	public List<InvoiceTableData> getAllInvoices() {
		  
		 List<OrderDetails> details = orderDetailsRepo.findAllByOrderByCreatedOnDesc();
		    
		    return details.stream().map(od -> {
		        Long invoiceId = od.getId();
		        User user = od.getUser();
		        Long userId = (user != null) ? user.getId() : null;

		        LocalDate invoiceDate = od.getCreatedOn();
		        LocalDate dueDate = invoiceDate.plusMonths(1);
		        double totalAmount = od.getTotalAmount();
		        
		        Transaction transaction = od.getTransaction();
		        double paidAmount = (transaction != null) ? transaction.getAmount() : 0;
		        String status = (transaction != null) ? od.getStatus() : null;

		        
		        return new InvoiceTableData(invoiceId, userId, invoiceDate, dueDate, totalAmount, paidAmount, status);
		    }).collect(Collectors.toList());
	}


	@Override
	public String placeOrder(Long id, OrderDto order) {
	    
	    Transaction transaction = new Transaction();
	    transaction.setAmount(order.getAmount());
	    transaction.setPaymentMode(ModeOfPayment.valueOf(order.getPaymentMethod().toUpperCase()));  
	    transaction.setStatus("PAID");

	    
	    User user = userRepo.findById(id).orElseThrow(() -> new RuntimeException("User not found"));

	    
	    OrderDetails newOrder = new OrderDetails();
	    newOrder.setTransaction(transaction);
	    newOrder.setUser(user);
	    newOrder.setStatus("ORDER_RECEIVED");

	    
	    List<CartDTO> items = order.getCartItems();
	    for (CartDTO item : items) {
	     
	        OrderItem orderItem = new OrderItem();
	        orderItem.setBook(bookRepo.findById(item.getId()).orElseThrow(() -> new RuntimeException("Book not found")));
	        orderItem.setPrice(item.getPrice());
	        orderItem.setQuantity(item.getQuantity());
	        
	     
	        newOrder.getItemList().add(orderItem);

	     
	        BookInventory inventory = inventoryRepo.findById(item.getId()).orElseThrow(() -> new RuntimeException("Inventory not found"));
	        inventory.setAvailableQuantity(inventory.getAvailableQuantity() - item.getQuantity());
	    }

	    
	    transaction.setUser(user);
	    transaction.setOrderDetails(newOrder);

	    
	    orderDetailsRepo.save(newOrder);

	    return "Order placed successfully";
	}


}
