import Sidebar from "../component/sidear";
import Header from "../component/header";
import BookForm from "../component/bookForm";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getBookById, updateBook } from "../service/books";
import { toast } from "react-toastify";

function EditBooks() {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [file, setFile] = useState(null); // New state to store the selected file
  const navigate = useNavigate();

  useEffect(() => {
    loadOnStartup();
  }, [id]);

  const loadOnStartup = async () => {
    try {
      const bookResult = await getBookById(id);
      if (bookResult.status === 200) {
        setBook(bookResult.data);
      }
    } catch (error) {
      toast.error("Something went wrong!");
    }
  };

  const handleSubmit = async (bookData) => {
    try {
      const formData = new FormData();
      formData.append("title", bookData.title);
      formData.append("description", bookData.description);
      formData.append("price", bookData.price);
      formData.append("publishDate", bookData.publishDate);
      formData.append("categoryId", bookData.categoryId);
      formData.append("authorId", bookData.authorId);
      formData.append("publisherId", bookData.publisherId);

     
      if (file) {
        formData.append("profilePicture", file); 
      }

      const updateResult = await updateBook(id, formData);

      if (updateResult.status === 200) {
        toast.success("Book Updated Successfully!");
        navigate("/Books");
      } else {
        toast.error("Something went wrong!");
      }
    } catch (error) {
      toast.error("Something went wrong!");
    }
  };

  const handleFileChange = (file) => {
    setFile(file); // Store the file in state
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
              <h2>Edit Book Details</h2>
              <BookForm
                book={book}
                action={"edit"}
                onsubmit={handleSubmit}
                onFileChange={handleFileChange} // Pass handleFileChange function
              />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

export default EditBooks;
