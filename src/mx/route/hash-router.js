import Router from "./router";

export default class HashRouter extends Router
{
    _path = null;

    constructor()
    {
        super();

        jQuery(window).on("hashchange", () => {
            this._onhashchange();
        });

        jQuery(window).on("load", () => {
            setTimeout(() => {
                this._onhashchange();
            });
        });
    }




    getHash()
    {
        let hash = window.location.hash;
        if (hash[0] === "#")
        {
            hash = hash.substr(1);
        }

        if (hash === "")
        {
            hash = "/"
        }
        return hash;
    }

    getHashWithoutQuery()
    {
        const hash = this.getHash();

        return hash;
    }




    route(pattern, handler = null)
    {
        if (!pattern)
        {
            throw new Error("pattern can not be null or empty.");
        }

        if (typeof(handler) === "function" || handler instanceof Router)
        {
            return super.route(pattern, handler);
        }
    }

    goto(path, query, replace)
    {
        if (arguments.length === 0)
        {
            throw new Error("mx.goto() requires at least 1 argument.");
        }
        else if (arguments.length === 2)
        {
            if (typeof(arguments[1]) === "boolean")
            {
                replace = arguments[1];
                query = undefined;
            }
        }

        if (typeof(replace) === "undefined" || replace === null)
        {
            replace = false;
        }

        if (path[0] !== "/")
        {
            throw new Error("The path of navigation request must start with '/'.");
        }

        if (typeof(query) !== "undefined" && query !== null)
        {
            let queryString = null;
            if (typeof(query) === "string")
            {
                if (query.length > 0)
                {
                    queryString = encodeURIComponent(query);
                }
            }
            else if (jQuery.isPlainObject(query))
            {
                let queryStrings = [];
                for (let key in query)
                {
                    queryStrings.push(key + "=" + encodeURIComponent(query[key]));
                }
                if (queryStrings.length > 0)
                {
                    queryString = queryStrings.join("&");
                }
            }
            else
            {
                throw new Error("The query argument of mx.goto() must be a string or a plain object.");
            }

            if (queryString !== null && queryString.length > 0)
            {
                path += "?" + queryString;
            }
        }

        if (this._path === path)
        {
            return true;
        }

        this._path = path;
        // Delay a little while to prevent invoke circularly.
        setTimeout(() => {
            this._changeHash("#" + path, replace);
        });

        this.execute(path);

        return true;
    }



    _onhashchange()
    {
        const hash = this.getHash();
        if (hash[0] === "/")
        {
            this.goto(hash);
        }
    }

    _changeHash(hash, replace = false)
    {
        if (hash[0] !== "#")
        {
            hash = "#" + hash;
        }

        if (window.location.hash === "" && hash === "#/")
        {
            return;
        }

        if (!replace)
        {
            window.location.hash = hash;
        }
        else
        {
            if ("replaceState" in window.history)
            {
                history.replaceState("", "", hash);
            }
            else
            {
                const currentHash = location.hash;
                // Try to go back to the last page first
                if (location.hash !== currentHash)
                {
                    history.back();
                }
                window.location.hash = hash;
            }
        }
    }
}
