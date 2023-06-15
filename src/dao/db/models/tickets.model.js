import mongoose from "mongoose";

const ticketsCollection = 'tickets';

const ticketsSchema = new mongoose.Schema({
    code: { //auogenerado
        type: Number,
        unique: true
         }, 
    purchase_datetime: Date, //compra created at
    amount: Number, // total de compra
    purchaser: String, // correo del comprador
    products: {
        type:[
            {
                product:{
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'products'
                },
                quantity: Number
            }
            ]}
});

const ticketsModel = mongoose.model(ticketsCollection, ticketsSchema);

export default ticketsModel;