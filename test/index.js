import should from "should";

import mx from "../src";

// Import test cases
import "./js";

import jsdom from "jsdom";
jsdom.env("<html><head><title/></head><body></body></html>", function (err, window) {
    global.window = window;
    global.jQuery = require("jquery");
    require("./mx");
});
