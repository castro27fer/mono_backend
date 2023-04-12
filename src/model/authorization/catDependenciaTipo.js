
const {Model, DataTypes} = require("sequelize");
const sequelize = require("../../database.js");

class catDependencyType extends Model{};

catDependencyType.init({
    DependenciaTipoId:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    Nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    AsociarEntidadesInternas: {
        type: DataTypes.BOOLEAN,
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

//  catDependencyType.belongsTo(dependency,{ foreignkey:"DependenciaTipoId"});

module.exports = catDependencyType;