const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const reportRoutes = require("./routes/reportRoutes");
const authRoutes = require("./routes/authRoutes");
const requestRoutes = require("./routes/requestRoutes");

const app = express();

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

app.use(express.json());

app.get("/", (req, res) => {
  res.send("API funcionando 🚀");
});

app.use("/api/auth", authRoutes);
app.use("/api/requests", requestRoutes);
app.use("/api/reports", reportRoutes);


mongoose.connect("mongodb://127.0.0.1:27017/crepasDB")
  .then(() => console.log("MongoDB conectado"))
  .catch(err => console.log(err));

app.listen(3000, () => {
  console.log("Servidor corriendo en http://localhost:3000");
});
