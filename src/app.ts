import express from "express";
import authroutes from "./routes/authroutes"
import routes from "./routes/routes"
import cors from "cors";
import dotenv from "dotenv";
const app = express();
app.use(express.json());
app.use(cors({origin: "https://task-ryzer-nv-notekeeper.netlify.app",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true}));
app.get("/", (req, res) => {
  res.send("Backend is running");
});
app.use("/notes",routes)
app.use("/auth",authroutes);
export  default app;