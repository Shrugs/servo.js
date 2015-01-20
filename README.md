
# servo.js

Servo object for use with mraa on Intel IoT devices.

## Example

```javascript
var Servo = require('servo.js');

var myServo = new Servo(3); // pin
myServo.write(90); //degrees

```

## Usage

You can also configure the servo object with min/max pulse size, min/max angle, speed, and the like. Check the code.