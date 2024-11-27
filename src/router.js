import { Router } from "express";
import prisma from "./prisma/database.js";

const router = Router()

router.post("/task", async () => {
    await prisma.tasks.create({
        data: {
            id: "2",
            title: "Teste",
            description: "Teste",
            status: "todo",
            priority: "low"
        }
    })
})

//Criar rotas

export default router