
        const {Model, DataTypes} = require("sequelize");
        const sequelize = require("../../database.js");
        const catUnitMeasurement = require("./catUnidadMedida.js");
        
        class catSize extends Model{};
        
        catSize.init({
            TamanioId:{
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            Descripcion: {
                type: DataTypes.STRING,
                allowNull: false
            },
            Largo: {
                type: DataTypes.DECIMAL,
                allowNull: false
            },
            Ancho: {
                type: DataTypes.DECIMAL,
                allowNull: false
            },
            UnidadMedidaId: {
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
        
        catSize.hasOne(catUnitMeasurement,{ foreignkey:"UnidadMedidaId"});
        
        module.exports = catSize;