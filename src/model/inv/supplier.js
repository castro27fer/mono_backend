const {Model, DataTypes} = require("sequelize");
const sequelize = require("../../database.js");
const product = require("../inv/product.js");

class supplier extends Model {};
supplier.init({
    id:{
        type:DataTypes.STRING,
        primaryKey:true
    },
    name:{
        type:DataTypes.STRING,
        allowNull:false,
        validate:{
            notNull:{
                args:true,
                msg:"El campo nombre no puede estar vacío."
            },
            notEmpty:{
                args:true,
                msg:"El campo nombre no puede estar vacío."
            }
        }
    },
    website:{
        type:DataTypes.STRING,
        allowNull:true
    },
    email:{
        type:DataTypes.STRING,
        allowNull:true
    },
    telephoneNumber:{
        type:DataTypes.STRING,
        allowNull:true
    },
    mobileNumber:{
        type:DataTypes.STRING,
        allowNull:true
    },
    contactName:{
        type:DataTypes.STRING,
        allowNull:false
    },
    active:{
        type:DataTypes.BOOLEAN,
        defaultValue:true
    }
},{
    sequelize,
    schema:"inv"
});

supplier.belongsToMany(product,{through:"supplier_Product"});
module.exports = supplier;