
const {Model, DataTypes} = require("sequelize");
const sequelize = require("../../database.js");

const productType = require("./productType.js");
const brand = require("./brand.js");

class product extends Model{}

product.init({
    id:{
        type:DataTypes.STRING,
        primaryKey:true
    },
    typeOfInventoryId:{
        type:DataTypes.STRING,
        allowNull:false
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
        allowNull:true
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
    active:{
        type:DataTypes.BOOLEAN,
        allowNull:false,
        defaultValue:true
    },
    price:{
        type:DataTypes.DECIMAL,
        allowNull:false,
        defaultValue:0
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

// product.belongsTo(billDetail,{
//     foreignKey: 'ProductoId'
// });

module.exports = product;