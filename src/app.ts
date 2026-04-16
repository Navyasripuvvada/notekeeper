import express from "express";
import authroutes from "./routes/authroutes"
import routes from "./routes/routes"
import cors from "cors";
import dotenv from "dotenv";
const app = express();
app.use(express.json());
app.use(cors({origin: ["http://127.0.0.1:5500", "http://localhost:5500"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true}));

app.use("/notes",routes)
app.use("/auth",authroutes);
export  default app;