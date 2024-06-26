import Sidebar from "../component/sidear";
import Header from "../component/header";
function Books() {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-lg-2 ">
          <Sidebar />
        </div>
        <div className="col ms-0">
          <Header />

          <main className="mt-4 container-fluid">
            <div className="search-filter">
              <form class="form-inline">
                <input
                  class="form-control mr-sm-3"
                  type="search"
                  id="search-bar"
                  placeholder="Search by title, author, ISBN..."
                  aria-label="Search"
                />
                <button
                  class="btn btn-outline-primary my-2 my-sm-0"
                  type="submit"
                >
                  Search
                </button>
              </form>
              <div className="filters mt-3">
                <select id="category-filter">
                  <option value="">Category</option>
                  <option value="fiction">Fiction</option>
                  <option value="non-fiction">Non-fiction</option>
                  {/* <!-- Add more categories as needed --> */}
                </select>
                <select id="price-filter">
                  <option value="">Price Range</option>
                  <option value="0-10">$0 - $10</option>
                  <option value="10-20">$10 - $20</option>
                  {/* <!-- Add more price ranges as needed --> */}
                </select>
                <select id="status-filter">
                  <option value="">Status</option>
                  <option value="in-stock">In Stock</option>
                  <option value="out-of-stock">Out of Stock</option>
                </select>
              </div>
            </div>

            <h2>Books</h2>
            <div
              className="book-list table table-responsive container-fluid"
              style={{ maxHeight: "800px", overflowY: "auto" }}
            >
              <table>
                <thead>
                  <tr>
                    <th>Book ID</th>
                    <th>Title</th>
                    <th>Author</th>
                    <th>ISBN</th>
                    <th>Category</th>
                    <th>Price</th>
                    <th>Stock</th>
                    <th>Publisher</th>
                    <th>Publication Date</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {/* <!-- Example book entry --> */}
                  <tr>
                    <td>1</td>
                    <td>Example Book</td>
                    <td>John Doe</td>
                    <td>1234567890123</td>
                    <td>Fiction</td>
                    <td>$19.99</td>
                    <td>50</td>
                    <td>Example Publisher</td>
                    <td>2023-01-01</td>
                    <td>In Stock</td>
                    <td>
                      <button class="edit-button">Edit</button>
                      <button class="delete-button">Delete</button>
                    </td>
                  </tr>
                  <tr>
                    <td>2</td>
                    <td>Advanced JavaScript</td>
                    <td>Jane Smith</td>
                    <td>9876543210987</td>
                    <td>Non-fiction</td>
                    <td>$29.99</td>
                    <td>30</td>
                    <td>Tech Publishers</td>
                    <td>2022-05-10</td>
                    <td>In Stock</td>
                    <td>
                      <button class="edit-button">Edit</button>
                      <button class="delete-button">Delete</button>
                    </td>
                  </tr>
                  <tr>
                    <td>3</td>
                    <td>Cooking Basics</td>
                    <td>Chef Good</td>
                    <td>1122334455667</td>
                    <td>Non-fiction</td>
                    <td>$15.50</td>
                    <td>100</td>
                    <td>Gourmet Press</td>
                    <td>2021-11-15</td>
                    <td>In Stock</td>
                    <td>
                      <button class="edit-button">Edit</button>
                      <button class="delete-button">Delete</button>
                    </td>
                  </tr>
                  <tr>
                    <td>4</td>
                    <td>Fantasy World</td>
                    <td>Alice Brown</td>
                    <td>4433221100112</td>
                    <td>Fiction</td>
                    <td>$25.99</td>
                    <td>75</td>
                    <td>Imagination House</td>
                    <td>2020-08-25</td>
                    <td>In Stock</td>
                    <td>
                      <button class="edit-button">Edit</button>
                      <button class="delete-button">Delete</button>
                    </td>
                  </tr>
                  <tr>
                    <td>5</td>
                    <td>History of Art</td>
                    <td>Robert Artman</td>
                    <td>5566778899001</td>
                    <td>Non-fiction</td>
                    <td>$45.00</td>
                    <td>20</td>
                    <td>Artistic Minds</td>
                    <td>2019-04-18</td>
                    <td>In Stock</td>
                    <td>
                      <button class="edit-button">Edit</button>
                      <button class="delete-button">Delete</button>
                    </td>
                  </tr>
                  <tr>
                    <td>6</td>
                    <td>Science for Everyone</td>
                    <td>Emily Newton</td>
                    <td>6677889900112</td>
                    <td>Non-fiction</td>
                    <td>$22.99</td>
                    <td>60</td>
                    <td>Science World</td>
                    <td>2021-07-01</td>
                    <td>In Stock</td>
                    <td>
                      <button class="edit-button">Edit</button>
                      <button class="delete-button">Delete</button>
                    </td>
                  </tr>
                  <tr>
                    <td>7</td>
                    <td>Children's Stories</td>
                    <td>Anna Fairy</td>
                    <td>7788990011223</td>
                    <td>Fiction</td>
                    <td>$12.99</td>
                    <td>150</td>
                    <td>Kids Books</td>
                    <td>2023-03-10</td>
                    <td>In Stock</td>
                    <td>
                      <button class="edit-button">Edit</button>
                      <button class="delete-button">Delete</button>
                    </td>
                  </tr>
                  <tr>
                    <td>8</td>
                    <td>Mystery Night</td>
                    <td>David Clue</td>
                    <td>9900112233445</td>
                    <td>Fiction</td>
                    <td>$18.75</td>
                    <td>45</td>
                    <td>Mystery Press</td>
                    <td>2022-09-30</td>
                    <td>In Stock</td>
                    <td>
                      <button class="edit-button">Edit</button>
                      <button class="delete-button">Delete</button>
                    </td>
                  </tr>
                  <tr>
                    <td>9</td>
                    <td>Gardening 101</td>
                    <td>Green Thumb</td>
                    <td>8899001122334</td>
                    <td>Non-fiction</td>
                    <td>$16.50</td>
                    <td>80</td>
                    <td>Nature House</td>
                    <td>2020-05-22</td>
                    <td>In Stock</td>
                    <td>
                      <button class="edit-button">Edit</button>
                      <button class="delete-button">Delete</button>
                    </td>
                  </tr>
                  <tr>
                    <td>10</td>
                    <td>Modern Poetry</td>
                    <td>Lily Verse</td>
                    <td>5544332211006</td>
                    <td>Fiction</td>
                    <td>$20.00</td>
                    <td>40</td>
                    <td>Poetry House</td>
                    <td>2018-12-12</td>
                    <td>In Stock</td>
                    <td>
                      <button class="edit-button">Edit</button>
                      <button class="delete-button">Delete</button>
                    </td>
                  </tr>
                  {/* <!-- More book entries as needed --> */}
                </tbody>
              </table>
            </div>

            <div class="book-actions">
              <h2>Actions</h2>
              <button id="add-book-button">Add New Book</button>
              <button id="bulk-delete-button">Delete Selected</button>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
export default Books;
