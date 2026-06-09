import mongodb from "mongodb";
import moment from "moment-timezone";
import mongoose from "mongoose";
import mongooseConnect from "../Config/MongooseConfig.js";

const UsersSchema = new mongooseConnect.Schema({
    name: {
        type: String,
        trim: true,
        default: "auto generate name by mongo",
    },

    phone: {
        type: Number,
        required: true,
        unique: true,
        trim: true,
    },

    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },

    photo: {
        type: String,
        default: null,
        trim: true,
    },

    password: {
        type: String,
        required: true,
    },


    active_status: { type: Number, default: 1 },
    delete: { type: Number, default: 0 },

    created_at: {
        type: Date,
        required: true,
        default: () => moment().tz(process.env.TIMEZONE).format("YYYY-MM-DD HH:mm:ss"),
    },

    updated_at: { type: Date, default: null },
});

/* ===========================
   METHODS
=========================== */
UsersSchema.methods.findByUserId = async function (id) {
    try {
        return await mongoose.model("users").findOne({ _id: id });
    } catch (error) {
        throw new Error(error.message);
    }
};

const UsersModel = mongooseConnect.model("users", UsersSchema);

export default UsersModel;
