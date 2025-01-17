import { z } from 'zod';

// Define the Todo schema using Zod
const Todo = z.object({
    tid: z.number().int(), // Ensure tid is an integer
    id: z.string(), // Assuming id is a string or a Date string
    task: z.string().min(1), // Ensure task is a non-empty string
    complete: z.boolean(), // Boolean indicating task completion
});

// Type for a valid Todo object
type TodoType = z.infer<typeof Todo>;

export { Todo, TodoType };