const {Model, DataTypes} = require("sequelize");
const sequelize = require("../../database.js");

const product = require("./product.js");

class movementDetail extends Model{};

movementDetail.init({
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    movementMasterId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    productId: {
        type: DataTypes.STRING,
        allowNull:false,
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
    barcode:{
        type:DataTypes.STRING,
        allowNull:true
    },
    location:{
        type:DataTypes.STRING,
        allowNull:true
    },
    quantity:{
        type:DataTypes.INTEGER,
        allowNull:false,
        validate:{
            notNull:{
                args:true,
                msg:"El campo cantidad no puede estar vacío."
            },
            notEmpty:{
                args:true,
                msg:"El campo cantidad no puede estar vacío."
            }
        }
    },
    price:{
        type:DataTypes.DECIMAL,
        allowNull:false,
    },
    totalAmount:{
        type:DataTypes.DECIMAL,
        allowNull:false
    }
},{
    sequelize,
    schema:"inv"
});

movementDetail.hasOne(product,{ foreignkey:"productId"});

module.exports = movementDetail;