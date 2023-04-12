
        const {Model, DataTypes} = require("sequelize");
        const sequelize = require("../../database.js");
        const billState = require("./catFacturaEstado.js");
        const authorization = require("../authorization/Autorizacion.js");
        const billDetail = require("./billDetail.js");
        
        class bill extends Model{};
        
        bill.init({
            FacturaId:{
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            AutorizacionId: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            FechaAutorizacionDI: {
                type: DataTypes.DATE,
                allowNull: true
            },
            NoRecibo: {
                type: DataTypes.STRING,
                allowNull: false
            },
            Serie: {
                type: DataTypes.STRING,
                allowNull: false
            },
            OrdenesProduccion: {
                type: DataTypes.STRING,
                allowNull: false
            },
            EmitidoPor: {
                type: DataTypes.STRING,
                allowNull: false
            },

            FechaEmision: {
                type: DataTypes.DATE,
                allowNull: false
            },
            EntregadoPor: {
                type: DataTypes.STRING,
                allowNull: false
            },
            FechaEntrega: {
                type: DataTypes.DATE,
                allowNull: true
            },
            EsParcial: {
                type: DataTypes.BOOLEAN,
                allowNull: false
            },
            FacturaEstadoId: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            Observaciones: {
                type: DataTypes.STRING,
                allowNull: true
            },
            Total: {
                type: DataTypes.DECIMAL,
                allowNull: false
            },
            FechaAnulacion: {
                type: DataTypes.DATE,
                allowNull: true
            }
            
        },{
            sequelize,
            schema:"authorization"
        });
        
        bill.hasOne(billState,{ foreignkey:"FacturaEstadoId"});
        // bill.belongsTo(authorization,{ foreignkey:"AutorizacionId"});
        // bill.belongsToMany(billDetail,{ foreignkey:"FacturaId"});

        module.exports = bill;