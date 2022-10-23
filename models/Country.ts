import mongoose, { model, Model, Schema } from "mongoose";
import { ICountry } from "../interfaces";

const countryModel = new Schema({
    name: String,
    code: String,
    capital: String,
    region: String,
    currency: {
        code: String,
        name: String,
        symbol: String,
    },
    language: {
        code: String,
        name: String,
    },
    flag: String,
})

const Country:Model<ICountry> = mongoose.models.Country || model('Country', countryModel)
export default Country;