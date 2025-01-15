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
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
function insertUser(email, password, fname, lname) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const res = yield prisma.nikhil.create({
                data: {
                    email,
                    password,
                    firstName: fname,
                    lastName: lname,
                },
                select: {
                    id: true,
                    password: true,
                    firstName: true,
                    lastName: true,
                },
            });
            console.log("Inserted User:", res);
        }
        catch (err) {
            console.error("Error inserting user:", err);
        }
    });
}
function updateUser(email_1, _a) {
    return __awaiter(this, arguments, void 0, function* (email, { firstName, lastName }) {
        try {
            const res = yield prisma.nikhil.update({
                where: { email },
                data: {
                    firstName,
                    lastName,
                },
            });
            console.log("Updated User:", res);
        }
        catch (err) {
            console.error("Error updating user:", err);
        }
    });
}
updateUser("nikhil2@gmail.com", {
    firstName: "nikhil2",
    lastName: "achale2",
});
