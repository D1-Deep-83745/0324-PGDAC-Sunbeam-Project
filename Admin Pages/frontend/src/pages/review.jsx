import Sidebar from "../component/sidear"; 
import Header from "../component/header";
import { useState, useEffect } from "react";
import { getReviews } from "../service/user";


function Review() {
    const [reviews, setReviews] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        loadReviews();
    }, []);

    const loadReviews = async () => {
        try {
            const response = await getReviews();
            if (response.status === 200) {
                setReviews(response.data);
            }
        } catch (error) {
            console.error("Error fetching reviews:", error);
        }
    };

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleSearchSubmit = (event) => {
        event.preventDefault();
    };

    const filteredReviews = reviews.filter(review =>
        review.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-lg-2">
                    <Sidebar />
                </div>
                <div className="col ms-0">
                    <Header />

                    <main className="mt-4 container-fluid">
                        <form className="form-inline" onSubmit={handleSearchSubmit}>
                            <input
                                className="form-control mr-sm-3"
                                type="search"
                                id="search-bar"
                                placeholder="Search by title"
                                aria-label="Search"
                                value={searchQuery}
                                onChange={handleSearchChange}
                            />
                            <button
                                className="btn btn-outline-primary my-2 my-sm-0"
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
                                    {filteredReviews.length > 0 ? (
                                        filteredReviews.map((item) => (
                                            <tr key={item.bookId}>
                                                <td>{item.userName}</td>
                                                <td>{item.bookId}</td>
                                                <td>{item.title}</td>
                                                <td>{item.rating}</td>
                                                <td>{item.comment}</td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan={5}><h4>No Data to Show</h4></td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
}

export default Review;
