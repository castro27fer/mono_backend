const {Model, DataTypes} = require("sequelize");
const sequelize = require("../../database.js");

class catPrintImagen extends Model{};

catPrintImagen.init({
    ImpresionImagenId:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    FormatoId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    Orden: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    Imagen: {
        type: DataTypes.BLOB,
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

// catPrintImagen.belongsTo(catDependency,{ foreignkey:"DependenciaTipoId"});

module.exports = catPrintImagen;