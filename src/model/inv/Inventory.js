const {DataTypes,Model} = require("sequelize");
const sequelize = require("../../database");
const warehouse = require("./warehouse");

class inventory extends Model{};
inventory.init({
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
    warehouseId:{
        type:DataTypes.STRING,
        allowNull:false,
        validate:{
            notNull:{
                args:true,
                msg:"El campo almacen no puede estar vacío."
            },
            notEmpty:{
                args:true,
                msg:"El campo almacen no puede estar vacío."
            }
        }
    },
    openingDate:{
        type:DataTypes.DATE,
        allowNull:false,
        validate:{
            notNull:{
                args:true,
                msg:"El campo fecha apertura no puede estar vacío."
            },
            notEmpty:{
                args:true,
                msg:"El campo fecha apertura no puede estar vacío."
            }
        }
    },
    closingDate:{
        type:DataTypes.DATE,
        allowNull:true
    },
    observation:{
        type:DataTypes.STRING,
        allowNull:true
    }
},{
    sequelize,
    schema:"inv"
});

inventory.belongsTo(warehouse,{
    foreignKey: 'warehouseId'
});


module.exports = inventory