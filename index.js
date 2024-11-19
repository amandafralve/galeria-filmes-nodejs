// Importando Express, Multer, Connection e Models
import express from "express";
import multer from "multer";
import connection from "./config/sequelize-config";
import Galeria from "./models/Galeria";

const app = express();

// Realizando conexão com o banco de dados
connection.authenticate().then(() => {
    console.log("Conexão com o banco realizada com sucesso!");
}).catch((error) => {
    console.log(error)
});

// Criando o banco de dados se ele não existir
connection.query(`CREATE DATABASE IF NOT EXISTS galeria`).then(() => {
    console.log("O banco de dados está criado.");
}).catch((error) =>{
    console.log(error);
});

// Configurações Pasta public e View Engine
app.use(express.static("public"));
app.use("view engine", "ejs");


// Rota Principal
app.get("/", (req,res) => {
    Galeria.findAll().then((imagens) => {
        res.render("index", {
            imagens:imagens
        })
    })
})

// Rota de uploads
app.get("/uploads", upload.single("file"), (req,res) => {
    const file = req.file.filename;
    Galeria.create({
        file:file
    })
    res.redirect("/")
})

// Inicialização
const port = "8080";
app.listen(port, (error) => {
    if(error){
        console.log(`Ocorreu um erro! ${error}`);
    }else {
        console.log(`Servidor iniciado com sucesso em: http://localhost:${port}.`);
    }
})