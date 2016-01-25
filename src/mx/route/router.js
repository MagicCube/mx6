import EventProvider from "../event/event-provider"
import Route from "./route"

export default class Router
{
    _routes = [];

    route(pattern, handler = null)
    {
        if (handler instanceof Router)
        {
            return this.use(pattern, handler);
        }

        const route = new Route(pattern);
        if (typeof(handler) === "function")
        {
            route.on("execute", handler);
        }
        this._routes.push(route);
        return route;
    }

    use(pattern, router)
    {
        if (!(router instanceof Router))
        {
            throw new Error("router must be an instance of Router.");
        }

        return this.route(pattern, context => {
            const route = context.source;
            const url = route.toUrl(context.params);
            const partialUrl = context.path.substr(url.length - 1);

            router.execute(partialUrl, context.args);
        });
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
        else
        {
            if (typeof(args.queryString) === "undefined")
            {
                args.queryString = null;
                args.query = null;
            }
        }

        let result = false;
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
