
        const {Model, DataTypes} = require("sequelize");
        const sequelize = require("../../database.js");
        // const catDependency = require("./catDependencia.js");
        
        class catPrint extends Model{};
        
        catPrint.init({
            ImpresionId:{
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            Descripcion: {
                type: DataTypes.STRING,
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
        
        // catPrint.belongsTo(catDependency,{ foreignkey:"DependenciaTipoId"});
        
        module.exports = catPrint;