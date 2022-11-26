import mongoose, {Model, Schema, model} from 'mongoose';
import { IOrder } from '../interfaces';

const OrderSchema = new Schema({
    name: { type: String, required: true },
})

const Order:Model<IOrder> = mongoose.models.Order || model('Order', OrderSchema);       

export default Order;