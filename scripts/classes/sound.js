class Sound {
  constructor (src){
    this.elem = document.createElement('audio');
    this.elem.src = src;
    this.elem.autoplay = true;
  }
  setSrc(x){
    this.elem.src = x;
  }
  getSrc(){
    return this.elem.src;
  }
  play(){
    this.elem.load();
  }
  stop(){
    this.elem.pause();
  }
}
