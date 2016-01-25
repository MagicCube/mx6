import EventProvider from "../event/event-provider"

export default class Route extends EventProvider
{
    onexecute = null;

    constructor(pattern)
    {
        super();
        this._pattern = pattern;
        this._regex = Route.patternToRegex(this._pattern, this._keys, false, false);
    }

    _pattern = null;
    get pattern()
    {
        return this._pattern;
    }

    _regex = null;
    get regex()
    {
        return this._regex;
    }

    _keys = [];
    get keys()
    {
        return this._keys;
    }



    match(path)
    {
        return this._regex.test(path);
    }

    extractParams(path)
    {
        const m = this._regex.exec(path);
        if (!m)
        {
            return null;
        }

        const params = [];
        for (let i = 1, len = m.length; i < len; ++i)
        {
            var key = this._keys[i - 1];
            var val = ('string' == typeof m[i]) ? decodeURIComponent(m[i]) : m[i];
            if (key) {
                params[key.name] = val;
            }
            params.push(val);
        }
        return params;
    }

    execute(path, p_args = {})
    {
        const params = this.extractParams(path);
        const args = jQuery.extend(p_args, {
            path,
            params
        });
        return this.trigger("execute", args);
    }




    static patternToRegex(path, keys, sensitive, strict)
    {
        if (path instanceof RegExp) return path;
        if (typeof(path) !== "string")
        {
            throw new Error("pattern must be a string or a RegExp.");
        }
        path = path
            .concat(strict ? '' : '/?')
            .replace(/\/\(/g, '(?:/')
            .replace(/\+/g, '__plus__')
            .replace(/(\/)?(\.)?:(\w+)(?:(\(.*?\)))?(\?)?/g, function(_, slash, format, key, capture, optional) {
                keys.push({ name: key, optional: !! optional });
                slash = slash || '';
                return '' + (optional ? '' : slash) + '(?:' + (optional ? slash : '') + (format || '') + (capture || (format && '([^/.]+?)' || '([^/]+?)')) + ')' + (optional || '');
            })
            .replace(/([\/.])/g, '\\$1')
            .replace(/__plus__/g, '(.+)')
            .replace(/\*/g, '(.*)');
        return new RegExp('^' + path + '$', sensitive ? '' : 'i');
    }
}
