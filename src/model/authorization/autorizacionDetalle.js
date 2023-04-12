
        const {Model, DataTypes} = require("sequelize");
        const sequelize = require("../../database.js");
        const product = require("../inv/product.js");
        const format = require("./catFormato.js");
        
        class authorizationDetail extends Model{};
        
        authorizationDetail.init({
            AutorizacionDetalleId:{
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            AutorizacionId: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            ProductoId: {
                type: DataTypes.STRING,
                allowNull: false
            },
            FormatoId: {
                type: DataTypes.INTEGER,
                allowNull: true
            },
            Cantidad: {
                type: DataTypes.DECIMAL,
                allowNull: false
            },
            Costo: {
                type: DataTypes.DECIMAL,
                allowNull: false
            },
            UsuarioId: {
                type: DataTypes.STRING,
                allowNull: false
            },
            EntidadId: {
                type: DataTypes.STRING,
                allowNull: false
            },
            CargoId: {
                type: DataTypes.STRING,
                allowNull: false
            },
            FechaRegistro: {
                type: DataTypes.DATE,
                allowNull: false
            },
            Descripcion: {
                type: DataTypes.STRING,
                allowNull: false
            },
            Saldo: {
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
        
        authorizationDetail.belongsTo(product,{ foreignkey:"ProductoId"});
        authorizationDetail.belongsTo(format,{ foreignkey:"FormatoId"})
        
        module.exports = authorizationDetail;