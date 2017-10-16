var assert              = require('chai').assert,
    dataStructure       = require("../calendar-data-structure.js");

describe('Golden Path', function(){
    var calendar2k      = new dataStructure({actualDate:new Date("01-01-2000")}),
        daysName        = ["Dom","Lun","Mar","Mie","Jue","Vie","Sab"],
        daysArr         = calendar2k.getDaysArr(),
        weekArr         = calendar2k.getWeeksArr(),
        dayGoldenPath   = function(week){
            assert.isArray(week, "Should be an Array");
            assert.lengthOf(week, 7, "Should had 7 days in Array");
            assert.hasAllKeys(week[0], ["dayNumber", "dayText", "monthNumber", "monthText", "year"], "Should had the 'day' attributes");
            daysName.forEach(function(itm, idx){
                assert.strictEqual(week[idx].dayText, daysName[idx], "Day name should be "+daysName[idx])
            })
        };

    it('getDaysArr', function() {
        dayGoldenPath(daysArr);

    })

    it('getWeeksArr', function() {
        assert.isArray(weekArr, "Should be an Array");
        assert.lengthOf(weekArr, 6, "Should had 6 days in Array");
        dayGoldenPath(weekArr[0])
    })
});
