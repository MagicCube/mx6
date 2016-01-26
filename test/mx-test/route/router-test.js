import should from "should";

import mx from "../../../src/mx";

describe("mx.Router", function() {
    describe("#route()", function() {
        it("should define route correctly", function() {
            const router = new mx.Router();
            const route = router.route("/abcd");
            should(route.pattern).eql("/abcd");
        });
    });

    describe("#routing", function() {
        it("should route correctly", cb => {
            const router = new mx.Router();
            router.route("/item/:categoryId/:spuId/:skuId", context => {
                should(context).containEql({
                    a: 1,
                    path: "/item/123/123-456/123-456-789",
                    rawPath: "/item/123/123-456/123-456-789",
                    queryString: null
                });
                should(context.params.categoryId).eql("123");
                should(context.params.spuId).eql("123-456");
                should(context.params.skuId).eql("123-456-789");
                should(context.query).eql(null);
                cb();
            });
            router.execute("/item/123/123-456/123-456-789", { a: 1 });
        });

        it("should route with query correctly", cb => {
            const router = new mx.Router();
            router.route("/item/:categoryId/:spuId/:skuId", context => {
                should(context).containEql({
                    a: 1,
                    path: "/item/123/123-456/123-456-789",
                    rawPath: "/item/123/123-456/123-456-789?pageIndex=1&pageSize=200",
                    queryString: "pageIndex=1&pageSize=200"
                });
                should(context.params.categoryId).eql("123");
                should(context.params.spuId).eql("123-456");
                should(context.params.skuId).eql("123-456-789");
                should(context.query).containEql({
                    pageIndex: "1",
                    pageSize: "200"
                });
                cb();
            });
            router.execute("/item/123/123-456/123-456-789?pageIndex=1&pageSize=200", { a: 1 });
        });



        it("should route with router correctly", cb => {
            const rawPath = "/api/item/123/123-456/123-456-789?pageIndex=1&pageSize=200";

            const itemRouter = new mx.Router();
            itemRouter.route("/:categoryId/:spuId/:skuId", context => {
                should(context).containEql({
                    a: 1,
                    path: "/123/123-456/123-456-789",
                    rawPath: rawPath,
                    queryString: "pageIndex=1&pageSize=200"
                });
                should(context.params.categoryId).eql("123");
                should(context.params.spuId).eql("123-456");
                should(context.params.skuId).eql("123-456-789");
                should(context.query).containEql({
                    pageIndex: "1",
                    pageSize: "200"
                });
                cb();
            });

            const apiRouter = new mx.Router();
            apiRouter.route("/item/*", itemRouter);

            const router = new mx.Router();
            router.route("/api/*", apiRouter);
            router.execute(rawPath, { a: 1 });
        });
    });
});




describe("mx.HashRouter", function() {
    it("should navigate correctly", function(cb) {
        const rawPath = "/api/item/123/123-456/123-456-789?pageIndex=1&pageSize=200";
        const itemRouter = new mx.Router();
        itemRouter.route("/:categoryId/:spuId/:skuId", context => {
            should(context).containEql({
                path: "/123/123-456/123-456-789",
                rawPath: rawPath,
                queryString: "pageIndex=1&pageSize=200"
            });
            should(context.params.categoryId).eql("123");
            should(context.params.spuId).eql("123-456");
            should(context.params.skuId).eql("123-456-789");
            should(context.query).containEql({
                pageIndex: "1",
                pageSize: "200"
            });
            cb();
        });

        const apiRouter = new mx.Router();
        apiRouter.route("/item/*", itemRouter);

        mx.route("/api/*", apiRouter);
        mx.goto(rawPath);
    });

    it("should navigate with query correctly", function(cb) {
        const rawPath = "/api2/item/123/123-456/123-456-789?pageIndex=1&pageSize=200";
        const itemRouter = new mx.Router();
        itemRouter.route("/:categoryId/:spuId/:skuId", context => {
            should(context).containEql({
                path: "/123/123-456/123-456-789",
                rawPath: rawPath,
                queryString: "pageIndex=1&pageSize=200"
            });
            should(context.params.categoryId).eql("123");
            should(context.params.spuId).eql("123-456");
            should(context.params.skuId).eql("123-456-789");
            should(context.query).containEql({
                pageIndex: "1",
                pageSize: "200"
            });
            cb();
        });

        const apiRouter = new mx.Router();
        apiRouter.route("/item/*", itemRouter);

        mx.route("/api2/*", apiRouter);
        mx.goto("/api2/item/123/123-456/123-456-789", { pageIndex: 1, pageSize: 200 });
    });
});
