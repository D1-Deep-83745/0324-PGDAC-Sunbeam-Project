## User_Credentials
User_Credentials (
    UserID INT PRIMARY KEY,
    Password VARCHAR(100) NOT NULL,
    FOREIGN KEY (UserID) REFERENCES User_Details(UserID)
);

## User Details
CREATE TABLE User_Details (
    UserID INT PRIMARY KEY,
    Email VARCHAR(100) UNIQUE NOT NULL,
    Name VARCHAR(50),
    Address VARCHAR(255),
    Phone VARCHAR(20),
    Gender VARCHAR(20),
    DOB Date,
);

## Book Table
CREATE TABLE BookDetails(
    BookID INT PRIMARY KEY,
    Title VARCHAR(255) NOT NULL,
    Author VARCHAR(100),
    Description TEXT,
    Price DECIMAL(10, 2) NOT NULL,
    PublishDate INT,
    CategoryId INT,
    FOREIGN KEY (CategoryId) REFERENCES Category(CategoryId),
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


    