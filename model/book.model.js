import mongoose from 'mongoose';

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true
  },
  author: {
    type: String,
    required: [true, 'Author is required'],
    trim: true
  },
  publishYear: {
    type: Number,
    required: [true, 'Publish year is required'],
    min: [0, 'Publish year cannot be less than 0']
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
    min: [0, 'Price cannot be less than 0'],
    validate: {
      validator: function(v) {
        return v > 0;
      },
      message: 'Price must be a positive number'
    }
  },
  genre: {
    type: String
  }
}, {
  timestamps: true
});

const Book = mongoose.model('Book', bookSchema);
export default Book;
