const {Model,DataTypes} = require('sequelize')
const sequelize = require('../dataBase')
class Comments extends Model{}

Comments.init({
    userName:{
        type: DataTypes.STRING
    },
    comment:{
        type: DataTypes.STRING
    },
    email:{
        type: DataTypes.STRING
    },
    commentsBoxId:{
        type: DataTypes.STRING
    }
},{
    sequelize,
    modelName : 'comments',
    timestamps: false
})

module.exports = Comments;