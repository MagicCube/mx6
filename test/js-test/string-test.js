import should from "should";

describe("String", function() {
    describe("#includes()", function() {
        const str = "abc";
        it("should return true", function() {
            should("".includes("")).be.true();
            should(str.includes("")).be.true();
            should(str.includes("a")).be.true();
            should(str.includes("ab")).be.true();
            should(str.includes("abc")).be.true();
        });
        it("should return false", function() {
            should(str.includes(undefined)).be.false();
            should(str.includes(null)).be.false();
            should(str.includes("abcd")).be.false();
            should(str.includes("123")).be.false();
        });
    });
});
