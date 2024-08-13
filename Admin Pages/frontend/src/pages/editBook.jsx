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
  const navigate = useNavigate()

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
      toast.error("Something Went wrong...!!!");
    }
  };

  const handleSubmit = async (bookData) => {
    try {
      const updateResult = await updateBook(id, bookData.title, bookData.description, bookData.price, bookData.publishDate, bookData.categoryId, bookData.authorId, bookData.publisherId);

      if (updateResult.status === 200) {
        toast.success("Book Updated Successfully...!!!");
         navigate("/Books")
      } else {
        toast.error("Something Went Wrong...!");
      }
    } catch (error) {
      toast.error("Something Went Wrong...!");
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
              <h2>Edit Book Details</h2>
              <BookForm book={book} action={"Update Book"} onsubmit={handleSubmit} />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

export default EditBooks;
