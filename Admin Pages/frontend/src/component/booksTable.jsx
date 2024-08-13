import { useNavigate } from "react-router-dom";

function BooksTable({ props, onDelete }) {
  const navigate = useNavigate();

  const handleEdit = (id) => {
    navigate(`/editBooks/${id}`);
  };

  const handleDelete = (id) => {
    onDelete(id);
  };

  return (
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
            <th>Category</th>
            <th>Price</th>
            <th>Publisher</th>
            <th>Publication Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {props.length > 0 &&
            props.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.title}</td>
                <td>{item.authorName}</td>
                <td>{item.categoryName}</td>
                <td>{item.price}</td>
                <td>{item.publisherName}</td>
                <td>{item.publishDate}</td>
                <td>
                  <button
                    className="edit-button"
                    onClick={() => handleEdit(item.id)}
                  >
                    Edit
                  </button>
                  <button
                    className="delete-button"
                    onClick={() => handleDelete(item.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}

          {props.length === 0 && (
            <tr>
              <td colSpan={8}>
                <h4>No Data to Show</h4>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default BooksTable;
