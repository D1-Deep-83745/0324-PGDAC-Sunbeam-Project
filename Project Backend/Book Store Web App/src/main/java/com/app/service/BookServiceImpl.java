package com.app.service;

import java.math.BigDecimal;
import java.sql.Date;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.stream.Collectors;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.dto.BookChartData;
import com.app.dto.BookSalesDTO;
import com.app.dto.DayWiseSalesDTO;
import com.app.entities.BookInventory;
import com.app.repository.BookInventoryRepository;
import com.app.repository.BookRepository;
import com.app.repository.OrderDetailsRepository;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

@Service
@Transactional
public class BookServiceImpl implements BookService {
    
	@Autowired
	private BookRepository bookRepo;
	
	@Autowired
	private OrderDetailsRepository orderRepo;
	
	@Autowired
	private BookInventoryRepository bookInventoryRepository;
	
	@Override
	public int totalBooks() {		
		return bookRepo.totalBooks();
	}

	@Override
	public List<BookSalesDTO> getTopBooks() {
		Pageable pageable = PageRequest.of(0, 7);
		List<BookSalesDTO> topBooksData = orderRepo.findTopSoldBooks(pageable);
		
		return topBooksData;
	}

	@Override
	public List<BookChartData> getTopSoldBooksAvailableQuantities() {
		 List<BookSalesDTO> topSoldBooks = this.getTopBooks();
		    List<BookChartData> bookInventoryDtos = new ArrayList<>();
		    
		    for (BookSalesDTO result : topSoldBooks) {
		        Long bookId = result.getBookId();
		        String title = result.getBookTitle();
		        Long soldQuantity = result.getQty();

		        BookInventory bookInventory = bookInventoryRepository.findByBookId(bookId)
		            .orElse(new BookInventory());
		        
		        BookChartData dto = new BookChartData();
		        dto.setId(bookId);
		        dto.setTitle(title);
		        dto.setRemainingInventory(bookInventory.getAvailableQuantity());
		        dto.setQuantitySold(soldQuantity);

		        bookInventoryDtos.add(dto);
		    }
		    return bookInventoryDtos;
	}
	
	 public List<DayWiseSalesDTO> getDayWiseSalesForLast7Days() {
		 List<DayWiseSalesDTO> dayWiseSale = new ArrayList<DayWiseSalesDTO>();
		     List<Object[]> result = orderRepo.findDayWiseSalesForLast7Days();
		     
		     for(Object[] sale: result) {
		    	 Date sqlDate = (Date) sale[0];
		         LocalDate date = sqlDate.toLocalDate();
		         
		         
		         BigDecimal quantity = (BigDecimal) sale[1];
		         Long qty = quantity.longValue();
		    	 
		    	 DayWiseSalesDTO dto = new DayWiseSalesDTO(date, qty);
		    	 dayWiseSale.add(dto);
		     }
	        return dayWiseSale;
	    }

}
