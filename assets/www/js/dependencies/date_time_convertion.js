(function (Date) {

    var isoDateExpression = /^(\d{4}|[+\-]\d{6})(?:\-(\d{2})(?:\-(\d{2})(?:T(\d{2}):(\d{2})(?::(\d{2})(?:\.(\d{3}))?)?(Z|(?:([\-\+])(\d{2}):(\d{2})))?)?)?)?$/,
        monthes = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334, 365];

    function dayFromMonth(year, month) {
      var t = month > 1 ? 1 : 0;
      return monthes[month] + Math.floor((year - 1969 + t) / 4) - Math.floor((year - 1901 + t) / 100) + Math.floor((year - 1601 + t) / 400) + 365 * (year - 1970);
    }

    function toISOString(t) {

      t = Number(t);
      t -= t % 1; // ToInteger
      if (!(-8.64e15 <= t && t <= 8.64e15)) { // isFinite(t) && |t| < 8.64e15
        throw new RangeError();
      }

      var timePart = (t % 86400000 + 86400000) % 86400000,
          milliseconds = timePart % 1000,
          seconds = Math.floor(timePart / 1000) % 60,
          minutes = Math.floor(timePart / 60000) % 60,
          hours = Math.floor(timePart / 3600000) % 24,
          year,
          month,
          date,
          yearString,
          tmp;

      t = Math.floor(t / 86400000);
      year = Math.floor(t / 365.2425) + 1970 - 1;
      // this circle will iterate no more than 2 times
      while (dayFromMonth(year + 1, 0) <= t) {
        year += 1;
      }

      month = Math.floor((t - dayFromMonth(year, 0)) / 30.42);// 30.42 > 365 / 12 = max(day / month(day)) for any day
      while (dayFromMonth(year, month + 1) <= t) {
        month += 1;
      }

      date = 1 + t - dayFromMonth(year, month);

      yearString = String(year < 0 ? -year : year);
      tmp = (year < 0 ? 6 : (year < 1e4 ? 4 : 6)) - yearString.length;
      while (tmp > 0) {
        yearString = '0' + yearString;
        tmp -= 1;
      }
      month += 1;
      return (year < 0 ? '-' : (year < 1e4 ? '' : '+')) + yearString + '-' +
        (month < 10 ? '0' : '') + month + '-' +
        (date < 10 ? '0' : '') + date + 'T' +
        (hours < 10 ? '0' : '') + hours + ':' +
        (minutes < 10 ? '0' : '') + minutes + ':' +
        (seconds < 10 ? '0' : '') + seconds + '.' +
        (milliseconds < 100 ? (milliseconds < 10 ? '00' : '0') : '') + milliseconds + 'Z';
    }

    function fromISOString(string) {
      var match = isoDateExpression.exec(string);
      if (match) {
        // parse months, days, hours, minutes, seconds, and milliseconds
        // provide default values if necessary
        // parse the UTC offset component
        var year = Number(match[1]),
            month = Number(match[2] || 1) - 1,
            day = Number(match[3] || 1) - 1,
            hour = Number(match[4] || 0),
            minute = Number(match[5] || 0),
            second = Number(match[6] || 0),
            millisecond = Number(match[7] || 0),
            // When time zone is missed, local offset should be used (ES 5.1 bug)
            // see https://bugs.ecmascript.org/show_bug.cgi?id=112
            offset = !match[4] || match[8] ? 0 : Number(new Date(1970, 0)),
            signOffset = match[9] === "-" ? 1 : -1,
            hourOffset = Number(match[10] || 0),
            minuteOffset = Number(match[11] || 0),
            result;
        if (hour < (minute > 0 || second > 0 || millisecond > 0 ? 24 : 25) && 
            minute < 60 && second < 60 && millisecond < 1000 && 
            month > -1 && month < 12 && hourOffset < 24 && minuteOffset < 60 && // detect invalid offsets
            day > -1 && day < dayFromMonth(year, month + 1) - dayFromMonth(year, month)) {
          result = ((dayFromMonth(year, month) + day) * 24 + hour + hourOffset * signOffset) * 60;
          result = ((result + minute + minuteOffset * signOffset) * 60 + second) * 1000 + millisecond + offset;
          if (-8.64e15 <= result && result <= 8.64e15) {
            return result;
          }
        }
      }
      return NaN;
    };

    Date.toISOString = toISOString;
    Date.fromISOString = fromISOString;

    // avoid using this functions
    //Date.parse = null;
    //Date.prototype.getYear = null;
    //Date.prototype.setYear = null;

    //Date.prototype.toISOString = function (x) {
    //  return toISOString.call(null, this, x);
    //};

  }(Date));
