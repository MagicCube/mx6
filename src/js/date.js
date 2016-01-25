Date.getDaysInMonth = function(year, month)
{
    switch (month + 1)
    {
        case 2:
            if ((year % 400 === 0) || (year % 4 === 0) && (year % 100 !== 0))
            {
                return 29;
            }
            else
            {
                return 28;
            }
            break;
        case 1:
        case 3:
        case 5:
        case 7:
        case 8:
        case 10:
        case 12:
            return 31;
        default:
            return 30;
    }
};


Date.prototype.addMilliSeconds = function(milliSec)
{
    const ms = this * 1 + milliSec;
    const date = new Date(ms);
    return date;
};

Date.prototype.addSeconds = function(sec)
{
    const ms = this * 1 + sec * 1000;
    const date = new Date(ms);
    return date;
};

Date.prototype.addMinutes = function(min)
{
    return this.addSeconds(min * 60);
};

Date.prototype.addHours = function(hour)
{
    return this.addMinutes(hour * 60);
};

Date.prototype.addDays = function(days)
{
    return this.addHours(days * 24);
};

Date.prototype.addWeeks = function(week)
{
    return this.addDays(week * 7);
};

Date.prototype.addMonths = function(p_months)
{
    var copy = new Date(this * 1);
    var months = copy.getMonth() + 1 + p_months;

    var years = Math.floor(months / 12);

    var year = copy.getFullYear() + years;
    var month = Math.abs(years * 12 - months) % 12;
    var date = copy.getDate();
    var daysInMonth = Date.getDaysInMonth(year, month - 1);

    if (date > daysInMonth)
    {
        date = daysInMonth;
    }

    copy.setDate(1);
    copy.setFullYear(year);
    copy.setMonth(month - 1);
    copy.setDate(date);

    return copy;
};

Date.prototype.addYears = function(year)
{
    var copy = this.addMonths(year * 12);
    return copy;
};
