var scriptsToLoad = [
  
]

app.use.loader(scriptsToLoad, {
  onloadfile: ws.EVENT_ON_FILE_LOADS,
  onfinish: ws.EVENT_ON_FILE_LOAD_FINSHED,
})