
const {Model, DataTypes} = require("sequelize");
const sequelize = require("../../database.js");

const productType = require("./productType.js");
const brand = require("./brand.js");
const format = require("../authorization/catFormato.js");
const productService = require("./productService.js");

class product extends Model{}
product.init({
    id:{
        type:DataTypes.STRING,
        primaryKey:true
    },
    productTypeId:{
        type:DataTypes.STRING,
        allowNull:false,
        validate:{
            notNull:{
                args:true,
                msg:"El campo tipo producto no puede estar vacío."
            },
            notEmpty:{
                args:true,
                msg:"El campo tipo producto no puede estar vacío."
            }
        }
    },
    brandId:{
        type:DataTypes.STRING,
        allowNull:false,
        validate:{
            notNull:{
                args:true,
                msg:"El campo marca no puede estar vacío."
            },
            notEmpty:{
                args:true,
                msg:"El campo marca no puede estar vacío."
            }
        }
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
    model:{
        type:DataTypes.STRING,
        allowNull:true
    },
    color:{
        type:DataTypes.STRING,
        allowNull:true
    },
    // applyFormat:{
    //     type:DataTypes.BOOLEAN,
    //     allowNull:false
    // }, 
    // applyProcess:{
    //     type:DataTypes.BOOLEAN,
    //     allowNull:false
    // },  
    // productServiceId:{
    //     type:DataTypes.INTEGER,
    //     allowNull:false
    // },
    // detail:{
    //     type:DataTypes.STRING,
    //     allowNull:false
    // },
    active:{
        type:DataTypes.BOOLEAN,
        allowNull:false,
        defaultValue:true
    }

},{
    sequelize,
    schema:"inv"
});

product.belongsTo(productType,{
    foreignKey: 'productTypeId'
});

product.belongsTo(brand,{
    foreignKey: 'brandId'
});

// product.belongsTo(productService,{foreignKey: 'productServiceId'});

// product.belongsToMany(format, { through: 'relProducto_Format' });


// product.hasOne(brand,{
//     foreignKey: 'productTypeId'
// });

// product.hasOne(brand,{
//     foreignKey: 'brandId'
// });


module.exports = product;