
        const {Model, DataTypes} = require("sequelize");
        const sequelize = require("../../database.js");
        
        class productService extends Model{};
        
        productService.init({
            ProductoServicioId:{
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            Descripcion: {
                type: DataTypes.DECIMAL,
                allowNull: false
            }
            
        },{
            sequelize,
            schema:"authorization"
        });
        
        module.exports = productService;