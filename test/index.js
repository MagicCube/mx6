import should from "should";

import jsdom from "jsdom";
jsdom.env("<html><head><title/></head><body></body></html>", function (err, window) {
    global.window = window;
    global.jQuery = require("jquery");
});

import "./mx-test";

import "../src/js";
import "./js-test";
