    const {Model, DataTypes} = require("sequelize");
    const sequelize = require("../../database.js");
    
    class acatAuthorizationState extends Model{};
    
    acatAuthorizationState.init({
        AutorizacionEstadoId:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        Descripcion: {
            type: DataTypes.STRING,
            allowNull: false,
            validate:{
                notNull:{
                    args:true,
                    msg:"El campo producto no puede estar vacío."
                },
                notEmpty:{
                    args:true,
                    msg:"El campo producto no puede estar vacío."
                }
            }
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
    
    module.exports = acatAuthorizationState;