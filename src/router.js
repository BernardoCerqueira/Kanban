import { Router } from "express";
import prisma from "./prisma/database.js";

const router = Router();

//Implementar rotas
//Criar controller

router.get("/tasks", async (req, res) => {
    const tasks = await prisma.tasks.findMany()
    res.json(tasks)
})

router.get("/tasks/:taskId", async (req, res) => {
    const task = await prisma.tasks.findUnique({
        where: {id: req.params.taskId}
    })
    res.json(task)
})

router.post("/tasks", async (req, res) => {
    const id = String(Math.round(Math.random() * 100000000))
    const {title, description, priority, status} = req.body
    const newTask = await prisma.tasks.create({
        data: {
            id,
            title,
            description,
            priority,
            status,
        }
    })
    res.json(newTask)
})

router.delete("/tasks/:taskId", async (req, res) => {
    const {taskId} = req.params
    await prisma.tasks.delete({
        where: {id: taskId}
    })
})

router.patch("/tasks/:taskId", async (req, res) => {
    const {taskId} = req.params
    const {title, description, status, priority} = req.body

    try {
        const updatedTask = await prisma.tasks.update({
            where: {id: taskId},
            data: {
                status
            }
        })
        res.json(updatedTask)
    } catch (error) {
        res.status(500).json({error: "Erro ao atualizar a tarefa."})
    }
})

export default router