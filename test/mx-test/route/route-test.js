import should from "should";

import mx from "../../../src";

const bookRoute = new mx.Route("/book/:publisher/:author/:name");

describe("mx.Route", function() {
    describe("#match()", function() {
        it("should match", function() {
            should(new mx.Route("/").match("/")).be.true();
            should(new mx.Route("/a").match("/a")).be.true();
            should(new mx.Route("/a").match("/a/")).be.true();

            should(new mx.Route("/?").match("/")).be.true();
            should(new mx.Route("/a/?").match("/a")).be.true();

            should(new mx.Route("/*").match("/a")).be.true();
            should(new mx.Route("/*").match("/a/b/c")).be.true();
            should(new mx.Route("/a*").match("/a/b/c")).be.true();

            should(bookRoute.match("/book/longman/lg-alex/new-concept-english")).be.true();
        });

        it("should not match", function() {
            should(new mx.Route("/").match("")).be.false();
            should(new mx.Route("/b/*").match("/a/b/c")).be.false();

            should(bookRoute.match("/book/longman/lg-alex/")).be.false();
            should(bookRoute.match("/book//lg-alex/")).be.false();
            should(bookRoute.match("/book/longman/lg-alex")).be.false();
        });
    });

    describe("#extractParams()", function() {
        it("should extract params correctly", function() {
            const params = bookRoute.extractParams("/book/longman/lg-alex/new-concept-english");
            should(params).containEql("longman", "lg-alex", "new-concept-english");
            should(params).have.property("publisher", "longman");
            should(params).have.property("author", "lg-alex");
            should(params).have.property("name", "new-concept-english");
        });
    });

    describe("#execute()", function() {
        it("should execute correctly", function(cb) {
            const args = { a: 1, b: 2 };
            bookRoute.on("execute", e => {
                should(e).containEql({
                    a: 1,
                    b: 2,
                    source: bookRoute
                });

                should(e.params).have.property("publisher", "longman");
                should(e.params).have.property("author", "lg-alex");
                should(e.params).have.property("name", "new-concept-english");

                cb();
            });
            bookRoute.execute("/book/longman/lg-alex/new-concept-english", args);
        });
    });
});
