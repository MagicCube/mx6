import EventProvider from "../event/event-provider";

export default class Component extends EventProvider
{
    constructor(id = null)
    {
        super();

        if (id !== null && typeof(id) !== "string")
        {
            throw new Error("Component's id must be a string.");
        }

        if (id)
        {
            this.setId(id);
        }
    }


    _id = null;
    get id()
    {
        return this._id;
    }
    setId(id)
    {
        if (typeof(id) !== "string")
        {
            throw new Error("id must be a string.");
        }
        this._id = id;
    }


    _parent = null;
    get parent()
    {
        return this._parent;
    }



    toString()
    {
        return this.constructor.name + (this.id ? "#" + this.id : "");
    }
}
