var scriptsToLoad = [
  ws.PATH_METHODS+'assetManagement.js',
  ws.PATH_CLASSES+'ui/joystick.js',
];

app.use.loader(scriptsToLoad, {
  onloadfile: ws.EVENT_ON_FILE_LOADS,
  onfinish: ws.EVENT_ON_FILE_LOAD_FINSHED,
})
