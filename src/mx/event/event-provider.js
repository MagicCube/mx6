import Event from "./event";

export default class EventProvider
{
    getEvent(eventType)
    {
        if (this.hasEvent(eventType))
        {
            if (this["on" + eventType] === null)
            {
                this["on" + eventType] = new Event(eventType, this);
            }
            return this["on" + eventType];
        }
        else
        {
            return null;
        }
    }

    hasEvent(eventType)
    {
        if (typeof(eventType) !== "string")
        {
            throw new Error("eventType must be a string.");
        }
        return this["on" + eventType] instanceof Event || this["on" + eventType] === null;
    }

    on(eventType, listener)
    {
        if (typeof(listener) !== "function")
        {
            throw new Error("listener must be a function.");
        }
        const event = this.getEvent(eventType);
        if (event)
        {
            event.addListener(listener);
        }
        else
        {
            throw new Error(`"${eventType}" event is not found.`);
        }
    }

    off(eventType, listener = null)
    {
        const event = this.getEvent(eventType);
        if (event)
        {
            if (listener !== null)
            {
                event.removeListener(listener);
            }
            else
            {
                event.clearListeners();
            }
        }
        else
        {
            throw new Error(`"${eventType}" event is not found.`);
        }
    }

    trigger(eventType, args = {})
    {
        const event = this.getEvent(eventType);
        if (event)
        {
            return event.trigger(args);
        }
        else
        {
            throw new Error(`"${eventType}" event is not found.`);
        }
    }
}
