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
    tid: zod_1.z.number().int(),
    id: zod_1.z.string(),
    task: zod_1.z.string().min(1),
    complete: zod_1.z.boolean(),
});
router.get("/", (req, res) => {
    res.send("hey you are update");
});
router.post("/true", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { tid } = req.body;
    try {
        const updatedTodo = yield markTaskAsComplete(tid);
        console.log("Result:", updatedTodo);
        res.status(200).json(updatedTodo);
    }
    catch (err) {
        console.error("Unable to update Todo:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
}));
router.post("/delete", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { tid } = req.body;
    try {
        const deletedTodo = yield deleteTask(tid);
        console.log("Result:", deletedTodo);
        res.status(200).json(deletedTodo);
    }
    catch (err) {
        console.error("Unable to delete Todo:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
}));
function markTaskAsComplete(tid) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const updatedTodo = yield prisma.todo.update({
                where: {
                    tid: tid,
                },
                data: {
                    complete: true,
                },
            });
            console.log("Task marked as complete:", updatedTodo);
            return updatedTodo;
        }
        catch (err) {
            console.error("Error updating task:", err);
            throw err;
        }
    });
}
function deleteTask(tid) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const deletedTodo = yield prisma.todo.delete({
                where: {
                    tid: tid,
                },
            });
            console.log("Task deleted:", deletedTodo);
            return deletedTodo;
        }
        catch (err) {
            console.error("Error deleting task:", err);
            throw err;
        }
    });
}
exports.default = router;
