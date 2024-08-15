package com.app.dto;

import java.time.LocalDate;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class InvoiceTableData {
	
	private Long id;
	private Long customerId;
    private LocalDate invoiceDate;
    private LocalDate dueDate;
    private double totalAmount;
    private double paidAmount;
    private String status;
    
}
