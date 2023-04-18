
const {Model, DataTypes} = require("sequelize");
const sequelize = require("../../database.js");
const authOrigin = require("./catAutorizacionOrigen.js");
const currency = require("./catMoneda.js");
const authPriority = require("./catAutorizacionPrioridad.js");
const authEstate = require("./catAutorizacionEstado.js");
const contact = require("./catContacto.js");
const authType = require("./catAutorizacionTipo.js");
const dependency = require("./catDependencia.js");
const detail = require("./autorizacionDetalle.js");
const documentoSoport = require("./DocumentoSoporte.js");
const bill = require("../bill/bill.js");

class authorization extends Model{}
authorization.init({
    AutorizacionId:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    DependenciaId:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    ContactoId:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    // AutorizacionTipoId:{
    //     type:DataTypes.INTEGER,
    //     allowNull:false
    // },
    FechaFormato:{
        type:DataTypes.DATE,
        allowNull:false
    },
    NoAutorizado:{
        type:DataTypes.STRING,
        allowNull:false
    },
    AutorizacionOrigenId:{
        type:DataTypes.INTEGER,
        allowNull:false
    }, 
    MonedaId:{
        type:DataTypes.INTEGER,
        allowNull:false
    }, 
    TipoCambio:{
        type:DataTypes.DECIMAL,
        allowNull:false
    }, 
    FechaRecibidoSGA:{
        type:DataTypes.DATE,
        allowNull:true
    }, 
    FechaAutorizadoSGA:{
        type:DataTypes.DATE,
        allowNull:true
    }, 
    FechaRecibido:{
        type:DataTypes.DATE,
        allowNull:true
    }, 
    FechaAutorizacion:{
        type:DataTypes.DATE,
        allowNull:true
    },  
    FechaFinaliza:{
        type:DataTypes.DATE,
        allowNull:true
    },  
    FechaEntrega:{
        type:DataTypes.DATE,
        allowNull:true
    },  
    // AutorizacionEstadoId:{
    //     type:DataTypes.INTEGER,
    //     allowNull:false
    // },  
    NoProforma:{
        type:DataTypes.STRING,
        allowNull:true
    },  
    AutorizacionPrioridadId:{
        type:DataTypes.INTEGER,
        allowNull:true
    },  
    // FechaRegistro:{
    //     type:DataTypes.DATE,
    //     allowNull:false
    // },  
    ObservacionDI:{
        type:DataTypes.STRING,
        allowNull:true
    },  
    activo:{
        type:DataTypes.BOOLEAN,
        allowNull:false,
        defaultValue:true
    }

},{
    sequelize,
    schema:"authorization"
});

authorization.belongsTo(contact,{foreignKey:"ContactoId"});

authorization.belongsTo(authOrigin,{foreignKey:"AutorizacionOrigenId"});
authorization.belongsTo(currency,{foreignKey:"MonedaId"});
authorization.belongsTo(authPriority,{foreignKey:"AutorizacionPrioridadId"});
authorization.belongsTo(authEstate,{foreignKey:"AutorizacionEstadoId"});

authorization.belongsTo(authType,{foreignKey:"AutorizacionTipoId"});
authorization.belongsTo(dependency,{foreignKey:"DependenciaId"});

authorization.hasMany(detail,{foreignKey:"AutorizacionId"});
authorization.hasMany(documentoSoport,{foreignKey:"AutorizacionId"});
authorization.hasMany(bill,{foreignKey:"AutorizacionId"});

module.exports = authorization;