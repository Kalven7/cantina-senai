import Sequelize from 'sequelize';
import connection from '../config/db.js';
import Produto from './Produto.js';
import User from './User.js';

const Pedido = connection.define(
    'pedidos',
    {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        idUser: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: 'users',
                key: 'id'
            }
        },
        idProduto: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: 'produtos',
                key: 'id'
            }
        },

        quantidade: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },

        valorTotal: {
            type: Sequelize.INTEGER,
            allowNull: false,
        }
    }
);

Pedido.belongsTo(Produto, {
    foreignKey: 'idProduto'
});
Pedido.belongsTo(User, {
    foreignKey: 'idUser'
});

export default Pedido