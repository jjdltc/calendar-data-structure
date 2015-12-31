/*
-----------------------------------------------------
=====> Share the code is the best way to learn <=====
=====> Let the code speak <=====
------------------------------------------------------
@Author: Joel De La Torriente
@Email: jjdltc@gmail.com
@WebSite: www.jjdltc.com
@Version: 0.2
@License: MIT License (MIT)
*/

function CalendarStructure(options){
    this.actualDate     = new Date();

    this.languageData   = options.languageData || {
        days            : ["Dom","Lun","Mar","Mie","Jue","Vie","Sab"],
        daysFullText    : ["Domingo","Lunes","Martes","Miercoles","Jueves","Viernes","Sabado"],
        months          : ["Ene","Feb","Mar","Abr","May","Jun","Jul","Ago","Sep","Oct","Nov","Dic"],
        monthsFullText  : ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"]
    }

    this.sixWeeksPerMonth = options.sixWeeksPerMonth || true;
}

CalendarStructure.prototype.getWeeksArr = function(today, options){
    var today           = today || this.actualDate,
        options         = options || {
            weekStartDay    :0, 
            calcSideMonths  :false},
        monthLastDay    = new Date(today.getFullYear(),today.getMonth()+1,0).getDate(),
        monthFirstDay   = new Date(today.getFullYear(), today.getMonth(),1).getDay(),
        buildingWeekArr = [],
        monthWeeks      = [],
        actualDay       = monthFirstDay,
        pastMont        = new Date(new Date(today.toString()).setMonth(today.getMonth()-1)),
        nextMont        = new Date(new Date(today.toString()).setMonth(today.getMonth()+1));

    for(var i = 1; i<=monthLastDay; i++){
        buildingWeekArr[(actualDay-options.weekStartDay>=0)?actualDay-options.weekStartDay:(actualDay-options.weekStartDay)+7] = {dayText:this.languageData.days[actualDay], dayNumber:i, monthText:this.languageData.months[today.getMonth()], monthNumber:today.getMonth(), year:today.getFullYear()};
        if(actualDay==6 || i==monthLastDay){
            monthWeeks.push(buildingWeekArr);
            buildingWeekArr = []
        }
        actualDay = (actualDay==6)?0:actualDay+1;
    }

    if(options.calcSideMonths){
        var tempOptions     = JSON.parse(JSON.stringify(options));
            tempOptions.calcSideMonths = false;
        var pastMontArr     = this.getWeeksArr(pastMont, tempOptions);
            pastMontArr     = pastMontArr[pastMontArr.length-1];
        var nextMontArr     = this.getWeeksArr(nextMont, tempOptions)[0];
            monthWeeks[0]   = (pastMontArr.concat(monthWeeks[0])).filter(function(item){return true});
            monthWeeks[monthWeeks.length-1] = (monthWeeks[monthWeeks.length-1].concat(nextMontArr)).filter(function(item){return true});

        if(monthWeeks[0].length>7){
            monthWeeks[0]   = monthWeeks[0].slice((monthWeeks[0].length-7),(monthWeeks[0].length))
        }

        if(monthWeeks[monthWeeks.length-1].length>7){
           var tempArr = monthWeeks[monthWeeks.length-1];
           monthWeeks[monthWeeks.length-1] = tempArr.slice(0, 7);
           monthWeeks[monthWeeks.length]   = tempArr.slice(7, tempArr.length);
        }

        if(this.sixWeeksPerMonth && monthWeeks.length<6){
            for(var week = 1; monthWeeks.length<6; week++){
                monthWeeks.push(nextMontArr[week]);
            }
        }            
    }
    return monthWeeks;
}

CalendarStructure.prototype.getDaysArr = function(today, options){
    var today           = today || this.actualDate,
        clonedDate      = new Date(today),
        weekArr         = [],
        options         = options || {weekStartDay:0},
        daysToWeekStart = ((options.weekStartDay - clonedDate.getDay())>0)?-(7-(options.weekStartDay - clonedDate.getDay())):(options.weekStartDay - clonedDate.getDay());
    clonedDate.setHours(24*daysToWeekStart)
    for(var i = 0; i<7; i++){
        weekArr[i] = {dayText:this.languageData.days[clonedDate.getDay()], dayNumber:clonedDate.getDate(), monthText:this.languageData.months[clonedDate.getMonth()], monthNumber:clonedDate.getMonth(), year:clonedDate.getFullYear()};
        clonedDate.setHours(+24);
    }
    return weekArr;
}

/*
Set the actual date to another week
@params: difference {Integer 1...n} difference in weeks to set (could be negative)
*/
CalendarStructure.prototype.setOtherDay = function(difference){
    var difference      = difference || 0
      , isInt           = difference % 1 === 0;
    if(difference!=0 && isInt){
        this.actualDate.setDate(this.actualDate.getDate()+difference);
    }
}

/*
Set the actual date to another week
@params: difference {Integer 1...n} difference in weeks to set (could be negative)
*/
CalendarStructure.prototype.setOtherWeek = function(difference){
    var difference      = difference || 0;
    if(difference!=0){
        this.actualDate.setDate(this.actualDate.getDate()+(difference*7));
    }
}

/*
Set the actual date to another month
@params: difference {Integer 1...n} difference in months to set (could be negative)
*/
CalendarStructure.prototype.setOtherMonth  = function(difference){
    var difference      = difference || 0;
    if(difference!=0){
        this.actualDate.setMonth(this.actualDate.getMonth()+difference);
    }
}

/*
Set the actual date to another year
@params: difference {Integer 1...n} difference in years to set (could be negative)
*/
CalendarStructure.prototype.setOtherYear  = function(difference){
    var difference      = difference || 0;
    if(difference!=0){
        this.actualDate.setFullYear(this.actualDate.getFullYear()+difference);
    }
}
