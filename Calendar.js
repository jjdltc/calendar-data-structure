function Calendar(){
    var self                = this,
        actualDate          = new Date();

    this.daysArr            = ["Dom","Lun","Mar","Mie","Jue","Vie","Sab"];
    this.monthArr           = ["Ene","Feb","Mar","Abr","May","Jun","Jul","Ago","Sep","Oct","Nov","Dic"];

    this.getWeeksArr = function(calcSideMonths, today, options){
        var today           = today || actualDate,
            options         = options || {weekStartDay:0},
            calcSideMonths  = calcSideMonths || false,
            monthLastDay    = new Date(today.getFullYear(),today.getMonth()+1,0).getDate(),
            monthFirstDay   = new Date(today.getFullYear(), today.getMonth(),1).getDay(),
            buildingWeekArr = [],
            monthWeeks      = [],
            actualDay       = monthFirstDay,
            pastMont        = new Date(new Date(today.toString()).setMonth(today.getMonth()-1)),
            nextMont        = new Date(new Date(today.toString()).setMonth(today.getMonth()+1));
        for(var i = 1; i<=monthLastDay; i++){
            buildingWeekArr[(actualDay-options.weekStartDay>=0)?actualDay-options.weekStartDay:(actualDay-options.weekStartDay)+7] = {dayText:self.daysArr[actualDay], dayNumber:i, monthText:self.monthArr[today.getMonth()], monthNumber:today.getMonth(), year:today.getFullYear()};
            if(actualDay==6 || i==monthLastDay){
                monthWeeks.push(buildingWeekArr);
                buildingWeekArr = []
            }
            actualDay = (actualDay==6)?0:actualDay+1;
        }
        if(calcSideMonths){
            var pastMontArr     = self.getWeeksArr(false, pastMont, options);
                pastMontArr     = pastMontArr[pastMontArr.length-1];
            var nextMontArr     = self.getWeeksArr(false, nextMont, options)[0];
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
        }
        return monthWeeks;
    }

    this.getDaysArr = function(today, options){
        var today           = today || actualDate,
            clonedDate      = new Date(today),
            weekArr         = [],
            options         = options || {weekStartDay:0},
            daysToWeekStart = ((options.weekStartDay - clonedDate.getDay())>0)?-(7-(options.weekStartDay - clonedDate.getDay())):(options.weekStartDay - clonedDate.getDay());
        clonedDate.setHours(24*daysToWeekStart)
        for(var i = 0; i<7; i++){
            weekArr[i] = {dayText:self.daysArr[clonedDate.getDay()], dayNumber:clonedDate.getDate(), monthText:self.monthArr[clonedDate.getMonth()], monthNumber:clonedDate.getMonth(), year:clonedDate.getFullYear()};
            clonedDate.setHours(+24);
        }
        return weekArr;
    }

    this.setOtherWeek = function(difference){
        difference      = difference || 0;
        if(difference==0){
            actualDate = new Date();
        }
        else{
            actualDate.setHours(actualDate.getHours()+(difference+(7*24)));
        }
    }

    this.setOtherMonth  = function(difference){
        difference      = difference || 0;
        if(difference==0){
            actualDate = new Date();
        }
        else{
            actualDate.setMonth(actualDate.getMonth()+difference);
        }
    }
}