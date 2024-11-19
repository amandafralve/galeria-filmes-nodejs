import { Sequelize } from "sequelize";

const connection =  new Sequelize({
    dialect: "mysql",
    host: "localhost",
    username: "root",
    password: "",
    // Comentar linha de database na primeira execução da aplicação
    database: "",
    timezone: "-03:00"
});

export default connection;