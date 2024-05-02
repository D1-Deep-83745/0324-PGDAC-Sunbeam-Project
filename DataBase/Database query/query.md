## User_Credentials
User_Credentials (
    UserID INT PRIMARY KEY,
    Password VARCHAR(100) NOT NULL,
    FOREIGN KEY (UserID) REFERENCES User_Details(UserID)
);

## Create User_Details table
CREATE TABLE User_Details (
    UserID INT PRIMARY KEY,
    Email VARCHAR(100) UNIQUE NOT NULL,
    Name VARCHAR(50),
    Phone VARCHAR(20),
    Gender VARCHAR(20),
    DOB DATE
);

## Create Address table
CREATE TABLE Address (
    AddressID INT PRIMARY KEY,
    UserID INT,
    Street VARCHAR(255),
    City VARCHAR(100),
    State VARCHAR(100),
    ZipCode VARCHAR(20),
    Country VARCHAR(100),
    FOREIGN KEY (UserID) REFERENCES User_Details(UserID)
);

## Create Author table
CREATE TABLE Author (
    AuthorID INT PRIMARY KEY,
    AuthorName VARCHAR(100)
);

## Create Publisher table
CREATE TABLE Publisher (
    PublisherID INT PRIMARY KEY,
    PublisherName VARCHAR(100)
);

## Modify BookDetails table
CREATE TABLE BookDetails (
    BookID INT PRIMARY KEY,
    Title VARCHAR(255) NOT NULL,
    Description TEXT,
    Price DECIMAL(10, 2) NOT NULL,
    PublishDate INT,
    CategoryId INT,
    AuthorID INT,
    PublisherID INT,
    FOREIGN KEY (AuthorID) REFERENCES Author(AuthorID),
    FOREIGN KEY (PublisherID) REFERENCES Publisher(PublisherID),
    FOREIGN KEY (CategoryId) REFERENCES Category(CategoryId)
);


## BookInventory
CREATE TABLE BookInventory (
    BookID INT PRIMARY KEY,
    AvailableQuantity INT NOT NULL,
);

## Review
CREATE TABLE Review (
    ReviewID INT PRIMARY KEY,
    BookID INT,
    UserID INT,
    Rating INT NOT NULL,
    Comment TEXT,
    ReviewDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (BookID) REFERENCES Book(BookID),
    FOREIGN KEY (UserID) REFERENCES User(UserID)
);

## Create Category table
CREATE TABLE Category (
    CategoryID INT PRIMARY KEY,
    CategoryName VARCHAR(100) NOT NULL
);

## Create Order table
CREATE TABLE OrderDetails (
    OrderID INT PRIMARY KEY,
    UserID INT,
    OrderDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    TotalAmount DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (UserID) REFERENCES User_Details(UserID)
);

## Create OrderItem table
CREATE TABLE OrderItem (
    OrderItemID INT PRIMARY KEY,
    OrderID INT,
    BookID INT,
    Quantity INT NOT NULL,
    Price DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (OrderID) REFERENCES OrderDetails(OrderID),
    FOREIGN KEY (BookID) REFERENCES BookDetails(BookID)
);


## transaction 
CREATE TABLE TransactionDetails (
    TransactionID INT PRIMARY KEY,
    UserID INT,
    OrderID INT,
    Amount DECIMAL(10, 2) NOT NULL,
    TransactionDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PaymentMethod VARCHAR(50),
    PaymentStatus VARCHAR(50),
    FOREIGN KEY (UserID) REFERENCES User_Details(UserID),
    FOREIGN KEY (OrderID) REFERENCES OrderDetails(OrderID)
);

    
## Admin table
CREATE TABLE Admin (
    AdminID INT PRIMARY KEY,
    Username VARCHAR(100) UNIQUE NOT NULL,
    Password VARCHAR(100) NOT NULL
);

## Modify User_Credentials table to allow admin login
ALTER TABLE User_Credentials ADD COLUMN IsAdmin BOOLEAN DEFAULT FALSE;

## Add foreign key to Admin table in User_Credentials
ALTER TABLE User_Credentials ADD COLUMN AdminID INT;
ALTER TABLE User_Credentials ADD CONSTRAINT FK_UserCredentials_AdminID FOREIGN KEY (AdminID) REFERENCES Admin(AdminID);

## Add AdminID to User_Details table to associate admin with user details
ALTER TABLE User_Details ADD COLUMN AdminID INT;
ALTER TABLE User_Details ADD CONSTRAINT FK_UserDetails_AdminID FOREIGN KEY (AdminID) REFERENCES Admin(AdminID);

 Update existing tables with AdminID columns where necessary

## Update OrderDetails table to associate admin with orders
ALTER TABLE OrderDetails ADD COLUMN AdminID INT;
ALTER TABLE OrderDetails ADD CONSTRAINT FK_OrderDetails_AdminID FOREIGN KEY (AdminID) REFERENCES Admin(AdminID);

##  Update BookDetails table to associate admin with book details
ALTER TABLE BookDetails ADD COLUMN AdminID INT;
ALTER TABLE BookDetails ADD CONSTRAINT FK_BookDetails_AdminID FOREIGN KEY (AdminID) REFERENCES Admin(AdminID);

## Update Review table to associate admin with reviews
ALTER TABLE Review ADD COLUMN AdminID INT;
ALTER TABLE Review ADD CONSTRAINT FK_Review_AdminID FOREIGN KEY (AdminID) REFERENCES Admin(AdminID);
