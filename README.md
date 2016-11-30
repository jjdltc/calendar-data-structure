# CalendarDataStructure
##### Simple calendar data structure, will allow you to

* Get the month data => a weeks array, each one with the data to create every day 
* Get the week data => simplified version of month data, just one week in the array
* Move to the next or past month / week and get that data

### Install

##### Direct
* [Download](https://github.com/jjdltc/calendar-data-structure/archive/master.zip)
* Refer in HTML `<script type="text/javascript" src="Path/To/File/calendar-data-structure.js"></script>`
  
##### [Browserify](http://browserify.org/)
* Install: `npm install --save calendar-data-structure`
* Module: `require('calendar-data-structure')`

### Easy Use  
* Import `var myCalendar = require('calendar-data-structure')`
* Instantiate `var calendarInstance = new  myCalendar(options)`
* Use `calendarInstance.getWeeksArr()`

### Info
##### Options
Possible attributes
* __sixWeeksPerMonth__ => if true, force the weeks array to 6 elements
  * _Boolean_ => `false`
* __weekStartDay__ => (0 - 6) Week day number
  * _Integer_ => `0` 
* __actualDate__ => The date to start the calendar
  * _Date_ => `new Date()` 

### Methods
* __getWeeksArr()__ => Return an array with the weeks for the `actualDate` month
* __getDaysArr([date])__ => Return an array with days for the `actualDate` week
  * __date__ => Date to use in week 
* __setOtherDay(diff)__ => Change the date, by using an integer (Positive or Negative) that set the differential in days
  * __diff__ => Integer that represent the days to add or remove from the `actualDate`
* __setOtherWeek(diff)__ => Change the date, by using an integer (Positive or Negative) that set the differential in weeks
  * __diff__ => Integer that represent the weeks to add or remove from the `actualDate`
* __setOtherMonth(diff)__ => Change the date, by using an integer (Positive or Negative) that set the differential in months
  * __diff__ => Integer that represent the months to add or remove from the `actualDate`
* __setOtherYear(diff)__ => Change the date, by using an integer (Positive or Negative) that set the differential in years
  * __diff__ => Integer that represent the years to add or remove from the `actualDate`

##### IMPORTANT 
this is the structure needed to create and navigate in the calendar, this will not  decorate. Just return the array with the info, and allow you to surf future and past in calendar.

###### There is a big TODO list, but in resume  
* Write a better documentation
* i18n Apply
