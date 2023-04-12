
        const {Model, DataTypes} = require("sequelize");
        const sequelize = require("../../database.js");
        // const catContact = require("./catContacto.js");
        const catDependencyType = require("./catDependenciaTipo.js");
        
        class catDependency extends Model{};
        
        catDependency.init({
            DependenciaId:{
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            DependenciaTipoId: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            Nombre: {
                type: DataTypes.STRING,
                allowNull: false
            },
            EntidadId: {
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
        
        // catDependency.hasMany(catContact, { foreignKey: "DependenciaId" });
        // catDependency.belongsTo(catContact,{foreignKey:"DependenciaId"});

        // catContact.belongsTo(catDependency,{foreignKey:"DependenciaId"});

        catDependency.hasOne(catDependencyType,{ foreignKey:"DependenciaTipoId"});
        

        module.exports = catDependency;