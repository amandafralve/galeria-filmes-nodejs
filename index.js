import express from 'express'
// Importando o multer
import multer from 'multer'
const app = express()

// Importando Connection
import connection from "./config/sequelize-config.js"

import Catalogo from "./models/Catalogo.js"

// Realizando a conexão com o banco de dados
connection.authenticate().then(() => {
    console.log("Conexão com o banco de dados feita com sucesso!")
}).catch((error) => {
    console.log(error)
});

//  Criando o banco de dados se ele não existir
connection.query(`CREATE DATABASE IF NOT EXISTS mubi;`).then(()=> {
    console.log("O banco de dados está criado.");
}).catch((error) => {
    console.log(error)
});

//Configurações
app.use(express.static('public'));
app.set('view engine', 'ejs');

const upload = multer({dest: "public/uploads/"})

// ROTA PRINCIPAL
app.get("/", (req,res) =>{
    res.render("index")
});

// ROTA Catalogo
app.get("/films", (req,res) => {
    Catalogo.findAll().then(filmes => {
        res.render("films", {
            filmes : filmes
        })
    }).catch((error) => {
        console.log(error)
    });
})

// ROTA DE UPLOAD
app.post("/upload", upload.single("file"),(req,res) => {
    const file = req.file.filename
    const {titulo, diretor, pais, ano } = req.body;
    Catalogo.create({
        file : file,
        titulo : titulo,
        diretor : diretor,
        pais : pais,
        ano : ano
    });
    res.redirect("/films");
});


const port = 8081
app.listen(port, (error) => {
    if(error){
        console.log(`Ocorreu um erro! ${error}`);
    } else {
        console.log(`Servidor iniciado com sucesso em: http://localhost:${port}.`);
    }
});