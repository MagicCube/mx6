import should from "should";

describe("Array", function() {
    describe("#add()", function() {
        it("should add items correctly", function() {
            const arr = [];
            arr.add(0);
            arr.add("a");
            arr.add(null);
            should(arr).eql([0, "a", null]);
        });
    });

    describe("#addAll()", function() {
        it("should add all the items correctly", function() {
            const arr = [ "a", "b" ];
            arr.addAll(["c", "d", null]);
            should(arr).eql(["a", "b", "c", "d", null]);
        });
        it("should throw exception", function() {
            const arr = [ ];
            should(() => { arr.addAll(null) }).throw();
        });
    });

    describe("#insert()", function() {
        it("should insert correctly and return true", function() {
            const arr = [];
            let result = arr.insert(0, "c");
            should(result).eql(true);
            should(arr).eql(["c"]);

            arr.insert(0, "a");
            should(result).eql(true);
            should(arr).eql(["a", "c"]);

            arr.insert(1, "b");
            should(result).eql(true);
            should(arr).eql(["a", "b", "c"]);
        });
        it("should insert correctly and return true when the index is negative", function() {
            const arr = ["a", "b", "d", "e"];
            const result = arr.insert(-2, "c");
            should(result).eql(true);
            should(arr).eql(["a", "b", "c", "d", "e"]);
        });
    });

    describe("#insertBefore()", function() {
        it("should insert correctly and return true", function() {
            const arr = ["a", "c"];
            const result = arr.insertBefore("b", "c");
            should(result).be.true();
            should(arr).eql(["a", "b", "c"]);
        });
        it("should not insert and return false", function() {
            const arr = ["a", "c"];
            const result = arr.insertBefore("b", "d");
            should(result).be.false();
            should(arr).eql(["a", "c"]);
        });
    });

    describe("#insertAfter()", function() {
        it("should insert correctly and return true", function() {
            const arr = ["a", "c"];
            const result = arr.insertAfter("b", "a");
            should(result).be.true();
            should(arr).eql(["a", "b", "c"]);
        });
        it("should not insert and return false", function() {
            const arr = ["a", "c"];
            const result = arr.insertAfter("b", "d");
            should(result).be.false();
            should(arr).eql(["a", "c"]);
        });
    });

    describe("#remove()", function() {
        it("should remove correctly and return true", function() {
            const arr = ["a", "b", "c"];
            const result = arr.remove("b");
            should(result).be.true();
            should(arr).eql(["a", "c"]);
        });
        it("should not remove and return false", function() {
            const arr = ["a", "c"];
            const result = arr.remove("b");
            should(result).be.false();
            should(arr).eql(["a", "c"]);
        });
    });

    describe("#removeAt()", function() {
        it("should remove correctly and return true", function() {
            const arr = ["a", "b", "c"];
            const result = arr.removeAt(1);
            should(result).be.true();
            should(arr).eql(["a", "c"]);
        });
        it("should not remove and return false", function() {
            const arr = ["a", "c"];
            let result = arr.removeAt(-1);
            should(result).be.false();
            should(arr).eql(["a", "c"]);

            result = arr.removeAt(2);
            should(result).be.false();
            should(arr).eql(["a", "c"]);
        });
    });

    describe("#clear()", function() {
        it("should clear correctly", function() {
            const arr = ["a", "b", "c"];
            arr.clear();
            should(arr).eql([]);
        });
    });

    describe("#clone()", function() {
        it("should clone correctly", function() {
            const date = new Date();
            let arr = [undefined, null, 1, true, "a", date, { x: 1, y: 2 }, [ {x:1}, {x:2} ]];
            should(arr).eql(arr.clone());

            arr = [];
            should(arr).eql(arr.clone());
        });
    });
});
