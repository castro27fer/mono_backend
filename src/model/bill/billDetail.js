
const {Model, DataTypes} = require("sequelize");
const sequelize = require("../../database.js");

// const authDetail = require("../authorization/autorizacionDetalle.js");
const PRODUCT = require("../inv/product.js");

class billDetail extends Model{};

billDetail.init({
    FacturadetalleId:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    FacturaId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    AutorizacionDetalleId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    Disponible: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    ProductoId:{
        type: DataTypes.STRING,
        allowNull: false
    },
    Cantidad: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    PrecioUnitario: {
        type: DataTypes.DECIMAL,
        allowNull: false
    },
    SubTotal: {
        type: DataTypes.DECIMAL,
        allowNull: false
    },
    Saldo: {
        type: DataTypes.DECIMAL,
        allowNull: false
    }
    
},{
    sequelize,
    schema:"authorization"
});


// billDetail.hasOne(PRODUCT,{ foreignkey:"ProductoId"})
// billDetail.belongsTo(PRODUCT,{ foreignkey:"ProductoId"});

module.exports = billDetail;