package com.app.service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.dto.InvoiceTableData;
import com.app.entities.OrderDetails;
import com.app.entities.Transaction;
import com.app.entities.User;
import com.app.repository.OrderDetailsRepository;

@Transactional
@Service
public class OrderServiceImpl implements OrderService {
    
	@Autowired
	private OrderDetailsRepository orderDetailsRepo;
	
	
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

}
