import { PrismaClient } from "@prisma/client";
import express, { Express, Request, Response } from "express";
import addRouter from "./todos";
import updateRouter from "./update"
import cors from "cors"; 

const prisma = new PrismaClient();
const app: Express = express();
app.use(express.json());
app.use(cors(
  {
    origin: "http://localhost:5173", // Replace with your frontend's URL
  methods: ["GET", "POST", "PUT", "DELETE"], // Allowed HTTP methods
  credentials: true,
  }
));

// Root route
app.get("/", (req: Request, res: Response) => {
  res.send("Hey, you connected!");
});
//route to diffrent file
app.use("/add", addRouter);
app.use("/update", updateRouter);


// Start the server
app.listen(3000, () => {
  console.log("Hey, server running on port 3000");
});

// Function to connect to the database
async function connect() {
  try {
    await prisma.$connect();
    console.log("Connected to the database");
  } catch (err) {
    console.error("Unable to connect to the database:", err);
  }
}

// Connect to the database on startup
(async () => {
  await connect();
})();