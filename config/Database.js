import { Sequelize } from "sequelize";

const db = new Sequelize('auth_db', 'postgres', 'postgres', {
    host: "localhost",
    port: 5432,
    dialect: "postgres",
    logging: (msg) => {
        if (msg.includes('ERROR')) {
            console.error(msg);
        }
    },
    underscored: true 
});

export default db;
