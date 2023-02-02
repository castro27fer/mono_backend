const { DataTypes,Model} = require("sequelize");
const sequelize = require("../database.js");

class productType extends Model{ }

productType.init({

    id:{
        type:DataTypes.STRING,
        primaryKey:true
    },
    description:{
        type:DataTypes.STRING,
        allowNull:false,
        validate:{
            notNull:{
                args:true,
                msg:"El campo descripción no puede estar vacío."
            },
            notEmpty:{
                args:true,
                msg:"El campo descripción no puede estar vacío."
            }
        }
    },
    active:{
        type:DataTypes.BOOLEAN,
        allowNull:false,
        defaultValue:true
    }
},{
    sequelize,
    schema:"inv"
});

module.exports = productType;