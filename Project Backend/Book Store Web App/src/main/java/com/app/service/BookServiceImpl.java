package com.app.service;

import java.io.IOException;
import java.math.BigDecimal;
import java.sql.Date;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import javax.transaction.Transactional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.app.dto.BookChartData;
import com.app.dto.BookDetailsDTO;
import com.app.dto.BookRequestDTO;
import com.app.dto.BookSalesDTO;
import com.app.dto.DayWiseSalesDTO;
import com.app.entities.Author;
import com.app.entities.BookDetails;
import com.app.entities.BookInventory;
import com.app.entities.Category;
import com.app.entities.Publisher;
import com.app.entities.User;
import com.app.repository.AuthorRepository;
import com.app.repository.BookInventoryRepository;
import com.app.repository.BookRepository;
import com.app.repository.CategoryRepository;
import com.app.repository.OrderDetailsRepository;
import com.app.repository.PublisherRepository;
import com.app.repository.UserRepository;

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
    
    @Autowired
    private PublisherRepository publisherRepository;
    
    @Autowired
    private AuthorRepository authorRepository;
    
    @Autowired
    private CategoryRepository categoryRepository;
    
    @Autowired
    private UserRepository userRepo;
    
    @Autowired
    private ModelMapper mapper;
    
    
    @Autowired
    private BookImageHandlingService imgHandlingService;
    
    @Override
    public int totalBooks() {        
        return bookRepo.totalBooks();
    }

    @Override
    public List<BookSalesDTO> getTopBooks() {
        Pageable pageable = PageRequest.of(0, 7);
        return orderRepo.findTopSoldBooks(pageable);
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
        List<DayWiseSalesDTO> dayWiseSale = new ArrayList<>();
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
       
    @Override
    public List<BookDetails> findByCategory(Category category) {
        return findByCategory(category);
    }
     
    @Override
    public List<BookDetailsDTO> getAllBooks() throws IOException{
        List<BookDetails> books = bookRepo.findAll();
        List<BookDetailsDTO> dto = new ArrayList<BookDetailsDTO>();
        
        for(BookDetails b : books) {
        	BookDetailsDTO bdto = this.convertToDTO(b);
        	dto.add(bdto);
        }
        return dto;
    }
     
    
    @Override
   	public BookDetailsDTO getBookByTitle(String title)throws IOException {
   	    BookDetails book = bookRepo.findByTitle(title).orElse(null);
   	    return  this.convertToDTO(book);
   	}
    
    
    
    
    private BookDetailsDTO convertToDTO(BookDetails book) throws IOException {
        if (book == null) {
            
            return new BookDetailsDTO(); 
        }

        BookDetailsDTO dto = new BookDetailsDTO();
        dto.setId(book.getId());
        dto.setTitle(book.getTitle());
        dto.setDescription(book.getDescription());
        dto.setPrice(book.getPrice());
        dto.setPublishDate(book.getPublishDate());

        dto.setCategoryName(book.getBookCategory() != null ? book.getBookCategory().getCategoryName() : "Unknown");
        dto.setAuthorName(book.getAuthor() != null ? book.getAuthor().getAuthorName() : "Unknown");
        dto.setPublisherName(book.getPublication() != null ? book.getPublication().getPublisherName() : "Unknown");

        
        String image = imgHandlingService.serveImage(book.getId());
        dto.setImage(image != null ? image : "default-image-path"); 

        return dto;
    }

    @Override
    public void deleteBook(Long id) {
        bookRepo.deleteById(id);
    }
    
    @Override
    public BookDetailsDTO getBookById(Long id) throws IOException {
        BookDetails book = bookRepo.findById(id).orElseThrow(() -> new RuntimeException("Book not found"));
        BookDetailsDTO bookdto = mapper.map(book, BookDetailsDTO.class);
        bookdto.setImage(imgHandlingService.serveImage(id)); 
        return bookdto;
    }
    
    @Override
    public String updateBook(Long id, BookRequestDTO bookDetails, MultipartFile file) throws IOException {
        BookDetails book = bookRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Book not found with id: " + id));
        book.setTitle(bookDetails.getTitle());
        book.setDescription(bookDetails.getDescription());
        book.setPrice(bookDetails.getPrice());
        book.setPublishDate(bookDetails.getPublishDate());
        if (bookDetails.getAuthorId() != null) {
            authorRepository.findById(bookDetails.getAuthorId())
                    .ifPresent(book::setAuthor);
        }
        if (bookDetails.getCategoryId() != null) {
            categoryRepository.findById(bookDetails.getCategoryId())
                    .ifPresent(book::setBookCategory);
        }
        if (bookDetails.getPublisherId() != null) {
            publisherRepository.findById(bookDetails.getPublisherId())
                    .ifPresent(book::setPublication);
        }

        if (file != null && !file.isEmpty()) {
            imgHandlingService.uploadImage(book, file);
        }
        bookRepo.save(book);
        return "Updation Successful";
    }


  
    
    
    @Override
    public String addBook(BookRequestDTO newBook , MultipartFile file) throws IOException {
        Author author = authorRepository.findById(newBook.getAuthorId()).orElse(null);
        Publisher publisher = publisherRepository.findById(newBook.getPublisherId()).orElse(null);
        Category category = categoryRepository.findById(newBook.getCategoryId()).orElse(null);
        User user = userRepo.findById(newBook.getUserId()).orElse(null);
        System.out.println("Author: " + author);
        System.out.println("Publisher: " + publisher);
        System.out.println("Category: " + category);
        System.out.println("User: " + user);
        if (author == null) {
            return "Author not found";
        }
        if (publisher == null) {
            return "Publisher not found";
        }
        if (category == null) {
            return "Category not found";
        }
        if (user == null) {
            return "User not found";
        }
        BookDetails book = mapper.map(newBook, BookDetails.class);
        book.setAuthor(author);
        book.setBookCategory(category);
        book.setPublication(publisher);
        book.setUser(user);
        imgHandlingService.uploadImage(book, file);
        bookRepo.save(book);
        return "Book added Successfully!";
    }

	

   


}
