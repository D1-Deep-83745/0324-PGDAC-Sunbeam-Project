package com.app.service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

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
	    List<InvoiceTableData> result = new ArrayList<>();
	    List<OrderDetails> details = orderDetailsRepo.findTop7ByOrderByCreatedOnDesc();
	    
	    for (OrderDetails od : details) {
	    	
	    	Long invoiceId;
	        if (od == null) {
	        	invoiceId = null;
	            continue;
	        }else {
	        invoiceId = od.getId();
	        }
	        
	        User user = od.getUser();
	        Long userId;
	        if (user == null) {
	           userId = null;
	            continue;
	        }else { 
	         userId = user.getId();
	        }
	        
	        LocalDate invoiceDate = od.getCreatedOn();
	        LocalDate dueDate = od.getCreatedOn().plusMonths(1);
	        double totalAmount = od.getTotalAmount();
	        
	        Transaction transaction = od.getTransaction();
	        double paidAmount;
	        String status;
	        if (transaction == null) {
	        	 paidAmount = 0;
	        	 status= null;
	            continue;
	        }else {
	         paidAmount = transaction.getAmount();
	         status = od.getStatus();
	        }
	        
	        InvoiceTableData dto = new InvoiceTableData(invoiceId, userId, invoiceDate, dueDate, totalAmount, paidAmount, status);
	        result.add(dto);
	        
	        System.out.println("Processing OrderDetails: ID=" + invoiceId + ", UserID=" + userId + ", TotalAmount=" + totalAmount + ", PaidAmount=" + paidAmount);
	    }
	    
	    return result;
	}

}
