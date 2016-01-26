const mx = {
    Event: require("./event/event"),
    EventProvider: require("./event/event-provider"),
    Component: require("./com/component"),
    View: require("./view/view"),
    ViewContainer: require("./view/view-container"),
    Scene: require("./scn/scene"),
    Application: require("./app/application"),

    Route: require("./route/route"),
    Router: require("./route/router"),
    HashRouter: require("./route/hash-router")
};

mx.router = new mx.HashRouter();
mx.route = mx.router.route.bind(mx.router);
mx.goto = mx.router.goto.bind(mx.router);

if (typeof(window) !== "undefined")
{
    window.mx = mx;
}

export default mx;
