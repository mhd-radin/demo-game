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

  let dotsBgImg = new Image();
  dotsBgImg.src = ws.PATH_ASSET_IMAGES + 'bg/space_fl1.png';

  dotsBg.render = function() {
    ctx.fillStyle = ctx.createPattern(dotsBgImg, 'repeat')
    ctx.fillRect((-1000), (-1000), 10000, 10000);
  }
  dotsBg.fixed = false;

  var playButton = new ClassicEntity().send();
  playButton.update = function() {
    playButton.width = 200;
    playButton.height = 40;
    playButton.x = (window.innerWidth / 2) - (playButton.width / 2)
    playButton.y = (window.innerHeight / 2) - (playButton.height)
  }
  var strokeWidth = 1
  playButton.render = function() {
    strokeWidth >= 5 ? 0 : strokeWidth += 0.3

    var path = new Path2D();

    path.roundRect(playButton.x, playButton.y, playButton.width, playButton.height, Math.PI * 8)
    ctx.fillStyle = '#284A9B'
    ctx.lineWidth = strokeWidth;
    ctx.shadowColor = '#284A9B'
    ctx.shadowBlur = strokeWidth * 1.2
    ctx.fill(path)

    ctx.font = '18px gamefont'
    ctx.fillStyle = '#fff'
    ctx.fillText('PLAY', playButton.x + (playButton.width / 2) - 15,
      playButton.y + (playButton.height / 2) + 7)
  }

  function toPlay(e) {
    if (app.use.isPointInsideBBox({
        x: (playButton.x),
        y: (playButton.y),
        width: (playButton.width + 400),
        height: (playButton.height + 400),
      }, e)) {
      var timer = setInterval(function() {

        strokeWidth -= 1
        if (strokeWidth <= 0) {
          playButton.destroyIt()

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