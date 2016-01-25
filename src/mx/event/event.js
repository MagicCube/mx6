export default class Event
{
    constructor(type)
    {
        if (typeof(type) !== "string")
        {
            throw new Error("type must be a string.");
        }
        this._type = type;
    }

    _type = null;
    get type()
    {
        return this._type;
    }

    _listeners = [];
    get listeners()
    {
        return this._listeners;
    }

    trigger(source, args = {})
    {
        if (!source)
        {
            throw new Error("source can not be null or empty.");
        }
        const e = {
            type: this.type,
            source,
            args,
            defaultPrevented: false,
            preventDefault: function()
            {
                this.defaultPrevented = true;
            }
        };
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
        this.listeners.remove(listener);
    }

    clearListeners()
    {
        this.listeners.clear();
    }
}
