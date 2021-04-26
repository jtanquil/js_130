// Meetup object
// constructor: year, month
// instance method day: weekday (monday, tuesday, etc), schedule (first, second, ... fifth, last, teenth)
// returns the date of the meetup's month corresponding to that day

// constructor: takes year, month
// use year/month to construct a dates property containing date objects corresponding to the year/month

// day
// given a weekday and a schedule,
// filter out the elements of this.dates that correspond to that weekday
// for first - fourth, or last, return the date with the corresponding index
// for fifth, return the date with the corresponding index, null if it doesn't exist
// for teenth, return the element matching day being between 13 and 19

class Meetup {
  static WEEKDAYS = {
    0: "sunday",
    1: "monday",
    2: "tuesday",
    3: "wednesday",
    4: "thursday",
    5: "friday",
    6: "saturday",
  }

  constructor(year, month) {
    this.dates = this._getCalendarMonth(year, month);
  }

  day(weekday, schedule) {
    let possibleWeekdays = this.dates.filter((date) =>
      Meetup.WEEKDAYS[date.getDay()] === weekday.toLowerCase());

    switch (schedule.toLowerCase()) {
      case "first":
        return possibleWeekdays[0];
      case "second":
        return possibleWeekdays[1];
      case "third":
        return possibleWeekdays[2];
      case "fourth":
        return possibleWeekdays[3];
      case "fifth":
        return possibleWeekdays[4] ? possibleWeekdays[4] : null;
      case "last":
        return possibleWeekdays[possibleWeekdays.length - 1];
      case "teenth":
        return possibleWeekdays.find((date) =>
          (date.getDate() >= 13) && (date.getDate() <= 19));
    }
  }

  _getCalendarMonth(year, month) {
    let dates = [];
    let day = 1;

    while (true) {
      let date = new Date(year, month - 1, day);
      
      if (date.getMonth() !== month - 1) break;

      dates.push(date);
      day += 1;
    }

    return dates;
  }
}

module.exports = Meetup;