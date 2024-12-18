const express = require("express");
const multer = require("multer");
const mysql = require("mysql2");
const path = require("path");
const fs = require("fs");
const cors = require("cors");

const app = express();
const PORT = 8082;

// Enable CORS
app.use(cors());

// Configure MySQL connection
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "sabeer20",
    database: "internship_form_new"
});

db.connect((err) => {
    if (err) throw err;
    console.log("Connected to MySQL database.");
});

// Configure Multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/"); // Directory to store files
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}_${file.originalname}`);
    }
});

const upload = multer({ storage });

// Middleware to parse JSON
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Route to handle form submission
app.post("/formdetails", upload.fields([
    { name: "aadhar" },
    { name: "resume" },
    { name: "collegeId" }
]), (req, res) => {
    const {
        first_name,
        last_name,
        email,
        university_name,
        department,
        semester,
        dob,
        gender,
        mobile_no,
        father_no,
        domains_interested,
        skills_known,
        has_laptop,
        acknowledgement
    } = req.body;

    // Check if files are uploaded
    if (!req.files || !req.files.aadhar || !req.files.collegeId || !req.files.resume) {
        return res.status(400).send({ message: "All file fields are required." });
    }

    const aadharFilePath = req.files.aadhar ? req.files.aadhar[0].path : null;
    const collegeIdFilePath = req.files.collegeId ? req.files.collegeId[0].path : null;
    const resumeFilePath = req.files.resume ? req.files.resume[0].path : null;

    const query = `
        INSERT INTO intern_registration (
            first_name, last_name, email, university_name, department, semester, dob, gender, mobile_no, father_no,
            aadhar_file_path, college_id_file_path, domains_interested, skills_known, resume_file_path, has_laptop, acknowledgement
        ) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(query, [
        first_name, last_name, email, university_name, department, semester, dob, gender, mobile_no, father_no,
        aadharFilePath, collegeIdFilePath, domains_interested, skills_known, resumeFilePath, has_laptop, acknowledgement
    ], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send({ message: "Error saving data." });
        } else {
            res.status(200).send({ message: "Form submitted successfully!" });
        }
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
