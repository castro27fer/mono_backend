const {Model, DataTypes} = require("sequelize");
const sequelize = require("../../database.js");
// const catPrintImagen = require("./catImpresionImagen.js");
// const catSize = require("./catTamanio.js");

class catFormat extends Model{};

catFormat.init({
    FormatoId:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        
    },
    Nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    HojasXJuego: {
        type: DataTypes.DECIMAL,
        allowNull: false
    },
    JuegosXBlock: {
        type: DataTypes.DECIMAL,
        allowNull: false
    },
    ImpresionTipoId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    TamanioId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    Observaciones: {
        type: DataTypes.STRING,
        allowNull: true
    },
    Nformato: {
        type: DataTypes.STRING,
        allowNull: true
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

// catFormat.hasMany(catPrintImagen,{ foreignkey:"FormatoId"});
// catFormat.hasOne(catSize,{ foreignkey:"TamanioId"});

module.exports = catFormat;