ws.SCRIPT_HOME_PAGE = new Script(function() {
  var bg = new ClassicEntity().send();

  let mainBgImg = new Image();
  mainBgImg.src = ws.PATH_ASSET_IMAGES + 'bg/space.png';

  bg.render = function() {
    ctx.fillStyle = '#141628'
    //'#17171F' || '#141628'
    ctx.fillRect(0, 0, 1000, 1000)
    //ctx.drawImage(mainBgImg, 0, 0, 960, 540, 0, 0, (960*1.5), (540*1.5));
  }

  let dotsBg = new ClassicEntity().send();

  var playButton = new ClassicEntity().send();
  playButton.update = function() {
    playButton.width = 200;
    playButton.height = 40;
    playButton.x = (window.innerWidth / 2) - (playButton.width / 2)
    playButton.y = (window.innerHeight / 2) - (playButton.height)
    playButton.text = 'PLAY'
  }
  var strokeWidth = 1
  playButton.render = function() {
    strokeWidth >= 5 ? 0 : strokeWidth += 0.3

    var path = new Path2D();

    path.roundRect(playButton.x, playButton.y, playButton.width, playButton.height, Math.PI * 8)
    ctx.fillStyle = '#28769B90'
    ctx.lineWidth = strokeWidth;
    ctx.strokeStyle = '#28769B'
    //ctx.shadowBlur = strokeWidth * 1.2
    ctx.fill(path)
    ctx.stroke(path)

    ctx.font = '18px gamefont'
    ctx.fillStyle = '#fff'
    var tw = ctx.measureText(playButton.text).width
    ctx.fillText(playButton.text, playButton.x + (playButton.width / 2) - (tw / 2),
      playButton.y + (playButton.height / 2) + 7)
  }

  var settingsButton = new ClassicEntity().send();
  settingsButton.update = function() {
    settingsButton.width = 200;
    settingsButton.height = 40;
    settingsButton.x = (window.innerWidth / 2) - (settingsButton.width / 2)
    settingsButton.y = (window.innerHeight / 2) + (settingsButton.height / 3)
    settingsButton.text = 'SETTINGS';
  }

  settingsButton.render = function() {
    var path = new Path2D();

    path.roundRect(settingsButton.x, settingsButton.y, settingsButton.width, settingsButton.height, Math.PI * 8)
    ctx.fillStyle = '#28769B90'
    ctx.lineWidth = strokeWidth;
    ctx.strokeStyle = '#28769B'
    ctx.shadowBlur = strokeWidth * 1.2
    ctx.fill(path)
    ctx.stroke(path)

    ctx.font = '18px gamefont'
    ctx.fillStyle = '#fff'
    var tw = ctx.measureText(settingsButton.text).width
    ctx.fillText(settingsButton.text, settingsButton.x + (settingsButton.width / 2) - (tw / 2),
      settingsButton.y + (settingsButton.height / 2) + 7)
  }



  function toPlay(e) {
    if (app.use.isPointInsideBBox({
        x: (playButton.x),
        y: (playButton.y),
        width: (playButton.width + 0),
        height: (playButton.height + 0),
      }, e)) {
      var timer = setInterval(function() {

        strokeWidth -= 1
        if (strokeWidth <= 0) {
          playButton.destroyIt();
          settingsButton.destroyIt();

          app.connectScript(ws.PATH_PAGES + 'room.js').onload = function() {
            ws.SCRIPT_ROOM_PAGE.run();
          }
          clearInterval(timer)
          EventController.off('te', toPlay)
        }
      }, 10)
    }
  }

  EventController.on('te', toPlay)
})