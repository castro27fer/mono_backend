
const {Model, DataTypes} = require("sequelize");
const sequelize = require("../../database.js");
const catContact = require("./catContacto.js");

class catDependency extends Model{};

catDependency.init({
    DependenciaId:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    Nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Activo: {
        type: DataTypes.BOOLEAN,
        allowNull:false,
        defaultValue: true
        
    }
    
},{
    sequelize,
    schema:"authorization"
});

catDependency.hasMany(catContact,{foreignKey:"DependenciaId"});
catContact.belongsTo(catDependency, { foreignKey: "DependenciaId" });

module.exports = catDependency;