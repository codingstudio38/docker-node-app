import { fileURLToPath } from "url";
import { dirname } from "path";
import UsersModel from "./../Models/UsersModel.js";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const APP_URL = process.env.APP_URL;
const APP_STORAGE = process.env.APP_STORAGE;
export async function Index(req, resp) {
    try {
        let { name = '' } = req.query;
        let message = "Hello World. Good morning";
        if (name!=='') {
            message = `Hello ${name}`;
        }
        return resp.status(200).json({ "status": 200, "message": "Success", 'result': message });
    } catch (error) {
        return resp.status(500).json({ "status": 500, "message": error.message, 'result': {} });
    }
}
export async function AllUsers(req, resp) {
    try {
        let { limit = 5, page = 1 } = req.query;

        limit = parseInt(limit);
        page = parseInt(page);
        const skip = (page - 1) * limit;
        let data = await UsersModel.find({ delete: 0 }).skip(skip).limit(limit);
        return resp.status(200).json({ "status": 200, "message": "Success", 'result': data });
    } catch (error) {
        return resp.status(500).json({ "status": 500, "message": error.message, 'result': {} });
    }
}