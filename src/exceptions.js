
const exceptions = (err,req,res) => {

    let messages = [];
    res.status(400);
    console.log(err);

    
    switch(err.name){
        case "SequelizeValidationError":{
            err.errors.forEach((value,index)=>{
                messages.push(value.message);
            });
            break;
        }
        case "SequelizeUniqueConstraintError":{
            
            if(err.parent.constraint == "users_email_key"){
                messages.push("El correo ya se encuentra registrado.");
                break;
            }
            else if(err.parent.constraint.match(/_pkey/)){
                messages.push("El código ingresado ya se encuentra en uso.");
                break;
            } 
            // else if(err.parent.constraint == "profiles_pkey" || err.parent.constraint == "warehouses_pkey"){
            //     messages.push("El código ingresado ya se encuentra en uso.");
            //     break;
            // }

            else if(err.parent.constraint == "charges_title_key"){
                messages.push("El titulo ingresado ya se encuentra en uso.");
                break;
            }
        }
        case "BadRequest":{
            messages.push(err.message);
            break;
        }
        default: {
            res.status(500);
            messages.push("Ocurrio un error inesperado.");
            break;
        }
    }
   
    res.json(messages);
}

module.exports = exceptions;