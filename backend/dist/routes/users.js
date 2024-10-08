"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const users_1 = __importDefault(require("../controllers/users"));
const usersRouter = (0, express_1.Router)();
usersRouter.get("/", users_1.default.getAll);
usersRouter.post("/", users_1.default.create);
exports.default = usersRouter;
