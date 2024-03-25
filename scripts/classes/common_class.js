class Script {
  constructor(handle) {
    this.handle = handle;
  }

  run() {
    this.handle();
  }
}

function ID(digits = 5) {
  return Math.floor(Math.random() * eval('9E+' + digits));
}

class ClassicEntity {
  constructor() {
    this.id = Math.floor(Math.random() * 999999999)
  }
  x = 0;
  y = 0;
  width = 0;
  height = 0;
  render = true;
  fixed = true;

  render() {

  }
  update() {

  }
  send() {
    ws.STORE_CLASSIC_ENTITY.push(this);
    return this;
  }
  destroyIt() {
    var id = this.id;
    for (var i = 0; i < ws.STORE_CLASSIC_ENTITY.length; i++) {
      if (id == ws.STORE_CLASSIC_ENTITY[i].id) {
        ws.STORE_CLASSIC_ENTITY.splice(i, 1)
      }
    }
  }
}