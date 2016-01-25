import should from "should";

import mx from "../../../src";

let rootView = null;
let childView1 = null;
let childView2 = null;

class RootView extends mx.View
{
    constructor(id)
    {
        super(id);
        this.$container = jQuery("<div id=container>");
        this.$element.append(this.$container);
    }
}

describe("mx.View", function() {
    describe("#constructor()", function() {
        it("should construct correctly", function() {
            const anonymousView = new mx.View();
            should(anonymousView.id).eql(null);
            should(anonymousView.$element.data("view")).eql(anonymousView);

            rootView = new RootView("root");
            childView1 = new mx.View("child1");
            childView2 = new mx.View("child2");
            should(rootView.id).eql("root");
            should(rootView.$element.attr("id")).eql("root");
            should(rootView.$container.attr("id")).eql("container");
            should(childView1.$container[0]).eql(childView1.$element[0]);
        });
    });

    describe("#hierarchy", function() {
        it("should addSubview correctly", function() {
            rootView.addSubview(childView1);
            rootView.addSubview(childView2);
            should(rootView.subviews[0]).eql(childView1);
            should(rootView.subviews["child1"]).eql(childView1);
            should(childView1.parent).eql(rootView);
            should(rootView.$container[0]).eql(childView1.$element.parent()[0]);
        });

        it("should removeSubview correctly", function() {
            rootView.removeSubview(childView2);
            should(rootView.subviews.length).eql(1);
            should(rootView.subviews[0]).eql(childView1);
            should(childView2.parent).eql(null);
            should(rootView.subviews["child2"]).eql(undefined);
            should(childView2.$element.parent().length).eql(0);
            should(childView2.$element.data("view")).eql(childView2);
        });

        it ("should containSubview", function() {
            should(rootView.containsSubview(childView1)).be.true();
            should(rootView.containsSubview("child1")).be.true();
            should(rootView.containsSubview(childView2)).be.false();
            should(rootView.containsSubview("child2")).be.false();
            should(rootView.containsSubview(null)).be.false();
        });

        it("should removeFromParent correctly", function() {
            childView1.removeFromParent();
            should(rootView.subviews.length).eql(0);
            should(rootView.subviews["child1"]).eql(undefined);
            should(childView1.parent).eql(null);
            should(childView1.$element.parent().length).eql(0);
        });

        it("should clearSubviews correctly", function() {
            rootView.addSubview(childView1);
            rootView.addSubview(childView2);
            rootView.clearSubviews();
            should(rootView.subviews.length).eql(0);
            should(rootView.subviews["childView1"]).eql(undefined);
            should(childView1.parent).eql(null);
        });
    });
});
