import should from "should";

import mx from "../../../src";

class MyEventProvider extends mx.EventProvider
{
    ontest = null;
}

let eventProvider = null;
const results = [];
const listener1 = e => {
    results.push(1);
};
const listener2 = e => {
    results.push(2);
};
const listener3 = e => {
    results.push(3);
};

describe("mx.EventProvider", function() {
    describe("#constructor()", function() {
        eventProvider = new MyEventProvider();
    });

    describe("#hasEvent()", function() {
        it("should have 'test' event", function() {
            should(eventProvider.hasEvent("test")).be.true();
        });
        it("should not have 'abc' event", function() {
            should(eventProvider.hasEvent("abc")).be.false();
        });
    });

    describe("#getEvent()", function() {
        it("should be an instance of mx.Event and the type should be right", function() {
            const event = eventProvider.getEvent("test");
            should(event instanceof mx.Event && event.type === "test").be.true();
        });
        it("should be null when given a wrong event type", function() {
            should(eventProvider.getEvent("abc")).be.null();
        });
    });

    describe("#on()", function() {
        it("should throw error when listener is not provided", function() {
            should(() => { eventProvider.on("test"); }).throw(`listener must be a function.`);
        });
        it("should throw error when given a wrong event type", function() {
            should(() => { eventProvider.on("abc", () => { }); }).throw(`"abc" event is not found.`);
        });
        it("should bind 'test' event correctly", function() {
            eventProvider.on("test", listener1);
            eventProvider.on("test", listener2);
            eventProvider.on("test", listener3);
            should(eventProvider.getEvent("test").listeners).eql([ listener1, listener2, listener3 ]);
        });
    });

    describe("#off()", function() {
        it("should throw error when given a wrong event type", function() {
            should(() => { eventProvider.off("abc", () => { }); }).throw(`"abc" event is not found.`);
        });
        it("should unbind 'test' event correctly", function() {
            eventProvider.off("test", listener2);
            should(eventProvider.getEvent("test").listeners).eql([ listener1, listener3 ]);
        });
        it("should unbind all correctly", function() {
            eventProvider.off("test");
            should(eventProvider.getEvent("test").listeners).eql([]);
        });
    });

    describe("#trigger()", function() {
        before(() =>
        {
            eventProvider.on("test", listener1);
            eventProvider.on("test", listener2);
            eventProvider.on("test", listener3);
        });

        it("should throw error when given a wrong event type", function() {
            should(() => { eventProvider.trigger("abc", () => { }); }).throw(`"abc" event is not found.`);
        });
        it("should trigger correctly", function() {
            const args = { a: 1, b: 2 };
            let e = eventProvider.trigger("test", args);
            should(results).eql([1, 2, 3]);
            should(e).containEql({
                a: 1,
                b: 2,
                source: eventProvider,
                args,
                type: "test",
                defaultPrevented: false
            });

            eventProvider.on("test", e => {
                e.preventDefault();
                results.push(4);
            });
            e = eventProvider.trigger("test", args);
            should(results).eql([1, 2, 3, 1, 2, 3, 4]);
            should(e).containEql({
                source: eventProvider,
                args,
                type: "test",
                defaultPrevented: true
            });
        });
    });
});
