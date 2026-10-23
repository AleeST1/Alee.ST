// Edite aqui. progresso = estimativa manual (0 a 100). Em cada etapa, s = ok (concluída) | go (em andamento) | next (próxima) | wait (planejada)
const PROJETOS=[
{id:"erp-construcao",nome:"ERP para Material de Construção",resumo:"ERP educativo para uma empresa de material de construção. Foco atual: banco de dados.",desc:"O foco atual é construir a base de dados do sistema. Neste momento, a estruturação das tabelas está em andamento; módulos e funcionalidades ainda não devem ser considerados concluídos.",progresso:10,techs:["Python","MySQL","SQL"],plataforma:"Desktop",statusTxt:"Tabelas do banco em andamento",
etapas:[{n:"Estruturação das tabelas do banco de dados",s:"go"},{n:"Relacionamentos e integridade dos dados",s:"next"},{n:"Implementação das operações e regras de negócio",s:"wait"},{n:"Desenvolvimento dos módulos do ERP",s:"wait"},{n:"Testes, ajustes e demonstração",s:"wait"}],
demo:"#",download:"#",video:""}
];
const pct=p=>p.progresso;
const st=v=>v>=100?["ok","Concluído"]:v>0?["go","Em andamento"]:["wait","Planejado"];
const badge=p=>{const s=st(pct(p));return `<span class="badge ${s[0]}">${s[1]}</span>`};
const bar=(p,v=pct(p))=>`<div class="bar"><span style="width:${v}%"></span></div><small class="pc">${v}% concluído</small>`;
