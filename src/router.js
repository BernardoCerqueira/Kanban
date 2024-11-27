import { Router } from "express";
import prisma from "./prisma/database.js";

const router = Router();

//Implementar rotas
//Criar controller

router.get("/tasks", async (req,res) => {
    const tasks = await prisma.tasks.findMany()
    res.json(tasks)
})

router.post("/tasks", async (req, res) => {
    await prisma.tasks.create({
        data: {
            id: "4",
            title: "Teste",
            description: "Teste",
            status: "todo",
            priority: "low"
        }
    })
})

export default router