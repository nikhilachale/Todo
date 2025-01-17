import { Router, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { z } from 'zod';
const prisma = new PrismaClient();
const router = Router();


const Todo = z.object({
    tid: z.number().int(), // Ensure tid is an integer
    id: z.string(), // Assuming id is a string or a Date string
    task: z.string().min(1), // Ensure task is a non-empty string
    complete: z.boolean(), // Boolean indicating task completion
  });
  

  // for testing purpose only
  router.get("/", (req: Request, res: Response) => {
    res.send("hey you are update");
  });
  
  
  router.post("/true", async (req: Request, res: Response) => {
    const { tid } = req.body;
    try {
      const updatedTodo = await markTaskAsComplete(tid);
      console.log("Result:", updatedTodo);
      res.status(200).json(updatedTodo);
    } catch (err) {
      console.error("Unable to update Todo:", err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });


  // Route to delete todos 
  router.post("/delete", async (req: Request, res: Response) => {
    const { tid } = req.body;
    try {
      const deletedTodo = await deleteTask(tid);
      console.log("Result:", deletedTodo);
      res.status(200).json(deletedTodo);
    } catch (err) {
      console.error("Unable to delete Todo:", err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });


  // Function to update data 
async function markTaskAsComplete(tid: number) {
    try {
      const updatedTodo = await prisma.todo.update({
        where: {
          tid: tid, // The primary key of the task to update
        },
        data: {
          complete: true, // Update the 'complete' field to true
        },
      });
  
      console.log("Task marked as complete:", updatedTodo);
      return updatedTodo; // Return the updated Todo to the caller
    } catch (err) {
      console.error("Error updating task:", err);
      throw err;
    }
  }



// Function to delete a task 
async function deleteTask(tid: number) {
    try {
      const deletedTodo = await prisma.todo.delete({
        where: {
          tid: tid, // The primary key of the task to delete
        },
      });
  
      console.log("Task deleted:", deletedTodo);
      return deletedTodo; // Return the deleted Todo
    } catch (err) {
      console.error("Error deleting task:", err);
      throw err; // Re-throw error
    }
  }
  


  export default router;