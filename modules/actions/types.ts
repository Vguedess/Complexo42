export type TaskStatus = "A fazer" | "Em execução" | "Em revisão" | "Concluído";
export type Task = { id: number; title: string; team: string; status: TaskStatus; priority: string };
