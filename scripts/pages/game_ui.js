var joy = new Joystick(110, innerHeight - 110);
joy.radius = app.height / 12;
joy.joyRadius = joy.radius / 2.5;

var fireBtn = new TButton('FIRE', innerWidth - 140, innerHeight - 200, 40);
fireBtn.filter = 'brightness(110%)';