const {Sequelize} = require('sequelize');
const sequelize = new Sequelize('my-db', 'user' , 'pass',{
    dialect:'sqlite',
    storage: 'path/to/database.sqlite'
})
module.exports =sequelize;