const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const mysql = require("mysql");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "cruddatabase",
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/api/get", (req, res) => {
  const sqlSelect = "SELECT * FROM topics";

  db.query(sqlSelect, (err, result) => {
    res.send(result);
  });
});

///////////////////////////////////////start_uploaddddddddd
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

app.post("/api/upload", upload.single("file"), (req, res) => {
  // Access the uploaded file using req.file
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }
  // Process the uploaded file as needed
  res.status(200).json({
    message: "File uploaded successfully",
    filename: req.file.filename,
  });
});
///second
///
const uploadsDirectory = path.join(__dirname, "uploads");

// Endpoint to list all files
app.get("/api/uploads", (req, res) => {
  fs.readdir(uploadsDirectory, (err, files) => {
    if (err) {
      console.error("Error reading directory:", err);
      return res.status(500).json({ error: "Internal server error" });
    }
    res.json(files);
  });
});

// Endpoint to serve individual files
app.get("/api/uploads/:filename", (req, res) => {
  const filename = req.params.filename;
  const filePath = path.join(uploadsDirectory, filename);
  // Check if file exists
  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) {
      console.error("Error accessing file:", err);
      return res.status(404).json({ error: "File not found" });
    }
    // Send the file to the client
    res.sendFile(filePath);
  });
});
///////////////////////////////////////end_upload
/*
app.post("/api/insertData", (req, res) => {
  const fileName = req.body.filename;
  const topicYear = req.body.year;
  const session = req.body.session;
  const matiere = req.body.matiere;
  const section = req.body.section;
  const corrigeValue = req.body.corrige;

  let corrige;
  if (corrigeValue === "_Corrige") {
    corrige = "yes";
  } else {
    corrige = "no";
  }

  const sqlInsert =
    "INSERT INTO topics (fileName ,matiere,section, topicYear, session , corrige ) VALUES (?,?,?, ? , ? , ?)";

  db.query(
    sqlInsert,
    [fileName, matiere, section, topicYear, session, corrige],
    (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send("Error during the insert operation (upload)");
      } else {
        console.log(result);
        res.status(200).send("Successfully inserted data (upload)");
      }
    }
  );
});
*/
// ya9ra mel db
app.get("/api/topic_bac/:matiere/:section", (req, res) => {
  const { matiere, section } = req.params;
  const query = `
    SELECT * 
    FROM topics 
    WHERE matiere = ? AND section = ? 
    GROUP BY topicYear;
  `;
  db.query(query, [matiere, section], (err, results) => {
    if (err) {
      console.error("Error fetching data from database:", err);
      res.status(500).json({ error: "Internal server error" });
      return;
    }
    res.json(results);
  });
});

app.get("/api/getSubjects/:section", (req, res) => {
  const section = req.params.section.toLowerCase();

  if (section === "all") {
    const sqlGetAll = "SELECT * FROM subjects";

    db.query(sqlGetAll, (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send("Error during the query operation");
      } else {
        console.log(result);
        res.status(200).send(result);
      }
    });
  } else {
    const sqlGetSection = `SELECT * FROM subjects WHERE LOWER(section) = "${section}"`;

    db.query(sqlGetSection, (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send("Error during the query operation");
      } else {
        console.log(result);
        res.status(200).send(result);
      }
    });
  }
});

app.get("/api/getSubjects", (req, res) => {
  const sqlGetSections = "SELECT DISTINCT section FROM subjects";

  db.query(sqlGetSections, (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send("Error during the query operation");
    } else {
      console.log(result);
      res.status(200).send(result);
    }
  });
});

app.get("/api/getSections", (req, res) => {
  const sqlGetSections = "SELECT * FROM sections";

  db.query(sqlGetSections, (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send("Error during the query operation");
    } else {
      console.log(result);
      res.status(200).send(result);
    }
  });
});
app.get("/api/getMatieres", (req, res) => {
  const sqlGetSections = "SELECT * FROM subjects ORDER BY section";

  db.query(sqlGetSections, (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send("Error during the query operation");
    } else {
      console.log(result);
      res.status(200).send(result);
    }
  });
});
app.get("/api/getMatieres1", (req, res) => {
  const sqlGetSections =
    "SELECT DISTINCT matiere FROM subjects ORDER BY section";

  db.query(sqlGetSections, (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send("Error during the query operation");
    } else {
      console.log(result);
      res.status(200).send(result);
    }
  });
});

app.get("/api/getLogoMatieres", (req, res) => {
  const sqlGetLogoMatieres =
    "SELECT DISTINCT matiere, logo_matiere FROM subjects;";

  db.query(sqlGetLogoMatieres, (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send("Error during the query operation");
    } else {
      console.log(result);
      res.status(200).send(result);
    }
  });
});

app.post("/api/insert", (req, res) => {
  const topicName = req.body.topicName;
  const description = req.body.description;

  const sqlInsert = "INSERT INTO topics (topicName, description) VALUES (?, ?)";

  db.query(sqlInsert, [topicName, description], (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send("Error during the insert operation");
    } else {
      console.log(result);
      res.status(200).send("Successfully inserted data");
    }
  });
});

app.post("/create_Section", (req, res) => {
  const sqlInsert =
    "INSERT INTO sections (section_name, image_url, link) VALUES (?, ? ,?)";
  const values = [req.body.sectionName, req.body.image_url, req.body.link];

  db.query(sqlInsert, values, (err, result) => {
    if (err) {
      console.error("Error inserting into the database:", err);
      return res.status(500).json({ error: "Internal Server Error" });
    }

    // Assuming you want to send a success response with the inserted data
    const insertedData = {
      sectionName: req.body.sectionName,
      image_url: req.body.image_url,
      link: req.body.link,
    };

    res.status(201).json(insertedData);
  });
});
app.post("/create_Matiere", (req, res) => {
  const matiere = req.body.matiere;
  const section = req.body.section;

  const getLogoSrc = (matiere) => {
    switch (matiere) {
      case "Mathématiques":
        return "https://img.icons8.com/nolan/64/7DE3C3/0BA360/calculator--v1.png";
      case "Informatique":
        return "https://img.icons8.com/nolan/64/7DE3C3/0BA360/imac.png";
      case "Disc. techniques":
        return "https://img.icons8.com/nolan/64/7DE3C3/0BA360/settings-3.png";
      case "Sciences physiques":
        return "https://img.icons8.com/nolan/64/7DE3C3/0BA360/physics.png";
      case "Sciences de la vie et de la terre":
        return "https://img.icons8.com/nolan/64/7DE3C3/0BA360/microscope.png";
      case "Gestion":
        return "https://img.icons8.com/nolan/64/7DE3C3/0BA360/financial-growth-analysis.png";
      case "Économie":
        return "https://img.icons8.com/nolan/64/7DE3C3/0BA360/profit-analysis.png";
      case "Anglais":
        return "https://img.icons8.com/nolan/64/7DE3C3/0BA360/abc.png";
      case "Arabe":
        return "https://img.icons8.com/nolan/64/7DE3C3/0BA360/book-and-pencil.png";
      case "Français":
        return "https://img.icons8.com/nolan/64/7DE3C3/0BA360/glossary.png";
      case "Hist et géo":
        return "https://img.icons8.com/nolan/64/7DE3C3/0BA360/globe-earth.png";
      case "Philosophie":
        return "https://img.icons8.com/nolan/64/7DE3C3/0BA360/books-1.png";
      case "Allemand":
        return "https://img.icons8.com/nolan/64/7DE3C3/0BA360/open-book.png";
      case "Espagnol":
        return "https://img.icons8.com/nolan/64/7DE3C3/0BA360/storytelling.png";
      case "Russe":
        return "https://img.icons8.com/external-icongeek26-outline-icongeek26/64/00bfa6/external-cathedral-of-saint-basil-russia-icongeek26-outline-icongeek26.png";
      case "Chinois":
        return "https://img.icons8.com/external-glyph-wichaiwi/64/00bfa6/external-china-chinese-new-year-glyph-wichaiwi.png";
      case "Turque":
        return "https://img.icons8.com/external-outline-wichaiwi/64/00bfa6/external-european-european-cities-landmarks-outline-wichaiwi.png";
      case "Portugais":
        return "https://img.icons8.com/nolan/64/7DE3C3/0BA360/books.png";
      case "Italien":
        return "https://img.icons8.com/nolan/64/7DE3C3/0BA360/love-book.png";
      case "Éducation Musicale":
        return "https://img.icons8.com/nolan/64/7DE3C3/0BA360/music-library.png";
      case "Arts & Plastiques":
        return "https://img.icons8.com/nolan/64/7DE3C3/0BA360/microsoft-paint.png";
      case "Théâtre":
        return "https://img.icons8.com/nolan/64/7DE3C3/0BA360/off-book.png";
      case "Sport":
        return "https://img.icons8.com/nolan/64/7DE3C3/0BA360/running.png";
      case "Pensée islamique":
        return "https://img.icons8.com/external-flatart-icons-outline-flatarticons/64/00bfa6/external-quran-islam-and-ramadan-flatart-icons-outline-flatarticons.png";
      case "Algorithmes":
        return "https://img.icons8.com/nolan/64/7DE3C3/0BA360/code--v1.png";
      case "Bases de données":
        return "https://img.icons8.com/nolan/64/7DE3C3/0BA360/database.png";
      default:
        return "";
    }
  };

  const logo_matiere = getLogoSrc(matiere);

  const sqlInsert =
    "INSERT INTO subjects (matiere, section, logo_matiere) VALUES (?, ?, ?)";

  const values = [matiere, section, logo_matiere];

  db.query(sqlInsert, values, (err, result) => {
    if (err) {
      console.error("Error inserting into the database (subjects):", err);
      return res.status(500).json({ error: "Internal Server Error" });
    }

    const insertedData = {
      matiere: matiere,
      section: section,
      logo_matiere: logo_matiere,
    };

    res.status(201).json(insertedData);
  });
});

app.put("/update/:id", (req, res) => {
  const sqlUpdate =
    "UPDATE sections SET section_name=?, image_url=?, link=? WHERE id=?";

  const values = [
    req.body.sectionName,
    req.body.image_url,
    req.body.link,
    req.params.id,
  ];

  db.query(sqlUpdate, values, (err, result) => {
    if (err) {
      console.error("Error updating from the database:", err);
      return res.status(500).json({ error: "Internal Server Error" });
    }

    const updatedData = {
      sectionName: req.body.sectionName,
      image_url: req.body.image_url,
      link: req.body.link,
    };

    res.status(200).json(updatedData);
  });
});

app.put("/update_matiere/:id", (req, res) => {
  const sqlUpdate =
    "UPDATE subjects SET matiere=?, section=?, logo_matiere=?   WHERE id=?";

  const values = [
    req.body.matiere,
    req.body.section,
    req.body.logo_matiere,
    req.params.id,
  ];

  db.query(sqlUpdate, values, (err, result) => {
    if (err) {
      console.error("Error updating from the database (subjects):", err);
      return res.status(500).json({ error: "Internal Server Error" });
    }

    // Assuming you want to send a success response with the updated data
    const updatedData = {
      matiere: req.body.matiere,
      section: req.body.section,
      logo_matiere: req.body.logo_matiere,
    };

    res.status(200).json(updatedData);
  });
});

// DELETE
app.delete("/delete/:id", (req, res) => {
  const id = req.params.id; // Extracting id from request parameters
  const sqlDelete = "DELETE FROM sections WHERE id=?";

  db.query(sqlDelete, [id], (err, result) => {
    if (err) {
      console.error("Error deleting from the database:", err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
    res.status(200).json({ message: "Successfully deleted section", id: id });
  });
});

app.delete("/delete_matiere/:id", (req, res) => {
  const id = req.params.id; // Extracting id from request parameters
  const sqlDelete = "DELETE FROM subjects WHERE id=?";

  db.query(sqlDelete, [id], (err, result) => {
    if (err) {
      console.error("Error deleting from the database:", err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
    res.status(200).json({ message: "Successfully deleted section", id: id });
  });
});
app.post("/login", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const sqlGet = "SELECT * FROM account_admin WHERE username=? AND password=?";

  db.query(sqlGet, [username, password], (err, result) => {
    if (err) {
      console.error("Error checking in the database for Login:", err);
      return res.status(500).json({ error: "Internal Server Error" });
    }

    if (result.length === 0) {
      // User not found or invalid credentials
      return res.status(401).json({ error: "Invalid username or password" });
    }

    // Login successful
    res.status(200).json({ message: "Login successful" });
  });
});

app.get("/api/getTopics", (req, res) => {
  const sqlGetTopics = "SELECT * FROM topics ORDER BY topicYear DESC;";

  db.query(sqlGetTopics, (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send("Error during the query operation");
    } else {
      console.log(result);
      res.status(200).send(result);
    }
  });
});

app.get("/api/getYears", (req, res) => {
  const sqlGetYears =
    "SELECT DISTINCT topicYear FROM topics ORDER BY topicYear DESC; ";

  db.query(sqlGetYears, (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send("Error during the query operation");
    } else {
      console.log(result);
      res.status(200).send(result);
    }
  });
});

app.listen(3001, () => {
  console.log("running on port 3001");
});
