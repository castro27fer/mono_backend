
        const {Model, DataTypes} = require("sequelize");
        const sequelize = require("../../database.js");
        
        class catProcess extends Model{};
        
        catProcess.init({
            ProcesoId:{
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
        
        // catPrintImagen.belongsTo(catDependency,{ foreignkey:"DependenciaTipoId"});
        
        module.exports = catProcess;