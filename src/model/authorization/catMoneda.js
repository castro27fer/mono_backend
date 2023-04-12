
        const {Model, DataTypes} = require("sequelize");
        const sequelize = require("../../database.js");
        
        class catCurrency extends Model{};
        
        catCurrency.init({
            MonedaId:{
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            Descripcion: {
                type: DataTypes.STRING,
                allowNull: false
            },
            TipoCambio: {
                type: DataTypes.DECIMAL,
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
        
        module.exports = catCurrency;