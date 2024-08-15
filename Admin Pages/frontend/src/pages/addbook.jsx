import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addBook } from "../service/books";
import { toast } from "react-toastify";
import BookForm from "../component/bookForm"
import Sidebar from "../component/sidear";
import Header from "../component/header";

function AddBook() {
  const [file, setFile] = useState(null);
  const navigate = useNavigate();

  const handleFileChange = (selectedFile) => {
    if (selectedFile && selectedFile.size > 10 * 1024 * 1024) { // 10MB limit
      toast.error("File size exceeds the 10MB limit");
      setFile(null);
    } else {
      setFile(selectedFile);
    }
  };

  const handleSubmit = async (bookData) => {
    const formData = new FormData();
    formData.append('title', bookData.title);
    formData.append('description', bookData.description);
    formData.append('price', bookData.price);
    formData.append('publishDate', bookData.publishDate);
    formData.append('categoryId', bookData.categoryId);
    formData.append('authorId', bookData.authorId);
    formData.append('publisherId', bookData.publisherId);
    formData.append('userId', sessionStorage.getItem('id'));

    if (file) {
      formData.append('profilePicture', file);
    }

    try {
      const addBookResult = await addBook(formData);

      if (addBookResult.status === 200) {
        toast.success("Book Added Successfully");
        navigate("/Books");
      }
    } catch (error) {
      toast.error("Failed to add book");
    }
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-lg-2">
          <Sidebar />
        </div>
        <div className="col ms-0">
          <Header />
          <main className="mt-4 container-fluid">
            <div className="book-edit-form">
              <h2>Add New Book</h2>
              <BookForm
                action={"ADD BOOK"}
                onsubmit={handleSubmit}
                book={null}
                onFileChange={handleFileChange} 
              />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

export default AddBook;
