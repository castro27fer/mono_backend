module.exports = class validateError extends Error{
    constructor(message){
        super(message);
        this.name = "BadRequest";
    }
}

