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
const prisma = new client_1.PrismaClient();
const router = (0, express_1.Router)();
router.get("/", (req, res) => {
    res.send("hey you are update");
});
function markTaskAsComplete(tid) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const updatedTodo = yield prisma.todo.update({
                where: {
                    tid,
                },
                data: {
                    complete: true,
                },
            });
            console.log("Task marked as complete:", updatedTodo);
            return updatedTodo;
        }
        catch (err) {
            if (err.code === "P2025") {
                console.error("Task not found:", err);
                throw new Error(`Task with ID ${tid} not found.`);
            }
            console.error("Error updating task:", err);
            throw err;
        }
    });
}
router.put("/update/complete", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { tid } = req.body;
        const updatedTodo = yield markTaskAsComplete(tid);
        res.status(200).json(updatedTodo);
    }
    catch (err) {
        res.status(400).json({ error: err.message || "Failed to update task" });
    }
}));
router.delete("/delete/:tid", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { tid } = req.params;
    try {
        const deletedTodo = yield prisma.todo.delete({
            where: {
                tid: Number(tid),
            },
        });
        res.status(200).json({ message: "Todo deleted successfully!" });
    }
    catch (err) {
        console.error("Unable to delete Todo:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
}));
exports.default = router;
