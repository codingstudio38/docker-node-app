import express from "express";
import { Index, AllUsers } from "../Controllers/Mycontroller.js";
const routeapp = express.Router();
routeapp.get("/", Index);
routeapp.get("/all-users", AllUsers);

// 404 handler
routeapp.all(/.*/, async (req, res) => {
    res.status(404).json({
        status: 404,
        message: "route not found..!!"
    });
});
export default routeapp;
