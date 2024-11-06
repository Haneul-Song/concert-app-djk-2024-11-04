let express = require("express");
let app = express();
app.set("view engine", "ejs");

// set up database connection
const knex = require("knex")({
  client: "mysql",
  connection: {
    host: "concert-db.cp4e2g68854m.us-east-1.rds.amazonaws.com",
    user: "admin",
    password: "Utah2021!",
    database: "paradise-concerts",
    port: 3306,
  },
});

app.get("/", (req, res) => {
  knex
    .select()
    .from("venues")
    .then((result) => {
      res.render("index", { movies: result }); // Pass data as 'movies'
    })
    .catch((error) => {
      console.error("Database query error:", error);
      res.status(500).send("Error retrieving data");
    });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

