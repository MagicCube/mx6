# JavaScript Build-in Object Extensions



## String
### String.includes(substring)
This method determines whether one string may be found within another string, returning true or false as appropriate.
> MXFramework won't do any modification if the current browser supports this method natively.
```js
"".includes("");             // true
"abc".includes("");          // true
"abc".includes("ab");        // true
"abc".includes(undefined);   // false
"abc".includes(null);        // false
```


### String.startsWith(substring)
This method determines whether a string begins with the characters of another string, returning true or false as appropriate.
> MXFramework won't do any modification if the current browser supports this method natively.

### String.endsWith(substring)
This method determines whether a string ends with the characters of another string, returning true or false as appropriate.
> MXFramework won't do any modification if the current browser supports this method natively.





## Date
### Date.getDaysInMonth(year, month)
### Date.addMilliSeconds(ms)
### Date.addSeconds(seconds)
### Date.addMinutes(minutes)
### Date.addHours(hours)
### Date.addDays(hours)
### Date.addWeeks(weeks)
### Date.addMonths(months)
### Date.addYears(years)





## Array
### Array.add(item)
### Array.addAll(items)
### Array.insert(startIndex, item)
### Array.insertBefore(item, beforeItem)
### Array.insertAfter(item, afterItem)
### Array.remove(item)
### Array.removeAt(index)
### Array.clear()
### Array.clone()
