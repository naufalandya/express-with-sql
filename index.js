import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import db from "./config/Database.js";
import router from "./routes/index.js";
import routerArtikel from "./routes/ArtikelRoute.js";
dotenv.config();
const app = express();

try {
  await db.authenticate();
  console.log("Database Conected...");
} catch (error) {
  console.log(error);
}

app.use(cors({ credentials: true, origin: "http://localhost:5173" }));
app.use(cookieParser());
app.use(express.json());
app.use(router);
app.use(express.static("public"));
app.use(routerArtikel);

app.listen(5000, () => console.log("Server running at port 5000"));
