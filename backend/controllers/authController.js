const jwt = require('jsonwebtoken');
const Student = require('../models/Student');
require('dotenv').config();
const SECRET_KEY = process.env.SECRET_KEY;

const authenticateToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) return res.sendStatus(403);

    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
};

const getAllStudents = async (req, res) => {
    try {
        const students = await Student.findAll();
        res.json(students);
    } catch (err) {
        console.error('Error executing query:', err);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

const createStudent = async (req, res) => {
    try {
        const student = await Student.create({
            Name: req.body.name,
            Email: req.body.email
        });
        res.json(student);
    } catch (err) {
        console.error('Error executing query:', err);
        res.status(500).json("Error creating student");
    }
};

const updateStudent = async (req, res) => {
    try {
        const student = await Student.update({
            Name: req.body.name,
            Email: req.body.email
        }, {
            where: { ID: req.params.id }
        });
        res.json(student);
    } catch (err) {
        console.error('Error executing query:', err);
        res.status(500).json({ message: "Error updating student" });
    }
};

const deleteStudent = async (req, res) => {
    const id = req.params.id; 

    if (!id) {
        return res.status(400).json({ message: "No ID provided" });
    }

    try {
        const result = await Student.destroy({ where: { ID: id } });

        if (result === 0) {
            return res.status(404).json({ message: "Student not found" });
        }

        res.json({ message: "Student deleted successfully" });
    } catch (err) {
        console.error('Error executing query:', err);
        res.status(500).json({ message: "Error deleting student" });
    }
};

const login = (req, res) => {
    const user = {
        id: 1,
        username: 'exampleUser'
    };
    const token = jwt.sign(user, SECRET_KEY, { expiresIn: '1h' });
    res.json({ token });
};

module.exports = {
    authenticateToken,
    getAllStudents,
    createStudent,
    updateStudent,
    deleteStudent,
    login
};
