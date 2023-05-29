const {DataTypes,Model} = require("sequelize");
const sequelize = require("../../database.js");

const product = require("./product.js");
const warehouse = require("./warehouse.js");

class masterExistence extends Model{};
masterExistence.init({
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    year:{
        type:DataTypes.INTEGER,
        allowNull:false,
        validate:{
            notNull:{
                args:true,
                msg:"El campo año no puede estar vacío."
            },
            notEmpty:{
                args:true,
                msg:"El campo año no puede estar vacío."
            }
        }
    },
    month:{
        type:DataTypes.INTEGER,
        allowNull:false,
        validate:{
            notNull:{
                args:true,
                msg:"El campo mes no puede estar vacío."
            },
            notEmpty:{
                args:true,
                msg:"El campo mes no puede estar vacío."
            }
        }
    },
    productId:{
        type:DataTypes.STRING,
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
        },
    },
    warehouseId:{
        type:DataTypes.STRING,
        allowNull:false,
        validate:{
            notNull:{
                args:true,
                msg:"El campo bodega no puede estar vacío."
            },
            notEmpty:{
                args:true,
                msg:"El campo bodega no puede estar vacío."
            }
        }
    },
    initial:{
        type:DataTypes.INTEGER,
        allowNull:false,
        defaultValue:0
    },
    entry:{
        type:DataTypes.INTEGER,
        allowNull:false,
        defaultValue:0
    },
    exit:{
        type:DataTypes.INTEGER,
        allowNull:false,
        defaultValue:0
    },
    residue:{
        type:DataTypes.INTEGER,
        allowNull:false,
        defaultValue:0
    },
    initialValue:{
        type:DataTypes.DECIMAL,
        allowNull:false,
        defaultValue:0
    },
    entryValue:{
        type:DataTypes.DECIMAL,
        allowNull:false,
        defaultValue:0
    },
    exitValue:{
        type:DataTypes.DECIMAL,
        allowNull:false,
        defaultValue:0
    },
    residueValue:{
        type:DataTypes.DECIMAL,
        allowNull:false,
        defaultValue:0
    },
    // unitPrice:{
    //     type:DataTypes.DECIMAL,
    //     allowNull:false,
    //     defaultValue:0
    // }
},{
    sequelize,
    schema:"inv"
});

masterExistence.hasOne(product,{ foreignKey:"productId" });
masterExistence.hasOne(warehouse,{ foreignKey:"warehouseId" });

module.exports = masterExistence;