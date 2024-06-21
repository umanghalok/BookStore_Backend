import {Router} from 'express';
import {getAllBooks, addBook, updateBookById, deleteBookById, getBookById} from '../controllers/book.controller.js'
import { signupUser, loginUser } from '../controllers/user.controller.js';
import { authenticateToken } from '../middleware/jwt.middleware.js';

const router= Router();

router.route('/signup').post(signupUser);
router.route('/login').post(loginUser);

router.route('/books').get(getAllBooks);
router.route('/add').post(authenticateToken,addBook);
router.route('/books/:id/update').put(authenticateToken,updateBookById);
router.route('/books/:id/delete').delete(authenticateToken,deleteBookById);
router.route('/books/:id').get(getBookById);

export default router;