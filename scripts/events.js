// EventEmitter class to manage events
class EventEmitter {
  constructor() {
    this.events = {};
  }

  // Subscribe to an event
  on(eventName, callback) {
    if (!this.events[eventName]) {
      this.events[eventName] = [];
    }
    this.events[eventName].push(callback);
  }

  // Emit an event
  emit(eventName, data) {
    const eventCallbacks = this.events[eventName];
    if (eventCallbacks) {
      eventCallbacks.forEach(callback => {
        callback(data);
      });
    }
  }

  // Unsubscribe from an event
  off(eventName, callback) {
    const eventCallbacks = this.events[eventName];
    if (eventCallbacks) {
      this.events[eventName] = eventCallbacks.filter(cb => cb !== callback);
    }
  }
}

var emitter = (app.events = new EventEmitter());
const EventController = emitter;

c.addEventListener("touchstart", function (e) {
  var x = e.touches[0].clientX;
  var y = e.touches[0].clientY;
  e.x = x;
  e.y = y;

  emitter.emit("ts", e);
});

c.addEventListener("touchmove", function (e) {
  var x = e.changedTouches[0].clientX;
  var y = e.changedTouches[0].clientY;
  e.x = x;
  e.y = y;

  emitter.emit("tm", e);
});

c.addEventListener("touchend", function (e) {
  var x = e.changedTouches[0].clientX;
  var y = e.changedTouches[0].clientY;
  e.x = x;
  e.y = y;

  emitter.emit("te", e);
});
