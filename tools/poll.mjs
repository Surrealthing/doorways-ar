/* wait until the prep page on the debug port says PREP-DONE, then print its log */
const port=process.argv[2]||9335;
for(;;){
  try{
    const j=await (await fetch(`http://127.0.0.1:${port}/json`)).json(); const pg=j.find(x=>x.type==='page'&&x.url.includes('prep'));
    const ws=new WebSocket(pg.webSocketDebuggerUrl); await new Promise(r=>ws.onopen=r);
    const v=await new Promise(r=>{ ws.onmessage=e=>{const m=JSON.parse(e.data); if(m.id===1) r(m.result.result.value);};
      ws.send(JSON.stringify({id:1,method:'Runtime.evaluate',params:{expression:'document.title+" | "+document.getElementById("log").textContent'}})); });
    ws.close();
    if(v.startsWith('PREP-DONE')){ console.log(v); process.exit(0); }
  }catch(e){}
  await new Promise(r=>setTimeout(r,2000));
}
