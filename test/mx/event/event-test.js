import should from "should";

import mx from "../../../src";

describe("mx.Event", function() {
    const source = {};
    let event = null;
    let results = [];
    const listener1 = e => {
        results.push(1);
    };
    const listener2 = e => {
        results.push(2);
    };
    const listener3 = e => {
        results.push(3);
    };

    describe("#constructor()", function() {
        it("should throw exception when the type argument is not specified", function() {
            should(() => { event = new mx.Event(); }).throw("type must be a string.");
        });

        it("should throw exception when the type argument is not specified", function() {
            should(() => { event = new mx.Event("click"); }).throw("source can not be null or empty.");
        });

        it("should construct correctly", function() {
            event = new mx.Event("click", source);
            should(event.type).eql("click");
            should(event.source).eql(source);
        });
    });

    describe("#addListener()", function() {
        it("should add listener correctly", function() {
            event.addListener(listener1);
            event.addListener(listener2);
            event.addListener(listener2); // Add duplicated listener
            event.addListener(listener3);
            should(event.listeners).eql([listener1, listener2, listener3]);
        });
    });

    describe("#hasListener()", function() {
        if("should return true", function() {
            should(event.hasListener(listener1)).be.true();
            should(event.hasListener(listener2)).be.true();
        });

        if("should return false", function() {
            should(event.hasListener(null)).be.false();
            should(event.hasListener(() => {})).be.false();
        });
    });

    describe("#removeListener()", function() {
        it("should remove correctly", function() {
            event.removeListener(listener3);
            should(event.listeners).eql([listener1, listener2]);
        });
    });

    describe("#trigger()", function() {
        it("should trigger without args in correct sequence and return correctly", function() {
            const e = event.trigger();
            should(results).eql([1, 2]);
            should(e).containEql({
                source,
                args: {},
                type: "click",
                defaultPrevented: false
            });
        });

        it("should trigger with args in correct sequence and return correctly too", function() {
            const args = { a: 1, b: 2 };
            const e = event.trigger(args);
            should(results).eql([1, 2, 1, 2]);
            should(e).containEql({
                source,
                args,
                type: "click",
                defaultPrevented: false
            });
        });
    });

    describe("#clearListeners()", function() {
        it("should clear correctly", function() {
            event.clearListeners();
            should(event.listeners).eql([]);
        });
    });

    describe("#preventDefault()", function() {
        it("should prevent default action correctly", function() {
            const beforeSaveEvent = new mx.Event("beforesave", source);
            beforeSaveEvent.addListener(e => {
                e.preventDefault();
            });
            const ev = beforeSaveEvent.trigger();
            should(ev.defaultPrevented).be.true();
        });
    });
});
