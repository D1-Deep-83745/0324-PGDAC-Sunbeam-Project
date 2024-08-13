import Sidebar from "../component/sidear";
import Header from "../component/header";
import BookForm from "../component/bookForm";
import { addBook } from "../service/books";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
function AddBook(){

   const navigate = useNavigate()
   const handleSubmit=async(bookData)=>{
         const addBookResult = await addBook(bookData.title, bookData.description, bookData.price, bookData.publishDate, bookData.categoryId, bookData.authorId, bookData.publisherId);

         if(addBookResult.status===200){
             toast.success("Book Added Successfully")
             navigate("/Books")
         }
  }
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
                <BookForm action={"ADD BOOK"} onsubmit={handleSubmit} book={null}/>
              </div>
            </main>
          </div>
        </div>
      </div>
      
      );
}

export default AddBook