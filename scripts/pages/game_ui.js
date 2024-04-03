var joy = new Joystick(110, innerHeight - 110);
joy.radius = app.height / 15;
joy.joyRadius = joy.radius / 2.5;

var properIcon = new Image();
properIcon.src = '/scripts/classes/ui/Property_16x.svg'
//getVehicleAssetByName('skiber.idle').path
//properIcon.onload = () => {
  var properBtn = new IButton(properIcon, 50, 50, 50, 50);
  properBtn.filter = 'brightness(110%)';
//}
