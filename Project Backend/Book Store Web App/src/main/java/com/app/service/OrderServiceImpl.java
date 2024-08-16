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
import com.app.entities.BookDetails;
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
	    // Fetch user by ID or throw an exception if not found
	    User user = userRepo.findById(id).orElseThrow(() -> new RuntimeException("User not found"));

	    // Create and set up the transaction
	    Transaction transaction = new Transaction();
	    transaction.setAmount(order.getAmount());
	    transaction.setPaymentMode(ModeOfPayment.valueOf(order.getPaymentMethod().toUpperCase()));
	    transaction.setStatus("PAID");
	    transaction.setUser(user); // Associate the transaction with the user

	    // Create and set up the new order
	    OrderDetails newOrder = new OrderDetails();
	    newOrder.setUser(user); // Associate the order with the user
	    newOrder.setStatus("ORDER_RECEIVED");

	    // Establish bidirectional relationship between OrderDetails and Transaction
	    transaction.setOrderDetails(newOrder); // Set the order details in the transaction
	    newOrder.setTransaction(transaction); // Set the transaction in the order details

	    // Process each item in the cart and create OrderItems
	    List<CartDTO> items = order.getCartItems();
	    for (CartDTO item : items) {
	        // Fetch book details by ID or throw an exception if not found
	        BookDetails book = bookRepo.findById(item.getId()).orElseThrow(() -> new RuntimeException("Book not found"));

	        // Create and set up the order item
	        OrderItem orderItem = new OrderItem();
	        orderItem.setBook(book);
	        orderItem.setPrice(item.getPrice());
	        orderItem.setQuantity(item.getQuantity());
	        orderItem.setOrder(newOrder); // Associate order item with the order

	        // Add the order item to the order's item list
	        newOrder.getItemList().add(orderItem);

	        // Update the book inventory
	        BookInventory inventory = inventoryRepo.findByBookId(book.getId())
	            .orElseThrow(() -> new RuntimeException("Inventory not found"));
	        inventory.setAvailableQuantity(inventory.getAvailableQuantity() - item.getQuantity());
	    }

	    // Save the new order with its items and transaction
	    orderDetailsRepo.save(newOrder);

	    return "Order placed successfully";
	}

	

	@Override
	public List<OrderDto> getOrders(Long userId) {
	    // Fetch user by ID or throw an exception if not found
	    User user = userRepo.findById(userId)
	        .orElseThrow(() -> new RuntimeException("User not found"));

	    // Fetch orders associated with the user
	    List<OrderDetails> orders = orderDetailsRepo.findByUser(user);

	    // Convert orders to DTOs
	    List<OrderDto> orderDtoList = orders.stream()
	        .map(orderDetails -> {
	            // Initialize OrderDto
	            OrderDto orderDto = new OrderDto();

	            // Retrieve and set transaction details
	            Transaction transaction = orderDetails.getTransaction();
	            if (transaction != null) {
	                orderDto.setPaymentMethod(transaction.getPaymentMode() != null ? transaction.getPaymentMode().toString() : "N/A");

	                // Handle null check for Double amount
	                Double amount = transaction.getAmount();
	                orderDto.setAmount(amount != null ? amount : 0.0);
	            } else {
	                orderDto.setPaymentMethod("N/A");
	                orderDto.setAmount(0.0);
	            }

	            // Ensure the itemList is fetched
	            List<OrderItem> items = orderDetails.getItemList();
	            List<CartDTO> cartItems = items != null ? items.stream()
	                .filter(item -> item.getBook() != null) // Ensure book is not null
	                .map(item -> {
	                    CartDTO cartDto = new CartDTO();
	                    cartDto.setId(item.getBook().getId());
	                    cartDto.setTitle(item.getBook().getTitle());
	                    cartDto.setPrice(item.getPrice());
	                    cartDto.setQuantity(item.getQuantity());
	                    return cartDto;
	                })
	                .collect(Collectors.toList()) : new ArrayList<>();

	            orderDto.setCartItems(cartItems);

	            return orderDto;
	        })
	        .collect(Collectors.toList());

	    return orderDtoList;
	}


}
