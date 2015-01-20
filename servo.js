var mraa = require('mraa');

var Servo = function(pin, minPulse, maxPulse) {

    // defaults and stuff
    this.minPulse = minPulse || 544;
    this.maxPulse = maxPulse || 2400;
    this.minAngle = 0;
    this.maxAngle = 180;
    this.period = 20000; // 20ms or 20,000us period
    this.speed = 250/60; // 100ms (0.1s) / 60 degrees
    this.maxDelay = this.maxAngle * this.speed; // 0.3

    // actually create pwm pin and attach
    this.pin = new mraa.Pwm(3);
    this.pin.period_us(this.period);
    this.pin.enable(true);
};

Servo.prototype.write = function(angle) {
    this.pin.write(this.calculatePulse(angle) / this.period);
    console.log(this.calculatePulse(angle));
    var d = this.calculateDelay(angle);
    this.currentAngle = angle;
    return d;
};

Servo.prototype.calculatePulse = function(angle) {
    if (angle > this.maxAngle) {
        return this.maxPulse;
    }
    if (angle < this.minAngle) {
        return this.minPulse;
    }
    // maps angle that's within [0 180] to [minPulse maxPulse]
    return this.minPulse + ((angle / this.maxAngle) * (this.maxPulse - this.minPulse));
};

Servo.prototype.calculateDelay = function(angle) {
    if (this.currentAngle !== undefined) {
        return Math.abs(angle - this.currentAngle) * this.speed;
    } else {
        return this.maxDelay;
    }
};

Servo.prototype.enable = function(en) {
    if (en === undefined) {
        en = true;
    }
    this.pin.enable(en);
};

Servo.prototype.disable = function() {
    this.pin.enable(false);
};

module.exports = Servo;