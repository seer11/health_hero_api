const express = require("express");
const connectDB = require("./database/db");
const path = require("path");

const app = express();

// Connect Database
connectDB();

// Init Middleware
app.use(express.json());

// Define Routes
app.use("/api/nfts", require("./routes/api/nfts"));
app.use("/api/characters", require("./routes/api/characters"));
app.use("/api/players", require("./routes/api/players"));
app.use("/api/battleCharacters", require("./routes/api/battleCharacters"));

// Serve static assets in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
