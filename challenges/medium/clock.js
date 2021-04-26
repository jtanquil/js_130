// clock.js
// hour, minute variables
// at method: takes hour and minute, sets hour/minute to those values
// add/subtract: takes minutes, adds/subtracts (modulo minutes in hour/hour in day) to current time
// toString: returns string representation of time
class Clock {
  static at(hr = 0, min = 0) {
    return new Clock(hr, min);
  }

  constructor(hour, minute) {
    this.hour = hour;
    this.minute = minute;
  }

  _toTimeString(time) {
    let timeAsStr = String(time);

    return timeAsStr.length === 1 ? `0${timeAsStr}` : timeAsStr;
  }

  toString() {
    return `${this._toTimeString(this.hour)}:${this._toTimeString(this.minute)}`;
  }

  isEqual(clock) {
    return (this.hour === clock.hour) && (this.minute === clock.minute);
  }

  _getDeltas(minutes) {
    return [Math.floor(minutes / 60), minutes % 60];
  }

  add(minutes) {
    let [ hourDelta, minuteDelta ] = this._getDeltas(minutes);
    let newMinuteTotal = (this.minute + minuteDelta) % 60;
    let newHourTotal = [this.hour + Math.floor((this.minute + minuteDelta) / 60) + hourDelta] % 24;

    return Clock.at(newHourTotal, newMinuteTotal);
  }

  subtract(minutes) {
    let [ hourDelta, minuteDelta ] = this._getDeltas(minutes);
    let newMinuteTotal = (this.minute - minuteDelta) % 60;
    let newHourTotal = [this.hour - Math.floor((this.minute + minuteDelta) / 60) - hourDelta] % 24;

    if (newMinuteTotal < 0) {
      newMinuteTotal += 60;
      newHourTotal -= 1;
    }
    
    if (newHourTotal < 0) {
      newHourTotal += 24;
    }

    return Clock.at(newHourTotal, newMinuteTotal);
  }
}

module.exports = Clock;