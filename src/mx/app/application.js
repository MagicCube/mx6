import ViewContainer from "../view/view-container";

export default class Application extends ViewContainer
{
    constructor(id)
    {
        super(id);
        this.addClass("mx-app");
    }

    run(args)
    {

    }
}
