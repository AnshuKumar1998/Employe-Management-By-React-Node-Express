const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('reactcrud', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
});

const connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connected to the MySQL database');
    } catch (err) {
        console.error('Unable to connect to the database:', err);
    }
};

module.exports = { sequelize, connectDB };
