/*import { getDatabase, ref, set, child, update, remove, onValue } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-database.js";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBikQJIeX6-hLtuWBPUfIDTVNi0p8fEw4Y",
  authDomain: "raceup-2023.firebaseapp.com",
  databaseURL: "https://raceup-2023-default-rtdb.firebaseio.com",
  projectId: "raceup-2023",
  storageBucket: "raceup-2023.appspot.com",
  messagingSenderId: "224338110022",
  appId: "1:224338110022:web:959b93716b912a38884c47",
  measurementId: "G-CN8JFY7Z7C"
};


*/

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
    },
    loader(pathArr = [], opt = {
      onfinish: () => {},
      onloadfile: ()=>{}
    }) {

      if (pathArr.length == 0) throw "parameter 'pathArr' is undefined";
      var loadIndex = 0;

      function load(path) {

        app.connectScript(path).onload = function() {
          // new file loaded
          loadIndex += 1;
          if (opt.onloadfile instanceof Function || typeof opt.onloadfile == 'function') opt.onloadfile({
            path,
            loadIndex
          });
          if (pathArr[loadIndex]) {
            load(pathArr[loadIndex]);
          }
          if (loadIndex == (pathArr.length - 1)) {
            // finshid
            if (opt.onfinish instanceof Function || typeof opt.onfinish == 'function') opt.onfinish();
          }
        }
      }

      load(pathArr[loadIndex]);
    }
  },
  time: {
    pastSec: Date.now(),
    nowSec: Date.now(),
    dt: 0.03,
  },
  events: {

  },
  log(msg) {
    document.getElementById('log').innerHTML = msg;
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

    setInterval(function() {
      window.requestAnimationFrame(ws.UPDATE_APP);
    }, (1000 / 45));
  },
  update() {
    app.time.nowSec = performance.now();

    ws.APP.fillscreen();
    ctx.scale(app.scale, app.scale);
    ctx.save();

    ctx.clearRect(0, 0, ws.APP.width, ws.APP.height)

    var subX = (ws.APP.cameraX) //* ws.APP.scale;
    //scale)
    var subY = (ws.APP.cameraY) //* ws.APP.scale;
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

    app.time.pastSec = performance.now();
    app.time.dt = (app.time.pastSec - app.time.nowSec)
  },
  connectScript(srcURL) {
    var script = document.createElement('script');
    script.src = srcURL;
    document.body.appendChild(script);
    return script;
  },
}

// app.use.loader([
//   'scripts/ws.js',
//   'scripts/events.js',
// ], {
//   onfinish: () => {
//     app.use.loader([
//       ws.PATH_CLASSES + 'common_class.js',
//       ws.PATH_CLASSES + 'player.js',
//       ws.PATH_PAGES + 'home.js'
//   ], {
//       onfinish: () => {
//         app.init();
//         ws.SCRIPT_HOME_PAGE.run();
//       }
//     })
//   }
// })

app.connectScript('scripts/ws.js').onload = function() {
  app.connectScript('scripts/events.js').onload = function() {
    app.connectScript(ws.PATH_CLASSES + 'common_class.js').onload = () => {
      app.connectScript(ws.PATH_CLASSES + 'player.js').onload = () => {
        app.connectScript(ws.PATH_PAGES + 'home.js').onload = function() {
          app.connectScript('scripts/methods/connectCommonScripts.js').onload = function() {
            app.init();
            ws.SCRIPT_HOME_PAGE.run();
          }
        }
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

  window.onclick = function() {}
}