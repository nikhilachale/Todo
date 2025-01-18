import { Router, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { z } from 'zod';

const prisma = new PrismaClient();
const router = Router();

// const Todo = z.object({
//   tid: z.number().int(), // Ensure tid is an integer
//   id: z.string(), // Assuming id is a string or a Date string
//   task: z.string().min(1), // Ensure task is a non-empty string
//   complete: z.boolean(), // Boolean indicating task completion
// });

// for testing purpose only
router.get("/", (req: Request, res: Response) => {
  res.send("hey you are update");
});




// function to mark task complete 
async function markTaskAsComplete(tid: number) {
  try {
    const updatedTodo = await prisma.todo.update({
      where: {
        tid,
      },
      data: {
        complete: true,
      },
    });

    console.log("Task marked as complete:", updatedTodo);
    return updatedTodo;
  } catch (err: any) {
    if (err.code === "P2025") {
      console.error("Task not found:", err);
      throw new Error(`Task with ID ${tid} not found.`);
    }
    console.error("Error updating task:", err);
    throw err;
  }
}
//router to mark complete 

router.put("/update/complete", async (req: Request, res: Response) => {
  try {
    const { tid } = req.body; // Extract tid from the request body

   

    const updatedTodo = await markTaskAsComplete(tid);
    res.status(200).json(updatedTodo);
  } catch (err: any) {
    res.status(400).json({ error: err.message || "Failed to update task" });
  }
});


// Route to delete todos
router.delete("/delete/:tid", async (req: Request, res: Response) => {
  const { tid } = req.params;

 
  try {
    const deletedTodo = await prisma.todo.delete({
      where: {
        tid: Number(tid), // Delete by 'tid' (integer)
      },
    });
    res.status(200).json({ message: "Todo deleted successfully!" });
  } catch (err) {
    console.error("Unable to delete Todo:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});



export default router;