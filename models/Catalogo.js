import Sequelize from 'sequelize'
import connection from "../config/sequelize-config.js"

const Catalogo = connection.define('filme', {
    titulo: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    diretor: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    pais: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    ano: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    file: {
        type: Sequelize.STRING,
        allowNull: false,
    }
});

Catalogo.sync({ force: false });
export default Catalogo;