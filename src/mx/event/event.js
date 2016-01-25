export default class Event
{
    constructor(type, source)
    {
        if (typeof(type) !== "string")
        {
            throw new Error("type must be a string.");
        }
        if (!source)
        {
            throw new Error("source can not be null or empty.");
        }
        this._type = type;
        this._source = source;
    }

    _type = null;
    get type()
    {
        return this._type;
    }

    _source = null;
    get source()
    {
        return this._source;
    }

    _listeners = [];
    get listeners()
    {
        return this._listeners;
    }

    trigger(args = {})
    {
        const e = jQuery.extend({}, args, {
            type: this.type,
            source: this._source,
            defaultPrevented: false,
            preventDefault: function()
            {
                this.defaultPrevented = true;
            }
        });
        e.args = args;
        this.listeners.forEach(listener => {
            listener(e);
        });
        return e;
    }

    hasListener(listener)
    {
        if (typeof(listener) !== "function")
        {
            throw new Error("listener must be a function.");
        }
        return this.listeners.indexOf(listener) !== -1;
    }

    addListener(listener)
    {
        if (typeof(listener) !== "function")
        {
            throw new Error("listener must be a function.");
        }
        if (!this.hasListener(listener))
        {
            this.listeners.push(listener);
        }
    }

    removeListener(listener)
    {
        if (typeof(listener) !== "function")
        {
            throw new Error("listener must be a function.");
        }

        const index = this.listeners.indexOf(listener);
        if (index !== -1)
        {
            this.listeners.splice(index, 1);
            return true;
        }
        else
        {
            return false;
        }
    }

    clearListeners()
    {
        this.listeners.splice(0, this.listeners.length);
    }
}
