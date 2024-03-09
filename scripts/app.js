let c = document.getElementById('c');
let ctx = new OffscreenCanvas(100, 10).getContext('2d')
ctx = c.getContext('2d');

let app = {
  width: 0,
  height: 0,
  scale: 1,
  cameraX: 0,
  cameraY: 0,
  classicStore: [],
  use: {
    isPointInsideBBox(bbox, pointData = { x: 0, y: 0 }) {
      var x = pointData.x,
        y = pointData.y;
      var data = bbox;

      if (data.x < x && (data.x + data.width) > x && data.y > y && (data.y + data.height) > y) {
        return true;
      } else {
        return false;
      }

      console.log(bbox, x, y)
    },
    defaultContextUseBy(callback) {
      ctx.restore();
      callback();
      ctx.save();
    },
    css(CSS_String) {
      var style = document.createElement('style');
      style.innerHTML = CSS_String;
      document.head.appendChild(style);
    }
  },
  events: {

  },
  fillscreen() {
    c.width = innerWidth * this.scale;
    c.height = innerHeight * this.scale;

    this.width = c.width;
    this.height = c.height;
  },
  init() {
    this.scale = 2
    this.fillscreen();
    ctx.scale(app.scale, app.scale);
    ctx.save();
    this.update();
  },
  update() {
    ws.APP.fillscreen();
    ctx.scale(app.scale, app.scale);
    ctx.save();

    ctx.clearRect(0, 0, ws.APP.width, ws.APP.height)

    var subX = (ws.APP.cameraX) * ws.APP.scale;
    //scale)
    var subY = (ws.APP.cameraY) * ws.APP.scale;
    //*scale)

    var cameraX = (-(subX - (innerWidth / 2)));
    var cameraY = (-(subY - (innerHeight / 2)));

    var classicStore = ws.STORE_CLASSIC_ENTITY;
    for (var i = 0; i < classicStore.length; i++) {
      var classicEntity = classicStore[i];
      classicEntity.update();

      if (classicEntity.render) {
        ctx.save();
        if (classicEntity.fixed == false) {
          //console.log('This Element not fixed ID -> '+classicEntity.id, ws.APP.cameraX)
          ctx.translate(cameraX, cameraY)
        }
        classicEntity.render();
        ctx.restore();
      }
    }
    window.requestAnimationFrame(ws.UPDATE_APP);
  },
  connectScript(srcURL) {
    var script = document.createElement('script');
    script.src = srcURL;
    document.body.appendChild(script);
    return script;
  },
}


app.connectScript('scripts/ws.js').onload = function() {
  app.connectScript('scripts/events.js').onload = function() {
    app.connectScript(ws.PATH_CLASSES + 'common_class.js').onload = () => {
      app.connectScript(ws.PATH_PAGES + 'home.js').onload = function() {
        app.init();
        ws.SCRIPT_HOME_PAGE.run();
      }
    }
  }
}

window.onclick = function() {
  var elem = document.querySelector('html');

  function openFullscreen() {
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.webkitRequestFullscreen) {
      /* Safari */
      elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) {
      /* IE11 */
      elem.msRequestFullscreen();
    }
  }
  
  openFullscreen()
  
  if (screen.orientation.lock) {
    screen.orientation.lock('landscape')
  }
  
  window.onclick = function (){}
}