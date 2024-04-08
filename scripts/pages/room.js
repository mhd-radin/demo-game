ws.SCRIPT_ROOM_PAGE = new Script(function() {
  var versionTxt = new ClassicEntity().send();
  versionTxt.render = function() {
    ctx.fillStyle = '#fff';
    ctx.font = '15px gamefont'
    ctx.fillText('Version ' + ws.VERSION, 20, 25);
    ctx.fillText(navigator.onLine ? 'Online' : 'Offline', 20, 45)
  }

  var opacityOfLoad = 0;
  var opacityUp = true;
  var dotUp = 1

  var playersText = new ClassicEntity().send();
  playersText.render = function() {
    ctx.fillStyle = '#fff';
    ctx.font = '15px gamefont'
    ctx.fillText('Players Joined', (window.innerWidth / 2) - 45, (innerHeight / 2) - 50);
    ctx.font = '35px gamefont'
    ctx.fillText('6 / 15', (window.innerWidth / 2) - 40, (innerHeight / 2));

    if (opacityUp) {
      opacityOfLoad += 0.01;
      if (opacityOfLoad >= 1) opacityUp = false
    } else {
      opacityOfLoad -= 0.01;
      if (opacityOfLoad <= 0) opacityUp = true
    }

    const loadMsg = 'Please Wait, Players are Joining...'

    ctx.globalAlpha = opacityOfLoad;
    ctx.font = '14px gamefont'
    ctx.fillText(loadMsg, innerWidth - 250, innerHeight - 18)
  }

  function nextPage() {
    versionTxt.destroyIt();
    playersText.destroyIt();


    app.connectScript(ws.PATH_PAGES + 'game.js').onload = function() {
      app.connectScript(ws.PATH_PAGES + 'game_ui.js').onload = function() {
        ws.SCRIPT_GAME_PAGE.run();
      }
    }
  }

  setTimeout(function() {
    nextPage();
  }, 2000)
})