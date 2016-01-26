import should from "should";

import jsdom from "jsdom";

describe("Setup Environment", function() {
    it("should be done", function(cb) {
        jsdom.env("<html><head><title/></head><body></body></html>", function (err, window) {
            global.window = window;
            global.jQuery = require("jquery");

            require("./mx-test");

            require("../src/js");
            require("./js-test");

            cb();
        });
    });
});
