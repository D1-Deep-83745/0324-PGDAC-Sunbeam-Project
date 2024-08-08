package com.app.service;

import java.util.List;

import com.app.dto.BookChartData;
import com.app.dto.BookSalesDTO;
import com.app.dto.DayWiseSalesDTO;

public interface BookService {
     int totalBooks() ;
     
     List<BookSalesDTO> getTopBooks();
     
     List<BookChartData> getTopSoldBooksAvailableQuantities();
     
     List<DayWiseSalesDTO> getDayWiseSalesForLast7Days();
}
