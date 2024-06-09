import { Sequelize, DataTypes } from 'sequelize';
import db from '../config/Database.js' ;

const Artikel = db.define('artikel', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING
    },
    img: {
        type: DataTypes.STRING
    },
    url: {
        type: DataTypes.STRING
    },
    createdAt: {
        type: DataTypes.DATE,
        field: 'createdat'
    },
    updatedAt: {
        type: DataTypes.DATE,
        field: 'updatedat'
    }
}, {
    tableName: 'artikel',
    timestamps: true
});

export default Artikel;


(async () => {
  await db.sync();
})();