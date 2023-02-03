const {Model, DataTypes} = requiere("sequelize");
const sequelize = require("../../database.js");

class inventory extends Model{};
inventory.init({
    
},{
    sequelize,
    schema:"inv"
});