const express = require('express');
const router = express.Router();
const {
    authenticateToken,
    getAllStudents,
    createStudent,
    updateStudent,
    deleteStudent,
    login
} = require('../controllers/authController');

// Route to get all students
router.get("/", authenticateToken, getAllStudents);

// Route to create a new student
router.post('/create', authenticateToken, createStudent);

// Route to update a student
router.put('/update/:id', authenticateToken, updateStudent);

// Route to delete a student
router.delete('/student/:id', authenticateToken, deleteStudent);

// Route to login and get a token
router.post('/login', login);

module.exports = router;
