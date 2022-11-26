import Sequelize from 'sequelize';
import connection from '../config/db.js';

const Produto = connection.define(
    'produtos',
    {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        nome: {
            type: Sequelize.STRING,
            allowNull: false
        },
        sabor: {
            type: Sequelize.STRING,
            allowNull: false
        },
        valor: {
            type: Sequelize.INTEGER,
            allowNull: true
        },
    }

);


export default Produto