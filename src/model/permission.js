const { DataTypes,Model} = require("sequelize");
const sequelize = require("../database.js");

class permission extends Model{};
permission.init({
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true,
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
    cadena:{
        type:DataTypes.STRING,
        allowNull:false,
        validate:{
            notNull:{
                args:true,
                msg:"El campo cadena no puede estar vacío."
            },
            notEmpty:{
                args:true,
                msg:"El campo cadena no puede estar vacío."
            }
        }
        
    },
    level:{
        type:DataTypes.INTEGER,
        allowNull:false,
        validate:{
            notNull:{
                args:true,
                msg:"El campo nivel no puede estar vacío."
            },
            notEmpty:{
                args:true,
                msg:"El campo nivel no puede estar vacío."
            }
        }
    },
    parent:{
        type:DataTypes.INTEGER,
        defaultValue:null
    },
    type:{
        type:DataTypes.TEXT,
        allowNull:false,
        validate:{
            notNull:{
                args:true,
                msg:"El campo nivel no puede estar vacío."
            },
            notEmpty:{
                args:true,
                msg:"El campo nivel no puede estar vacío."
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
    schema:"auth"
});

module.exports = permission;