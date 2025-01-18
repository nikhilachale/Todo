"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const client_1 = require("@prisma/client");
const zod_1 = require("zod");
const prisma = new client_1.PrismaClient();
const router = (0, express_1.Router)();
const Todo = zod_1.z.object({
    tid: zod_1.z.number().optional(),
    id: zod_1.z.string(),
    task: zod_1.z.string().min(1),
    complete: zod_1.z.boolean(),
});
router.get("/", (req, res) => {
    res.send("You are in the add route now!");
});
router.post("/todos", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, task, complete } = req.body;
    try {
        const newTodo = yield insertTodo(id, task, complete);
        res.status(201).json(newTodo);
    }
    catch (err) {
        console.error("Error in /todos POST:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
}));
router.get("/todos", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const todos = yield prisma.todo.findMany();
        res.json(todos);
    }
    catch (err) {
        console.error("Unable to fetch Todos:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
}));
function insertTodo(id, task, complete) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const newTodo = yield prisma.todo.create({
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
        }
        catch (err) {
            console.error("Unable to insert into the database:", err);
            throw err;
        }
    });
}
exports.default = router;
