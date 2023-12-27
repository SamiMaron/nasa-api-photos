const {Model,DataTypes} = require('sequelize')
const sequelize = require('../dataBase')
class Users extends Model{}
//// the user details we need
Users.init({

    firstName:{
        type: DataTypes.STRING
    },
    lastName:{
        type: DataTypes.STRING
    },
    email:{
        type: DataTypes.STRING
    },
    password:{
        type: DataTypes.STRING
    }

},{
    sequelize,
    modelName : 'users',
    timestamps: false
})

module.exports = Users;