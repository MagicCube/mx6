import EventProvider from "../event/event-provider"

export default class Router
{
    _routes = [];

    route(pattern, handler = null)
    {
        const route = new Route(pattern);
        if (typeof(handler) === "function")
        {
            route.addListener(handler);
        }
        this._routes.push(route);
        return route;
    }

    execute(path, args = {})
    {
        if (!args.rawPath)
        {
            args.rawPath = path;
        }
        if (path.indexOf("?") !== -1)
        {
            const queryString = path.substr(path.indexOf("?") + 1);
            args.queryString = queryString;
            args.query = queryString ? JSON.parse('{"' + queryString.replace(/&/g, '","').replace(/\=/g, '":"') + '"}', function(key, value)
            {
                return key === "" ? value : decodeURIComponent(value);
            }) : {};

            path = path.substr(0, path.indexOf("?"));
        }

        const result = false;
        for (let i = 0; i < this._routes.length; i++)
        {
            const route = this._routes[i];
            if (route.match(path))
            {
                route.execute(path, args);
                result = true;
            }
        }
        return result;
    }
}
