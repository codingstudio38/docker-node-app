import express from "express";
import { fileURLToPath } from "url";
import path from "path";
const PORT = process.env.PORT || 5000;
const HOST = "localhost";//process.env.HOST;

// ---- FIX __dirname (not available in ES modules)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
app.get("/", (req, res) => {
    return res.status(200).json({ message: "Hello Bidyut", status: 1 });
});
// ---------------------------
// ⭐ GLOBAL ERROR HANDLER
// ---------------------------
app.use((err, req, res, next) => {
    console.error(err.message || "Internal Server Error");
    res.status(500).json({
        status: 500,
        message: err.message || "Internal Server Error",
        result: null
    });
});
const server = app.listen(PORT, () => {
    console.log(`server is running on port ${HOST}:${PORT}`);
});
// ---------------------------
// ⭐ PROCESS-LEVEL ERROR HANDLERS
// ---------------------------
process.on("uncaughtException", (err) => {
    console.error("Uncaught Exception:", err.message);
    process.exit(1);
});

process.on("unhandledRejection", (reason) => {
    console.error("Unhandled Rejection:", reason);
    process.exit(1);
});
process.on("SIGINT", () => {
    console.log('\nGracefully shutting down..');
    server.close(() => {
        console.log("server closed, Bye!");
        process.exit(1);
    })
});      