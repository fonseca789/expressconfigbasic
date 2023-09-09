const express = require("express");
const router = express.Router();
const fs = require("fs");
const data = require("../utils/books.json");
// middleware that is specific to this router
// console.log(data)
router.use((req, res, next) => {
  console.log("Time: ", Date.now());
  next();
});
// define the home page route
router.get("/", (req, res) => {
  if (data.length == 0) {
    res.send("No hay libro Disponible");
  } else {
    res.json(data);
  }
});
// Buscar por id
router.get("/:id", (req, res) => {
  const id = Number(req.params.id);
  //   console.log(id);
  const libro = data.find((book) => book.id === id);
  if (libro) res.json(libro);
  else res.status(500).json({ message: "Books Not Found" });
});
router.post("/", (req, res) => {
  const dato = req.body;
  dato.id = data.length + 1;
  data.push(dato);
  const writeData = JSON.stringify(data, null, 2);
  fs.writeFile("./utils/books.json", writeData, (error) => {
    if (error) throw error;
    console.log("Se Guardo el Archivo");
  });
  res.json({ ...dato });
});
router.delete("/:id", (req, res) => {
  const id = Number(req.params.id);
  const deleteData = data.filter(book => book.id !== id);
  const writeData = JSON.stringify(deleteData, null, 2);
  fs.writeFile("./utils/books.json", writeData, (error) => {
    if (error) throw error;
    console.log("Se borro el Dato con id " + id);
  });
  res.json({ message: "Borrado si existe es id" });
});
router.put("/:id", (req, res) => {
  const id = Number(req.params.id);
  const updateBooks = req.body;
  const putBooks = data.map((book) => {
    if (book.id == id) {
      return { ...updateBooks, id };
    }
    return book;
  });
  const writeData = JSON.stringify(putBooks, null, 2);
  fs.writeFile("./utils/books.json", writeData, (error) => {
    if (error) throw error;
    console.log("Update Books with id: " + id);
  });
  res.json({ message: "Update Book" });
});

module.exports = router;
