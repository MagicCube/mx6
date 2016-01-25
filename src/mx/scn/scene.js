import ViewContainer from "../view/view-container";

export default class Scene extends ViewContainer
{
    _path = null;

    constructor(id, { path = null } = {})
    {
        super(id);
        if (typeof(path) === "string")
        {
            this._path = path;
        }
        this.addClass("mx-scene");
    }

    get path()
    {
        return this._path;
    }

    activate(args)
    {

    }
}
