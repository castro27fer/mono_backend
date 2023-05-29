const INVOICE = require('../model/bill/bill.js');
const INVOICEDETAIL = require('../model/bill/billDetail.js');
const AUTHORIZATION = require("../model/authorization/Autorizacion.js");
const AUTHORIZATIONDETAIL = require("../model/authorization/autorizacionDetalle.js");

const getInvoinceById = async(req,res) =>{
    const invoice = await INVOICE.findByPk(req.params.id,{include:[{model:INVOICEDETAIL}]});
    res.json(invoice);
}

const authorizeVoice = async(req, res) =>{
    const invoice = await INVOICE.findByPk(req.params.id);

    invoice.update({
        FacturaEstadoId:2,
        FechaAutorizacionDI:new Date()
    });
    await invoice.save();

    // res.json({ message:"autorización exitosa."});
    res.json(invoice);
}

const removeInvoice = async (req, res) => {

    const invoice = await INVOICE.findByPk(req.params.id,{include:[{model:INVOICEDETAIL}]});

    if(invoice != null){

        await invoice.update({FacturaEstadoId:4,FechaAnulacion:new Date()});
        await invoice.save();
    
        await invoice.billDetails.forEach(async element => {
            const detail = await AUTHORIZATIONDETAIL.findByPk(element.AutorizacionDetalleId);
            await detail.update({  Saldo: parseInt(detail.Saldo) + element.Cantidad });
            await detail.save();
        });
    }
   
    res.json(invoice);

}

const deliverInvoice = async (req, res) => {

    const invoice = await INVOICE.findByPk(req.params.id,{include:[{model:INVOICEDETAIL}]});

    invoice.update({
        FacturaEstadoId:3,
        FechaEntrega:new Date()
    });

    await invoice.save();

    // res.json({ message:"autorización exitosa."});
    res.json(invoice);

}

module.exports = {
    getInvoinceById,
    authorizeVoice,
    removeInvoice,
    deliverInvoice
}