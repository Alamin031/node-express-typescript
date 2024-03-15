import express from "express";
import mongoose, { ConnectOptions } from "mongoose";
import dotenv from "dotenv";
import authRouter from "./src/routes/auth.route";
import userRouter from "./src/routes/user.route";
import { auth } from "./src/middleware/auth";
import { adminauth } from "./src/middleware/admin.auth";
import adminRouter from "./src/routes/admin.route";
import productRouter from "./src/routes/products.route";


dotenv.config();

const app = express();
const port = 4000;

// mongoose
//   .connect("process.env.MONGODB_URI")
//   .then(() => {
//     console.log("Connected to MongoDB");
//   })
//   .catch((error) => {
//     console.error("Error connecting to MongoDB:", error);
//   });

app.use(express.json());
const connectdb = async () => {
  const MONGODB_URI = process.env.MONGODB_URI || "";

  try {
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as ConnectOptions);
    console.log("Connected to Distribution API Database - Initial Connection");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};
connectdb();

app.get("/", (req, res) => {
  res.send("Hello, Express with TypeScript!");
});
// app.use("/api", auth, userRouter);

app.use("/api", authRouter);
app.use("/api/users", auth, userRouter);
app.use("/api/admins", adminauth, adminRouter);
app.use("/api/products", productRouter);
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
