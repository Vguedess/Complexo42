import test from "node:test";
import assert from "node:assert/strict";
import { advanceTask, statuses } from "./workflow.ts";

const sample = [{id:1,title:"Exemplo",team:"Time",status:"A fazer",priority:"Alta"}];
test("tasks advance one phase without mutating previous state", () => {
 const updated=advanceTask(sample,1);
 assert.equal(updated[0].status,"Em execução");
 assert.equal(sample[0].status,"A fazer");
 assert.notEqual(updated,sample);
});
test("completed tasks remain completed", () => {
 const completed=[{...sample[0],status:"Concluído"}];
 assert.equal(advanceTask(completed,1)[0].status,"Concluído");
});
test("unknown task id does not change other tasks", () => {
 assert.deepEqual(advanceTask(sample,999),sample);
});
test("workflow stages are explicitly ordered", () => {
 assert.deepEqual([...statuses],["A fazer","Em execução","Em revisão","Concluído"]);
});
