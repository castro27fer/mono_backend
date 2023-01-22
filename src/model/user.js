const { DataTypes, Model } = require('sequelize');
const bcrypt = require("bcryptjs");
const sequelize = require("../database.js");
const profile = require("./profile.js");

class user extends Model{}
user.init({

    id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate:{
      //El orden de las validaciones importa
      notNull:{
          args:true,
          msg:"El campo nombres no puede estar vacío."
      },
      notEmpty:{
          args:true,
          msg:"El campo nombres no puede estar vacío."
      }
    }
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull:false,
    validate:{
      //El orden de las validaciones importa
      notNull:{
          args:true,
          msg:"El campo apellidos no puede estar vacío."
      },
      notEmpty:{
          args:true,
          msg:"El campo apellidos no puede estar vacío."
      }
    }
  },
  email:{
    type:DataTypes.STRING,
    allowNull:false,
    unique: true,
    allowNull:false,
    validate:{
      //El orden de las validaciones importa
      notNull:{
          args:true,
          msg:"El campo correo no puede estar vacío."
      },
      // notEmpty:{
      //     args:true,
      //     msg:"El campo correo no puede estar vacío."
      // },
      isEmail:{
          args:true,
          msg:"El correo no es valido."
      }
    }
  },
  password:{
    type:DataTypes.STRING,
    allowNull:false,
    validate:{
      //El orden de las validaciones importa
      notNull:{
          args:true,
          msg:"El campo contraseña no puede estar vacío."
      },
      notEmpty:{
          args:true,
          msg:"El campo contraseña no puede estar vacío."
      },
      min:{
        args:6,
        msg:"La contraseña debe contener minimo 6 caracteres."
      }
    }
  },
  active:{
    type:DataTypes.BOOLEAN,
    allowNull:false,
    defaultValue:true
  }

}, {
    sequelize,
    schema:"auth",
    hooks:{
      beforeCreate:async(user,options)=>{
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password,salt);
      }
    }
});

user.belongsToMany(profile,{through:"user_Profiles"});

module.exports = user;