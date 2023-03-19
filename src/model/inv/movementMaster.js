const {Model, DataTypes} = require("sequelize");
const sequelize = require("../../database.js");

const movementDetail = require("./movementDetail.js");

class movementMaster extends Model{};
movementMaster.init({
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    registrationNumber:{
        type:DataTypes.STRING,
        allowNull:false,
        validate:{
            notNull:{
                args:true,
                msg:"El campo número registro no puede estar vacío."
            },
            notEmpty:{
                args:true,
                msg:"El campo número registro no puede estar vacío."
            }
        }
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
    typeOfInventoryId:{
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
    receivingWarehouseId:{
        type:DataTypes.STRING,
        allowNull:true,
    },
    movementType:{
        type:DataTypes.STRING,
        allowNull:false,
        validate:{
            notNull:{
                args:true,
                msg:"El campo movimiento tipo no puede estar vacío."
            },
            notEmpty:{
                args:true,
                msg:"El campo movimiento tipo no puede estar vacío."
            }
        },
    },
    employe:{
        type:DataTypes.STRING,
        allowNull:true
    },
    receiverName:{
        type:DataTypes.STRING,
        allowNull:true
    },
    supplierId:{
        type:DataTypes.STRING,
        allowNull:true
    },
    annulled:{
        type:DataTypes.BOOLEAN,
        defaultValue:false
    },
    dateAnnulled:{
        type:DataTypes.DATE,
        allowNull:true
    }

},{
    sequelize,
    schema:"inv"
});

movementMaster.hasMany(movementDetail,{
    foreignKey:"movementMasterId"
});

module.exports = movementMaster;