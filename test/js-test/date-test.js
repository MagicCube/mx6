import should from "should";

describe("Date", function() {
    describe("#addMilliSeconds()", function() {
        it("should be right", function() {
            const date = new Date();
            const dateVal = date * 1;
            should(date.addMilliSeconds(1000) * 1).eql(dateVal + 1000);
        });
    });
    describe("#addSeconds()", function() {
        it("should be right", function() {
            const date = new Date("2016-02-29 23:59:59");
            const dateVal = date * 1;
            should(date.addSeconds(1) * 1).eql(new Date("2016-03-01 00:00") * 1);
        });
    });
    describe("#addMinutes()", function() {
        it("should be right", function() {
            const date = new Date("2016-02-29 23:59");
            const dateVal = date * 1;
            should(date.addMinutes(1) * 1).eql(new Date("2016-03-01 00:00") * 1);
        });
    });
    describe("#addHours()", function() {
        it("should be right", function() {
            const date = new Date("2016-02-29 23:00");
            const dateVal = date * 1;
            should(date.addHours(1) * 1).eql(new Date("2016-03-01 00:00") * 1);
        });
    });
    describe("#addDays()", function() {
        it("should be right", function() {
            const date = new Date("2016-02-29");
            const dateVal = date * 1;
            should(date.addDays(1) * 1).eql(new Date("2016-03-01") * 1);
        });
    });
    describe("#addMonths()", function() {
        it("should be right", function() {
            const date = new Date("2016-02-01");
            const dateVal = date * 1;
            should(date.addMonths(1) * 1).eql(new Date("2016-03-01") * 1);
        });
    });
    describe("#addYears()", function() {
        it("should be right", function() {
            const date = new Date("2016-01-01");
            const dateVal = date * 1;
            should(date.addYears(1) * 1).eql(new Date("2017-01-01") * 1);
        });
    });
});
