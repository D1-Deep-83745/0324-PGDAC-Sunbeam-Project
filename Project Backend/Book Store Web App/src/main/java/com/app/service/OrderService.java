package com.app.service;

import java.util.List;

import com.app.dto.InvoiceTableData;

public interface OrderService {
     List<InvoiceTableData> getLatestInvoices();
     List<InvoiceTableData> getAllInvoices();
}
