/*
    @Author: Joel De La Torriente
    @Email: jjdltc@gmail.com
    @WebSite: www.jjdltc.com
    @Version: 0.3.0
    @License: MIT License (MIT)
*/

if(module && module.hasOwnProperty("exports")){
    module.exports = CalendarStructure;
}

function CalendarStructure(options){
    var options                 = options || {};

    this.languageData           = options.languageData || {
        days                    : ["Dom","Lun","Mar","Mie","Jue","Vie","Sab"],
        daysFullText            : ["Domingo","Lunes","Martes","Miercoles","Jueves","Viernes","Sabado"],
        months                  : ["Ene","Feb","Mar","Abr","May","Jun","Jul","Ago","Sep","Oct","Nov","Dic"],
        monthsFullText          : ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"]
    };

    this.options                = {
        sixWeeksPerMonth        : options.sixWeeksPerMonth || false,
        weekStartDay            : (options.weekStartDay && options.weekStartDay < 7)?options.weekStartDay:0,
        actualDate              : options.actualDate || new Date() 
    };

    this.actualDate             = this.options.actualDate;
    this.utils                  = this.utils();
}

CalendarStructure.prototype.getWeeksArr = function(){
    var date                    = new Date(this.actualDate.getTime()),
        monthWeeks              = [],
        self                    = this;

    date.setDate(1);

    for(var i = 1; i<=6; i++){
        monthWeeks.push(self.getDaysArr(date));
        date.setDate(date.getDate()+7);
    }

    if(!self.options.sixWeeksPerMonth && (monthWeeks[1][0].monthNumber != monthWeeks[5][0].monthNumber)){
        monthWeeks.pop();
    }

    return monthWeeks;
}

CalendarStructure.prototype.getDaysArr = function(date){
    var weekDate                = (date && (date.constructor == new Date().constructor))?new Date(date.getTime()):new Date(this.actualDate.getTime()),
        daysToWeekStart         = this.utils.daysToWeekStart(weekDate),
        weekArr                 = [];
    
    weekDate.setHours(24*daysToWeekStart)
    for(var i = 0; i<7; i++){
        weekArr[i]              = this.utils.buildDayObj(weekDate);
        weekDate.setHours(+24);
    }
    return weekArr;
}

CalendarStructure.prototype.utils = function(){

    var self                    = this,
        daysToWeekStart         = function(weekDate){
            var options         = self.options,
                diff            = options.weekStartDay - weekDate.getDay(),
                result          = (options.weekStartDay > weekDate.getDay())?(diff-7):diff;
            return result;
        }, 
        buildDayObj             = function(date){
            return {
                dayText         : self.languageData.days[date.getDay()],
                dayNumber       : date.getDate(),
                monthText       : self.languageData.months[date.getMonth()],
                monthNumber     : date.getMonth(),
                year            : date.getFullYear()
            };
        }, 
        updateDate              = function(difference, type){
            var difference      = difference || 0,
                isInt           = difference % 1 === 0,
                types           = {
                    day         : {set:"setDate",       get:"getDate",      multiplier:1},
                    week        : {set:"setDate",       get:"getDate",      multiplier:7},
                    month       : {set:"setMonth",      get:"getMonth",     multiplier:1},
                    year        : {set:"setFullYear",   get:"getFullYear",  multiplier:1}
                },
                type            = types[type] || false;
        
            if(difference!=0 && isInt && type){
                self.actualDate[type.set](self.actualDate[type.get]()+(difference*type.multiplier));
            }
        };

    return {
        daysToWeekStart         : daysToWeekStart,
        buildDayObj             : buildDayObj,
        updateDate              : updateDate
    };
}

/*
Set the actual date to another week
@params: difference {Integer 1...n} difference in days to set (could be negative)
*/
CalendarStructure.prototype.setOtherDay = function(difference){
    this.utils.updateDate(difference, "day");
}

/*
Set the actual date to another week
@params: difference {Integer 1...n} difference in weeks to set (could be negative)
*/
CalendarStructure.prototype.setOtherWeek = function(difference){
    this.utils.updateDate(difference, "week");
}

/*
Set the actual date to another month
@params: difference {Integer 1...n} difference in months to set (could be negative)
*/
CalendarStructure.prototype.setOtherMonth  = function(difference){
    this.utils.updateDate(difference, "month");
}

/*
Set the actual date to another year
@params: difference {Integer 1...n} difference in years to set (could be negative)
*/
CalendarStructure.prototype.setOtherYear  = function(difference){
    this.utils.updateDate(difference, "year");
}
