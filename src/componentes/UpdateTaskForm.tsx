import { z } from "zod"
import { useTasks } from "../hooks/useTasks"
import { Badge, Box, Button, Dialog, Flex, RadioGroup, Text, TextArea, TextField } from "@radix-ui/themes"
import { FormEventHandler, useState } from "react"
import { Task } from "../entities/Task"

const UpdateTaskSchema = z.object({
    title: z.string().optional(),
    description: z.string().optional(),
    status: z.enum(["todo", "doing", "done"]).optional(),
    priority: z.enum(["low", "medium", "high"]).optional()
})

type UpdateTaskFormProps = {task: Task}

export const UpdateTaskForm: React.FC<UpdateTaskFormProps> = ({task}) => {
    const {updateTask} = useTasks()

    const [title, setTitle] = useState(task.title)
    const [description, setDescription] = useState(task.description)
    const [status] = useState(task.status)
    const [priority, setPriority] = useState(task.priority)

    const handleSubmit: FormEventHandler<HTMLFormElement> = async (ev) => {
        ev.preventDefault()

        const formData = new FormData(ev.currentTarget)
        const title = formData.get("title")
        const description = formData.get("description")
        const status = formData.get("status")
        const priority = formData.get("priority")

        const updatedTask = UpdateTaskSchema.parse({title, description, status, priority})
        await updateTask(task.id, updatedTask)
    }

    return(
        <Dialog.Root>
            <Dialog.Trigger>
                <Button color={"cyan"} onClick={() => setPriority(task.priority)}>
                    Editar
                </Button>
            </Dialog.Trigger>
            <Dialog.Content maxWidth="32rem">
                <Dialog.Title>Editar Tarefa</Dialog.Title>
                <Dialog.Description size="2" mb="4">
                    Edite a sua tarefa.
                </Dialog.Description>
                <form onSubmit={handleSubmit}>
                    <Flex direction="column" gap="4">

                        <Box maxWidth="32rem">
                            <Box mb="2">
                                <Text as="label" htmlFor="title">Título</Text>
                            </Box>
                            <TextField.Root placeholder="Defina um título" name="title" id="title" autoFocus value={title} onChange={(ev) => setTitle(ev.target.value)} required/>
                        </Box>

                        <Box maxWidth="32rem">
                            <Box mb="2">
                                <Text as="label" htmlFor="description">Descrição</Text>
                            </Box>
                            <TextArea placeholder="Descreva a tarefa" name="description" id="description" value={description} onChange={(ev) => setDescription(ev.target.value)} required />
                        </Box>

                        <Flex gap="8">
                            <Box>
                                <Text as="div" mb="2">Situação</Text>
                                <RadioGroup.Root name="status" defaultValue={status}>
                                    <RadioGroup.Item value="todo">
                                        <Badge color="gray">
                                            Para Fazer
                                        </Badge>
                                    </RadioGroup.Item>
                                    <RadioGroup.Item value="doing">
                                        <Badge color="yellow">
                                            Em Progresso
                                        </Badge>
                                    </RadioGroup.Item>
                                    <RadioGroup.Item value="done">
                                        <Badge color="green">
                                            Concluída
                                        </Badge>
                                    </RadioGroup.Item>
                                </RadioGroup.Root>
                            </Box>
                            <Box>
                                <Text as="div" mb="2">Prioridade</Text>
                                <RadioGroup.Root name="priority" defaultValue={priority}>
                                    <RadioGroup.Item value="low" onClick={() => setPriority("low")}>
                                        <Badge color="sky">
                                            Baixa
                                        </Badge>
                                    </RadioGroup.Item>
                                    <RadioGroup.Item value="medium" onClick={() => setPriority("medium")}>
                                        <Badge color="amber">
                                            Média
                                        </Badge>
                                    </RadioGroup.Item>
                                    <RadioGroup.Item value="high" onClick={() => setPriority("high")}>
                                        <Badge color="tomato">
                                            Alta
                                        </Badge>
                                    </RadioGroup.Item>
                                </RadioGroup.Root>
                            </Box>
                        </Flex>

                        <Flex gap="2" justify="end">
                            <Dialog.Close>
                                <Button color="gray" variant="soft">Cancelar</Button>
                            </Dialog.Close>
                            <Button type="submit">Confirmar</Button>
                        </Flex>
                    </Flex>
                </form>
            </Dialog.Content>
        </Dialog.Root>
    )
}