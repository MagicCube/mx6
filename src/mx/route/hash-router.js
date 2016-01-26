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

    goto(path, query = {}, replace = false)
    {
        if (path[0] !== "/")
        {
            throw new Error("The path of navigation request must start with '/'.");
        }

        let queryStrings = [];
        for (let key in query)
        {
            queryStrings.push(key + "=" + query[key]);
        }
        if (queryStrings.length)
        {
            path += "?" + queryStrings.join("&");
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
