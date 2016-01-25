import View from "../view/view";

export default class ViewContainer extends View
{
    constructor(id)
    {
        super(id);

        // Treat children as a READ-ONLY array.
        this._initSubviews();

        this._$container = this.$element;
    }


    _initSubviews()
    {
        this._subviews.length = Array.prototype.length;
        this._subviews.indexOf = Array.prototype.indexOf;
        this._subviews.includes = Array.prototype.includes;
        this._subviews.forEach = Array.prototype.forEach;
        this._subviews.map = Array.prototype.map;
        this._subviews.reduce = Array.prototype.reduce;
        this._subviews.clone = Array.prototype.clone;
        this._subviews.slice = Array.prototype.slice;
        this._subviews.splice = Array.prototype.splice;
    }

    _subviews = {};
    get subviews()
    {
        return this._subviews;
    }
    set subviews(subviews)
    {
        this.clearSubviews();
        this.addSubviews(subviews);
    }


    _$container = null;
    get $container()
    {
        return this._$container;
    }
    set $container($container)
    {
        this._$container = $container;
    }



    containsSubview(view)
    {
        if (typeof(view) === "string" || typeof(view) === "number")
        {
            view = this.subviews[view];
        }
        if (view instanceof View)
        {
            return this.subviews.indexOf(view) !== -1;
        }
        else
        {
            return false;
        }
    }

    addSubview(view)
    {
        if (typeof(view) === "undefined" || view === null)
        {
            throw new Error("view can not be null or undfined.");
        }
        if (!(view instanceof View))
        {
            throw new Error("view must be an instance of View.");
        }

        if (this.subviews.indexOf(view) !== -1)
        {
            return;
        }

        if (view.parent !== null)
        {
            view.removeFromParent();
        }

        view._parent = this;
        Array.prototype.push.apply(this.subviews, [ view ]);
        if (view.id)
        {
            this.subviews[view.id] = view;
        }

        view.placeAt(this.$container);
    }

    addSubviews(views)
    {
        if (typeof(views.forEach) !== "function")
        {
            throw new Error("views must at least have `forEach` function.");
        }
        views.forEach(view => {
            this.addSubview(view);
        });
    }

    removeSubview(view)
    {
        if (typeof(view) === "undefined" || view === null)
        {
            throw new Error("view can not be null or undfined.");
        }
        if (!(view instanceof View))
        {
            throw new Error("view must be an instance of View.");
        }

        view._parent = null;
        const index = this.subviews.indexOf(view);
        if (index === -1)
        {
            return false;
        }
        this.subviews.splice(index, 1);

        if (view.id)
        {
            this.subviews[view.id] = null;
            delete this.subviews[view.id];
        }

        view.$element.detach();
        return true;
    }

    clearSubviews()
    {
        while (this.subviews.length > 0)
        {
            this.removeSubview(this.subviews[0]);
        }
    }
}
