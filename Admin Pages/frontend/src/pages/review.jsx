import Sidebar from "../component/sidear"
import Header from "../component/header"
import { useState } from "react"

function Review(){
    const [reviews,setReviews] = useState([])
    const [searchQuery,setSearchQuery] = useState("")

   const handleSearchChange =()=>{

   }
   const handleSearchSubmit =()=>{

   }
  return(
    <div className="container-fluid">
    <div className="row">
      <div className="col-lg-2 ">
        <Sidebar />
      </div>
      <div className="col ms-0">
        <Header />

        <main className="mt-4 container-fluid">
        <form class="form-inline" onSubmit={handleSearchSubmit}>
                <input
                  class="form-control mr-sm-3"
                  type="search"
                  id="search-bar"
                  placeholder="Search by title"
                  aria-label="Search"
                  value={searchQuery}
                  onChange={handleSearchChange}
                />
                <button
                  class="btn btn-outline-primary my-2 my-sm-0"
                  type="submit"
                >
                  Search
                </button>
              </form>
            <h2>REVIEWS</h2>
        <div
              className="book-list table table-responsive container-fluid"
              style={{ maxHeight: "800px", overflowY: "auto" }}
            >
              <table>
                <thead>
                  <tr>
                    <th>User Name</th>
                    <th>Book ID</th>
                    <th>Title</th>
                    <th>Rating</th>
                    <th>Comment</th>
                  </tr>
                </thead>
                <tbody>
                {reviews.length > 0 &&
                    reviews.map((item) => {
                       return <tr>
                             <td>{item.id}</td>
                             <td>{item.title}</td>
                             <td>{item.authorName}</td>
                             <td>{item.categoryName}</td>
                             <td>{item.price}</td>
                             <td>{item.publisherName}</td>
                             <td>{item.publishDate}</td>
                       </tr>
                    })}

                    {reviews.length === 0 && (
                    <tr><td colSpan={8}><h4>No Data to Show</h4></td></tr>
                    )}
                </tbody>
              </table>
            </div>
        </main>
      </div>
    </div>
  </div>
  )
}
export default Review