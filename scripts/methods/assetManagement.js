function getVehicleAssetByName(name = '') {
  	var splitedStr = name.split('.');
  	//console.log(name)
  	return ws.ASSETS.vehicles[splitedStr[0]][splitedStr[1]]
  }
  
  
  function createImageByAsset(asset) {
    var img = new Image();
    img.src = asset.path;
    return img;
  }