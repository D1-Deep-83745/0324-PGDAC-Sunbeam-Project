package com.app.service;

import java.util.List;

import com.app.dto.InvoiceTableData;
import com.app.dto.OrderDto;

public interface OrderService {
     List<InvoiceTableData> getLatestInvoices();
     List<InvoiceTableData> getAllInvoices();
     String placeOrder(Long id , OrderDto order);
}
