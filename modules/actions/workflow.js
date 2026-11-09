export const statuses = ["A fazer", "Em execução", "Em revisão", "Concluído"];

/** Regra pura: avance a tarefa da demonstração sem mutar seu estado anterior. */
export function advanceTask(tasks, taskId) {
 return tasks.map((task) => {
   if (task.id !== taskId) return task;
   const current = statuses.indexOf(task.status);
   const next = statuses[Math.min(current + 1, statuses.length - 1)];
   return {...task, status: next};
 });
}
