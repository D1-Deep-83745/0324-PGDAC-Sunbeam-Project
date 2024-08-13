import Sidebar from "../component/sidear";
import Header from "../component/header";
import FilterTemp from "../component/filterTemp";
import { useEffect, useState } from "react";
import BooksTable from "../component/booksTable";
import { getCategories, getTableData, deletebook } from "../service/books";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

function Books() {
  const [filter1Data, setFilterData] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [filteredTableData, setFilteredTableData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    loadOnStartUp();
  }, []);

  const loadOnStartUp = async () => {
    const tableResult = await getTableData();
    if (tableResult.status === 200) {
      setTableData(tableResult.data);
      setFilteredTableData(tableResult.data);
    }

    const filterResult = await getCategories();
    if (filterResult.status === 200) {
      setFilterData(filterResult.data);
    }
  };

  useEffect(() => {
    filterData();
  }, [selectedCategory, searchQuery, tableData]);

  const handleCategorySelect = (categoryId) => {
    setSelectedCategory(categoryId);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    filterData();
  };

  const filterData = () => {
    let filteredData = tableData;

    if (selectedCategory) {
      filteredData = filteredData.filter(item => item.categoryName === selectedCategory);
    }

    if (searchQuery) {
      filteredData = filteredData.filter(item =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredTableData(filteredData);
  };

  const handleDelete = async (id) => {
    const deleteResponse = await deletebook(id);
    if (deleteResponse.status === 204) {
      toast.success("Book Deleted Successfully");
      setTableData(prevData => prevData.filter(item => item.id !== id));
      setFilteredTableData(prevData => prevData.filter(item => item.id !== id));
    } else {
      toast.error("Something went wrong ..!");
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
            <div className="search-filter">
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

              <div className="filters mt-3">
                <FilterTemp filter="Categories" data={filter1Data} onSelect={handleCategorySelect} />
              </div>
            </div>

            <h2>Books</h2>
            <BooksTable props={filteredTableData} onDelete={handleDelete} />

            <div className="book-actions" style={{ justifyContent: "center", alignItems: "center" }}>
              <h2>Actions</h2>
              <Link to="/addbook"><button id="add-book-button">Add New Book</button></Link>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

export default Books;
