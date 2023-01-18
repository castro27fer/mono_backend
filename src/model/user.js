const { DataTypes, Model } = require('sequelize');
const sequelize = require("../database.js");

class user extends Model{}
user.init({

    id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull:false
  },
  email:{
    type:DataTypes.STRING,
    allowNull:false
  },
  password:{
    type:DataTypes.STRING,
    allowNull:false
  },
  active:{
    type:DataTypes.BOOLEAN,
    allowNull:false,
    defaultValue:true
  }

}, {
    sequelize,
    schema:"auth",
    
});

module.exports = user;