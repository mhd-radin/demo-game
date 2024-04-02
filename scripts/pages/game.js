ws.SCRIPT_GAME_PAGE = new Script(function() {
  let player = new Player();
  let myPlayer = player;
  player.x = ID(2);
  player.y = ID(2);
  player.assetName = 'skiber.move';
  console.log(player)

  var joy = new Joystick(110, innerHeight - 110);
  joy.radius = app.height / 15;
  joy.joyRadius = joy.radius / 2.5;
  //joy.x = (joy.radius + 10);
  //joy.y = (app.height - (joy.radius + 10))
  joy._eventEmitter.on('update', function(e) {
    player.rotation = e.angleRadi;
    player.speed = 1+ (e.distanceJoy / 2000)
  })

  class Bullet {
    x = 0;
    y = 0;
  }

  let allPlayers = [];

  for (var i = 0; i < 14; i++) {
    var pl = new Player();
    pl.x = ID(2);
    pl.y = ID(2);
    pl.assetName = ['skiber', 'woober', 'fighter'][Math.floor(Math.random() * 3)] + '.move'
    allPlayers.push(pl);
    pl.speed = Math.random();
  }

  allPlayers.push(player)

  allPlayers.forEach(function(player = new Player(), i) {
    var currentFrame = player.currentFrame;
    var img = createImageByAsset(getVehicleAssetByName(player.assetName));

    img.onchange = function() {
      currentFrame = 1;
    }

    var thisPlayer = (player.id == myPlayer.id ? player : false)

    var playerEntity = new ClassicEntity().send();
    playerEntity.fixed = false;
    if (thisPlayer != false) {
      playerEntity.update = function() {
        app.cameraX = thisPlayer.x;
        app.cameraY = thisPlayer.y;
      }
    }

    playerEntity.render = function() {
      var asset = getVehicleAssetByName(player.assetName);

      player.x += Math.cos(player.rotation) * player.speed;
      player.y += Math.sin(player.rotation) * player.speed;
      player.assetName = (player.speed >= (2)) ? player.vehicle + '.boost' : player.vehicle + '.move'
     // player.speed = (player.assetName == player.vehicle + '.move') ? (Math.random()) : Math.random() / 5;

      //if (thisPlayer) {thisPlayer.speed = document.getElementById('speed').value ;
      //thisPlayer.rotation = document.getElementById('angle').value / 100}

      img.src = asset.path;
      ctx.translate(player.x, player.y)
      ctx.rotate(player.rotation);
      var assetX = asset.w * currentFrame,
        assetY = asset.y;

      currentFrame += 1;
      currentFrame = (currentFrame % asset.frames);
      ctx.drawImage(img, assetX, assetY, asset.w, asset.h, (-100 / 2), (-100 / 2), 100, 100)
    }
  })
})