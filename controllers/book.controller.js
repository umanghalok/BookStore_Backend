import Book from '../model/book.model.js';

// GET /books: Retrieve a list of all books in the store
export const getAllBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// POST /add: Add a new book to the store
export const addBook = async (req, res) => {
  //console.log(req.body);
  const { title, author, publishYear, price } = req.body;
  if (!title || !author || !publishYear || !price) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const newBook = new Book({ title, author, publishYear, price });
    await newBook.save();
    res.status(201).json(newBook);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// GET /books/:id: Retrieve details of a specific book by its ID
export const getBookById = async (req, res) => {
  const { id } = req.params;
  try {
    const book = await Book.findById(id);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.status(200).json(book);
  } catch (error) {
    res.status(400).json({ message: 'Invalid ID' });
  }
};

// PUT /books/:id/update: Update details of a specific book by its ID
export const updateBookById = async (req, res) => {
  const { id } = req.params;
  const { title, author, publishYear, price } = req.body;
  if (!title && !author && !publishYear && !price) {
    return res.status(400).json({ message: 'At least one field is required to update' });
  }

  try {
    const book = await Book.findById(id);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    if (title) book.title = title;
    if (author) book.author = author;
    if (publishYear) book.publishYear = publishYear;
    if (price) book.price = price;

    await book.save();
    res.status(200).json(book);
  } catch (error) {
    res.status(400).json({ message: 'Invalid ID' });
  }
};

// DELETE /books/:id/delete: Delete a specific book by its ID
export const deleteBookById = async (req, res) => {
  const { id } = req.params;

  try {
    const book = await Book.findByIdAndDelete(id);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.status(200).json({ message: 'Book deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: 'Invalid ID' });
  }
};
