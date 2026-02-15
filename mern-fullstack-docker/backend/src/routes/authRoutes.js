const express = require("express");
const router = express.Router();

router.post("/register", (req, res) => {
  res.json({
    message: "Usuario registrado correctamente",
    data: req.body
  });
});

router.post("/login", (req, res) => {
  res.json({
    message: "Login correcto"
  });
});

router.get("/me", (req, res) => {
  res.json({
    user: "Usuario de prueba"
  });
});

module.exports = router;
