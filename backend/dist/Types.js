"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Todo = void 0;
const zod_1 = require("zod");
const Todo = zod_1.z.object({
    tid: zod_1.z.number().int(),
    id: zod_1.z.string(),
    task: zod_1.z.string().min(1),
    complete: zod_1.z.boolean(),
});
exports.Todo = Todo;
