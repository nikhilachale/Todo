import { Router, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { z } from "zod";

const prisma = new PrismaClient();
const router = Router();

// Define validation schema
const Todo = z.object({
  tid: z.number().optional(), // tid is optional for new Todos
  id: z.string(),
  task: z.string().min(1),
  complete: z.boolean(),
});

// Test route
router.get("/", (req: Request, res: Response) => {
  res.send("You are in the add route now!");
});

// Route to add a new Todo
router.post("/todos", async (req: Request, res: Response) => {
  // const validationResult = Todo.safeParse(req.body);
  // if (!validationResult.success) {
  //   return res.status(400).json({
  //     message: "Invalid inputs",
  //     errors: validationResult.error.issues,
  //   });
  // }

  const { id, task, complete } = req.body;

  try {
    const newTodo = await insertTodo(id, task, complete);
    res.status(201).json(newTodo);
  } catch (err) {
    console.error("Error in /todos POST:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Route to get all Todos
router.get("/todos", async (req: Request, res: Response) => {
  try {
    const todos = await prisma.todo.findMany();
    res.json(todos);
  } catch (err) {
    console.error("Unable to fetch Todos:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Function to insert a new Todo into the database
async function insertTodo(id: string, task: string, complete: boolean) {
  try {
    const newTodo = await prisma.todo.create({
      data: {
        id,
        task,
        complete,
      },
      select: {
        id: true,
        tid: true,
        task: true,
        complete: true,
      },
    });
    return newTodo;
  } catch (err) {
    console.error("Unable to insert into the database:", err);
    throw err;
  }
}

export default router;