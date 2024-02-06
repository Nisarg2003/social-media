// server.js
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import http from "http";
import session from "express-session";
import { Server } from "socket.io";
import crypto from "crypto";
import connectDb from "./Config/connectDb.js";
import userRoutes from "./Routes/userRoutes.js";
import postRoutes from "./Routes/postRoutes.js";
import bodyParser from "body-parser";
import passport from "passport";

dotenv.config();

connectDb();

const sessionSecret = crypto.randomBytes(32).toString("hex");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "https://social-wave-app.vercel.app",
  },
});

const corsOptions = {
  origin: "https://social-wave-app.vercel.app/",
  credentials: true,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  optionsSuccessStatus: 204,
  allowedHeaders: "Content-Type, Authorization",
};

app.use(express.json());
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  session({
    secret: sessionSecret,
    resave: false,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.get("/",(req,res)=>{
  res.send("Hello")
})
// Define your routes
app.use("/api/v1", userRoutes);
app.use("/api/v1/post", postRoutes);

// Socket.io connection handling
io.on("connection", (socket) => {
  console.log("A user connected");

  // Example: Handle socket events
  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

const PORT = 8080;

server.listen(PORT, () => {
  console.log("Server running");
});
export { io }
