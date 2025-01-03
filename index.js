import express from "express";
import router from "./routes/mainRoutes.js";
import pg from "pg";
const { Client } = pg;

const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Database connection
// const con = new Client({
//   host: "localhost",
//   user: "postgres",
//   port: 5432,
//   password: "Qwerty2307",
//   database: "demo",
// });

// con.connect()
//   .then(() => console.log("Successfully connected to the database"))
//   .catch((err) => console.error("Connection error:", err));

// Define routes
app.get("/", (req, res) => {
  res.send("Hai this from index.js");
});

app.use(router);

// Start the server
app.listen(PORT, () => console.log(`Server started at PORT number ${PORT}`));
