const {Model, DataTypes} = require("sequelize");
const sequelize = require("../../database.js");
const catFormat = require("./catFormato.js");

class relProductFormat extends Model{};

relProductFormat.init({
    ProductoFormatoId:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    FormatoId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    ProductoId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    Activo: {
        type: DataTypes.BOOLEAN,
        allowNull:false,
        defaultValue: true
        
    },
    
},{
    sequelize,
    schema:"authorization"
});

// relProductFormat.belongsTo(catFormat,{ foreignkey:"FormatoId"});

module.exports = relProductFormat;