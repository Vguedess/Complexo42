import type { Task, TaskStatus } from "./types";

export const statuses: readonly TaskStatus[] = ["A fazer", "Em execução", "Em revisão", "Concluído"];

/** Regra pura: avance a tarefa da demonstração sem mutar seu estado anterior. */
export function advanceTask(tasks: readonly Task[], taskId: number): Task[] {
 return tasks.map((task) => {
   if (task.id !== taskId) return task;
   const current = statuses.indexOf(task.status);
   const next = statuses[Math.min(current + 1, statuses.length - 1)];
   return {...task, status: next};
 });
}
