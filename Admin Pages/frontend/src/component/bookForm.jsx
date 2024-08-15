import { useEffect, useState } from "react";
import { addAuthor, addCategory, addPublisher, getAllAuthors, getCategories, getPublishers } from "../service/books";
import { toast } from "react-toastify";

function BookForm({ book, action, onsubmit, onFileChange }) {
  const [imagePreview, setImagePreview] = useState(""); 
  const [categories, setCategories] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [publishers, setPublishers] = useState([]);
  const [showNewCategoryInput, setShowNewCategoryInput] = useState(false);
  const [showNewAuthorInput, setShowNewAuthorInput] = useState(false);
  const [showNewPublisherInput, setShowNewPublisherInput] = useState(false);
  const [newCategory, setNewCategory] = useState("");
  const [newAuthor, setNewAuthor] = useState("");
  const [newPublisher, setNewPublisher] = useState("");
  const [title, setTitle] = useState(book?.title || "");
  const [desc, setDesc] = useState(book?.description || "");
  const [price, setPrice] = useState(book?.price || "");
  const [publishDate, setPublishDate] = useState(book?.publishDate || "");
  const [selectedAuthor, setSelectedAuthor] = useState(book?.authorId || "");
  const [selectedCategory, setSelectedCategory] = useState(book?.categoryId || "");
  const [selectedPublisher, setSelectedPublisher] = useState(book?.publisherId || "");

  useEffect(() => {
    loadOptions();

    if (book) {
      setTitle(book.title);
      setDesc(book.description);
      setPrice(book.price);
      setPublishDate(book.publishDate);
      setSelectedAuthor(book.authorId);
      setSelectedCategory(book.categoryId);
      setSelectedPublisher(book.publisherId);

      if (book.image) {
        setImagePreview(`data:image/jpeg;base64,${book.image}`);
      } else {
        setImagePreview("");
      }
    }
  }, [book]);

  const loadOptions = async () => {
    try {
      const categoryResult = await getCategories();
      if (categoryResult.status === 200) {
        setCategories(categoryResult.data);
      }

      const authorResult = await getAllAuthors();
      if (authorResult.status === 200) {
        setAuthors(authorResult.data);
      }

      const publisherResult = await getPublishers();
      if (publisherResult.status === 200) {
        setPublishers(publisherResult.data);
      }
    } catch (error) {
      toast.error("Failed to load options.");
    }
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      onFileChange(file); 
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result); 
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveNewCategory = async () => {
    try {
      const addCategoryResult = await addCategory(newCategory);
      if (addCategoryResult.status === 200) {
        toast.success("New Category Has Been added Successfully!");
        await loadOptions();
        setShowNewCategoryInput(false);
        setNewCategory("");
      }
    } catch (error) {
      toast.error("Failed to add new category.");
    }
  };

  const handleSaveNewAuthor = async () => {
    try {
      const addAuthorResult = await addAuthor(newAuthor);
      if (addAuthorResult.status === 200) {
        toast.success("New Author Has Been added Successfully!");
        await loadOptions();
        setShowNewAuthorInput(false);
        setNewAuthor("");
      }
    } catch (error) {
      toast.error("Failed to add new author.");
    }
  };

  const handleSaveNewPublisher = async () => {
    try {
      const addPublisherResult = await addPublisher(newPublisher);
      if (addPublisherResult.status === 200) {
        toast.success("New Publisher Has Been added Successfully!");
        await loadOptions();
        setShowNewPublisherInput(false);
        setNewPublisher("");
      }
    } catch (error) {
      toast.error("Failed to add new publisher.");
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const bookData = {
      title,
      description: desc,
      price,
      publishDate,
      categoryId: selectedCategory,
      authorId: selectedAuthor,
      publisherId: selectedPublisher,
    };

    onsubmit(bookData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="book-title">Book Title</label>
        <input
          type="text"
          id="book-title"
          name="title"
          className="form-control"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="book-description">Description</label>
        <textarea
          id="book-description"
          name="description"
          className="form-control"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          required
        ></textarea>
      </div>

      <div className="form-group">
        <label htmlFor="book-price">Price</label>
        <input
          type="number"
          id="book-price"
          name="price"
          className="form-control"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="book-publish-date">Publish Date</label>
        <input
          type="date"
          id="book-publish-date"
          name="publishDate"
          className="form-control"
          value={publishDate}
          onChange={(e) => setPublishDate(e.target.value)}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="book-category">Category</label>
        <div className="select-container">
          <select
            id="book-category"
            name="category"
            className="form-control"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            required
          >
            <option value="">Select Category</option>
            {categories.map((item) => (
              <option key={item.id} value={item.id}>
                {item.categoryName}
              </option>
            ))}
          </select>
          <button
            type="button"
            className="btn btn-outline-primary mt-2"
            onClick={() => setShowNewCategoryInput(true)}
          >
            Add New Category
          </button>
          {showNewCategoryInput && (
            <>
              <input
                type="text"
                className="form-control mt-2"
                placeholder="New Category"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
              />
              <button
                type="button"
                className="btn btn-primary mt-2"
                onClick={handleSaveNewCategory}
              >
                Save Category
              </button>
            </>
          )}
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="book-author">Author</label>
        <div className="select-container">
          <select
            id="book-author"
            name="author"
            className="form-control"
            value={selectedAuthor}
            onChange={(e) => setSelectedAuthor(e.target.value)}
            required
          >
            <option value="">Select Author</option>
            {authors.map((item) => (
              <option key={item.id} value={item.id}>
                {item.authorName}
              </option>
            ))}
          </select>
          <button
            type="button"
            className="btn btn-outline-primary mt-2"
            onClick={() => setShowNewAuthorInput(true)}
          >
            Add New Author
          </button>
          {showNewAuthorInput && (
            <>
              <input
                type="text"
                className="form-control mt-2"
                placeholder="New Author"
                value={newAuthor}
                onChange={(e) => setNewAuthor(e.target.value)}
              />
              <button
                type="button"
                className="btn btn-primary mt-2"
                onClick={handleSaveNewAuthor}
              >
                Save Author
              </button>
            </>
          )}
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="book-publisher">Publisher</label>
        <div className="select-container">
          <select
            id="book-publisher"
            name="publisher"
            className="form-control"
            value={selectedPublisher}
            onChange={(e) => setSelectedPublisher(e.target.value)}
            required
          >
            <option value="">Select Publisher</option>
            {publishers.map((item) => (
              <option key={item.id} value={item.id}>
                {item.publisherName}
              </option>
            ))}
          </select>
          <button
            type="button"
            className="btn btn-outline-primary mt-2"
            onClick={() => setShowNewPublisherInput(true)}
          >
            Add New Publisher
          </button>
          {showNewPublisherInput && (
            <>
              <input
                type="text"
                className="form-control mt-2"
                placeholder="New Publisher"
                value={newPublisher}
                onChange={(e) => setNewPublisher(e.target.value)}
              />
              <button
                type="button"
                className="btn btn-primary mt-2"
                onClick={handleSaveNewPublisher}
              >
                Save Publisher
              </button>
            </>
          )}
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="book-image">Book Image</label>
        <input
          type="file"
          id="book-image"
          name="image"
          className="form-control"
          onChange={handleImageChange}
        />
        {imagePreview && (
          <div className="mt-2">
            <img src={imagePreview} alt="Book Preview" style={{ width: "100px", height: "auto" }} />
          </div>
        )}
      </div>

      <button type="submit" className="btn btn-primary">
        {action}
      </button>
    </form>
  );
}

export default BookForm;
