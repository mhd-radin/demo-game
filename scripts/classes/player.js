class Player {
  constructor() {
    this.id = ID(8);
  }
  x = 0;
  y = 0;
  speed = 1;
  vehicle = "skiber";
  action = "idle";
  _assetName = "skiber.idle";
  //assetName = 'skiber.idle';
  set assetName(name) {
    var splitedStr = name.split(".");
    this.vehicle = splitedStr[0];
    this.action = splitedStr[1];
    this._assetName = this.vehicle + "." + this.action;
  }
  get assetName() {
    return this._assetName;
  }
  rotation = 0;
  _currentFrame = 1;
  set currentFrame(x) {
    var splitedStr = this.assetName.split(".");
    var asset = ws.ASSETS.vehicles[splitedStr[0]][splitedStr[1]];

    if (asset.frames === 1) return (this._currentFrame = 1);
    this._currentFrame = x;
    this._currentFrame = this._currentFrame % asset.frames;
  }
  get currentFrame() {
    return this._currentFrame;
  }
}

var pl = new Player();
pl.assetName = "skiber.move";
pl.currentFrame = 9;
console.log(pl);
