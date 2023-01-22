const { DataTypes, Model } = require("sequelize");
const sequelize = require("../database.js");
const permissions = require("./permission.js");

class profile extends Model{}
profile.init({
    id:{
        type: DataTypes.TEXT,
        primaryKey:true,
        allowNull:false,
        validate:{
            notNull:{
                args:true,
                msg:"El campo código no puede estar vacío."
            },
            notEmpty:{
                args:true,
                msg:"El campo código no puede estar vacío."
            }
        }
    },
    title:{
        type: DataTypes.TEXT,
        unique:true,
        allowNull:false,
        validate:{
            notNull:{
                args:true,
                msg:"El campo titulo no puede estar vacío."
            },
            notEmpty:{
                args:true,
                msg:"El campo titulo no puede estar vacío."
            }
        }
    },
    description:{
        type: DataTypes.TEXT,
        validate:{
            notEmpty:{
                args:true,
                msg:"El campo descripción no puede estar vacío."
            }
        }
    },
    active:{
        type: DataTypes.BOOLEAN,
        allowNull:false,
        defaultValue:true
    }
},{
    sequelize,
    schema:"auth"
});

profile.belongsToMany(permissions,{through:"profile_permissions"});
module.exports = profile;