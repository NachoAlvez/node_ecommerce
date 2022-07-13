const { json } = require('body-parser');
const express = require ('express')
const app = express();
const router = express.Router();
const port = 8080;

const Contenedor = require("./contenedor.js");


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/productos", router);
app.use('/',express.static("public"));

const server = app.listen(port, () => {
  console.log("Servidor ON!");
});

server.on("error", (error) => console.log(`Error en el servidor ${error}`));

router.get("/", (req, res) => {
  const contenedor = new Contenedor();
  const listadoProductos = contenedor.getAll();
  res.send({ productos: listadoProductos });
});

router.get("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const contenedor = new Contenedor();
  const productByID = contenedor.getByID(id);
  if (productByID[0] != undefined) {
    res.send({ producto: productByID });
  } else res.status(404).send({ error: "Producto no encontrado" });
});

router.post("/", (req, res) => {
  const contenedor = new Contenedor();
  const product = req.body;
  const newProduct = contenedor.add(product);
  res.send({ producto: newProduct });
});

router.put("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const product = req.body;
  const contenedor = new Contenedor();
  const putProduct = contenedor.update(id, product);
  if (putProduct[0] != undefined) {
    res.send({ producto: putProduct });
  } else res.status(404).send({ error: "Producto no encontrado" });
});

router.delete("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const contenedor = new Contenedor();
  const deleteProduct = contenedor.delete(id);
  if (deleteProduct[0] != undefined) {
    res.status(200).send({ mensaje: "producto eliminado" });
  } else res.status(404).send({ error: "Producto no encontrado" });
});


