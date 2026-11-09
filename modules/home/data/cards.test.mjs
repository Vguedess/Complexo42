import test from "node:test";
import assert from "node:assert/strict";
import {CARD_IDS,demoCard,loadCard} from "./cards.mjs";
test("os módulos ocupam as mesmas posições para todos os papéis",()=>{
 assert.deepEqual(CARD_IDS.map(id=>demoCard("aluno",id).id),CARD_IDS.map(id=>demoCard("professor",id).id));
});
test("o preenchimento muda entre aluno e professor",()=>{
 assert.notEqual(demoCard("aluno","formacao").title,demoCard("professor","formacao").title);
});
test("perfil inválido não concede privilégio",()=>{
 assert.deepEqual(demoCard("admin","formacao"),demoCard("aluno","formacao"));
});
test("somente dados sintéticos são exibidos na prévia",async()=>{
 const c=await loadCard({authenticated:false,role:"visitante"}, "professor", "acoes");
 assert.equal(c.synthetic,true);
 await assert.rejects(loadCard({authenticated:true,role:"professor",userId:"teste"},"aluno","acoes"));
});
