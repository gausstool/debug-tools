import{l as c}from"./localforage-CGe3eqvl.js";import{d as u,i as p,k as g,c as _,f as E,o as h}from"./index-DXuaxIZY.js";import{c as i,a as v,b as C,d as I,f as S,g as y,e as r,h as w}from"./console-B5reItix.js";const D={class:"page-editor-diff",id:"editor-diff"},M=`// 粘贴需要进行比对的代码
void main() {
  printf("hello, world");
}
`,V=`// 粘贴需要进行比对的代码
function main() { 
  console.log("Hello World!"); 
}
`,j=u({__name:"PageEditorDiff",setup(k){const t=i("","javascript"),a=i("","javascript"),s=v(),n=C(s);n.setModel({original:t,modified:a});const d=E();async function l(){const e=t.getValue(),o=a.getValue();await c.setItem(`code-tools-${String(d.name)}`,{code1:e,code2:o}),r.addConsole("	[INFO]	Save Success")}async function f(){await c.getItem(`code-tools-${String(d.name)}`).then(e=>{const{code1:o="",code2:m=""}=e||{};t.setValue(o||M),a.setValue(m||V)}),r.addConsole("	[INFO]	Fetch Success")}return I(n,async()=>{l()}),p(async()=>{w(n),S(document.getElementById("editor-diff"),s),await f()}),g(()=>{y()}),(e,o)=>(h(),_("div",D))}});export{j as default};
