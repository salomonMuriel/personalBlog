#!/usr/bin/env python3
import os, re, html, json
D = "/Users/salomonmuriel/git/personalBlog/design-directions"

META = {
 1:("Ola 1","El Historial","claro*"), 2:("Ola 1","El Parte de la Semana","claro*"),
 3:("Ola 1","El Taller","claro*"), 4:("Ola 1","La Carta","claro*"),
 5:("Ola 2","El Expediente","claro"), 6:("Ola 2","La cuenta","claro"), 7:("Ola 2","El mensaje ya escrito","claro"),
 8:("Ola 2","El Diagnóstico","oscuro"), 9:("Ola 2","El Diagnóstico (instrumento)","oscuro"), 10:("Ola 2","El filtro","oscuro"),
 11:("Ola 3","Schwartz · consciencia + mecanismo","claro"), 12:("Ola 3","Dunford · Sales Pitch","oscuro"),
 13:("Ola 3","StoryBrand SB7","claro"), 14:("Ola 3","Jobs To Be Done · 4 fuerzas","oscuro"),
 15:("Ola 4","VSL · Chinomático","oscuro"), 16:("Ola 4","Carta de venta larga","claro"),
 17:("Ola 4","Embudo de aplicación","oscuro"), 18:("Ola 4","Servicio productizado","claro"),
 19:("Ola 4","Diagnóstico gratuito","claro"), 20:("Ola 4","Caso de estudio","oscuro"),
 21:("Ola 5","impeccable · libre","—"), 22:("Ola 5","ui-ux-pro-max · libre","—"),
 23:("Ola 5","brutalist · libre","—"), 24:("Ola 5","minimalist · libre","—"),
 25:("Ola 5","impeccable · VSL","—"), 26:("Ola 5","ui-ux-pro-max · StoryBrand","—"),
 27:("Ola 5","taste · Schwartz","—"), 28:("Ola 5","taste · carta directa","—"),
 29:("Ola 6","BAB · con testimonios","—"),
 30:("Ola 7","brutalist v2","—"), 31:("Ola 7","impeccable v2","—"),
 32:("Ola 7","ui-ux-pro-max v2","—"), 33:("Ola 7","taste v2","—"),
 34:("Ola 7","minimalist v2","—"),
 35:("Ola 8","30 refinada · tema propio","—"), 36:("Ola 8","30 refinada · tema de 'Parte'","—"),
}
WAVE_DESC = {
 "Ola 1":"Estructura compartida (sesgada por mí)",
 "Ola 2":"Estructura propia, semillas mías",
 "Ola 3":"Marcos de copy probados",
 "Ola 4":"Arquetipos de embudo",
 "Ola 5":"Sin guía · una skill distinta c/u",
 "Ola 6":"Before-After-Bridge · espacios de testimonio",
 "Ola 7":"Chinomático v2 · con tus correcciones",
 "Ola 8":"Solo consultoría · tus correcciones detalladas",
}

items=[]
for n in sorted(META):
    f = f"direction-{n}.html"
    p = os.path.join(D,f)
    if not os.path.exists(p): continue
    head = open(p, encoding="utf-8", errors="ignore").read(9000)
    m = re.search(r"<title>(.*?)</title>", head, re.S|re.I)
    title = html.unescape(re.sub(r"\s+"," ",m.group(1)).strip()) if m else f
    wave, label, theme = META[n]
    items.append({"n":n,"file":f,"title":title,"wave":wave,"label":label,"theme":theme,
                  "lines":sum(1 for _ in open(p,encoding="utf-8",errors="ignore"))})

data = json.dumps(items, ensure_ascii=False)
waves = json.dumps(WAVE_DESC, ensure_ascii=False)

out = """<!doctype html>
<html lang="es"><head><meta charset="utf-8"><title>Direcciones · salomonmuriel.com</title>
<style>
:root{color-scheme:dark;--bg:#111214;--rail:#191b1e;--line:#2a2d31;--tx:#e7e7e4;--dim:#8d9096;--acc:#e2643c}
*{box-sizing:border-box}
html,body{margin:0;height:100%}
body{background:var(--bg);color:var(--tx);font:13px/1.4 ui-sans-serif,system-ui,-apple-system,"Segoe UI",sans-serif;display:flex;overflow:hidden}
#rail{width:250px;flex:none;background:var(--rail);border-right:1px solid var(--line);display:flex;flex-direction:column}
#rail h1{font-size:12px;letter-spacing:.02em;margin:0;padding:12px 14px;border-bottom:1px solid var(--line);color:var(--dim);font-weight:600}
#list{overflow-y:auto;flex:1;padding-bottom:8px}
.wv{font-size:10.5px;color:var(--dim);padding:12px 14px 5px;letter-spacing:.06em;text-transform:uppercase}
.wv small{display:block;text-transform:none;letter-spacing:0;opacity:.65;margin-top:2px;font-size:10px}
a.it{display:block;padding:7px 14px;color:var(--tx);text-decoration:none;border-left:2px solid transparent;cursor:pointer}
a.it:hover{background:#1f2226}
a.it.on{background:#232629;border-left-color:var(--acc)}
a.it b{font-weight:600;font-size:12.5px;display:block}
a.it span{color:var(--dim);font-size:10.5px}
#main{flex:1;display:flex;flex-direction:column;min-width:0}
#bar{height:38px;flex:none;display:flex;align-items:center;gap:14px;padding:0 14px;border-bottom:1px solid var(--line);background:var(--rail);font-size:12px}
#bar #now{font-weight:600;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
#bar .k{color:var(--dim);margin-left:auto;white-space:nowrap;font-size:11px}
kbd{background:#2b2e33;border:1px solid #3a3e44;border-radius:3px;padding:1px 5px;font:inherit;font-size:10.5px}
#bar a{color:var(--acc);text-decoration:none}
#stage{flex:1;background:#0b0c0d;display:flex;justify-content:center;overflow:hidden}
iframe{border:0;width:100%;height:100%;background:#fff}
body.mob iframe{width:390px;box-shadow:0 0 0 1px var(--line)}
#empty{margin:auto;color:var(--dim)}
</style></head><body>
<div id="rail"><h1>Direcciones de diseño</h1><div id="list"></div></div>
<div id="main">
  <div id="bar"><span id="now">—</span>
    <span class="k"><kbd>&larr;</kbd><kbd>&rarr;</kbd> cambiar · <kbd>m</kbd> móvil · <a id="tab" href="#" target="_blank">abrir en pestaña &rarr;</a></span>
  </div>
  <div id="stage"><div id="empty">Selecciona una direcci&oacute;n</div></div>
</div>
<script>
const ITEMS=__DATA__, WD=__WAVES__;
let i=0;
const list=document.getElementById('list'), stage=document.getElementById('stage');
let last=null;
ITEMS.forEach((it,ix)=>{
  if(it.wave!==last){last=it.wave;
    const h=document.createElement('div');h.className='wv';
    h.innerHTML=it.wave+'<small>'+(WD[it.wave]||'')+'</small>';list.appendChild(h);}
  const a=document.createElement('a');a.className='it';a.dataset.ix=ix;
  a.innerHTML='<b>'+it.n+'. '+it.label+'</b><span>'+it.theme+' · '+it.lines+' líneas</span>';
  a.onclick=e=>{e.preventDefault();show(ix)};list.appendChild(a);
});
function show(ix){
  i=ix; const it=ITEMS[i];
  document.querySelectorAll('a.it').forEach(el=>el.classList.toggle('on',+el.dataset.ix===i));
  stage.innerHTML='';
  const f=document.createElement('iframe');f.src=it.file;stage.appendChild(f);
  document.getElementById('now').textContent=it.n+'. '+it.label+' — '+it.title;
  document.getElementById('tab').href=it.file;
  const on=document.querySelector('a.it.on'); if(on) on.scrollIntoView({block:'nearest'});
}
addEventListener('keydown',e=>{
  if(e.target.tagName==='INPUT'||e.target.tagName==='TEXTAREA')return;
  if(e.key==='ArrowRight'||e.key===' '){e.preventDefault();show((i+1)%ITEMS.length)}
  else if(e.key==='ArrowLeft'){e.preventDefault();show((i-1+ITEMS.length)%ITEMS.length)}
  else if(e.key==='m'){document.body.classList.toggle('mob')}
  else if(/^[0-9]$/.test(e.key)){const n=e.key==='0'?10:+e.key;const ix=ITEMS.findIndex(x=>x.n===n);if(ix>=0)show(ix)}
});
if(ITEMS.length)show(0);
</script></body></html>"""
out = out.replace("__DATA__", data).replace("__WAVES__", waves)
open(os.path.join(D,"index.html"),"w",encoding="utf-8").write(out)
print(f"hub built with {len(items)} directions: {[x['n'] for x in items]}")
