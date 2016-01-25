import Component from "../com/component";

export default class View extends Component
{
    constructor(id)
    {
        super(id);

        // Treat children as a READ-ONLY array.
        this._initSubviews();

        this._$element = jQuery("<div>");
        this.$element.data("view", this);

        this._$container = this.$element;

        if (id)
        {
            this.setId(id);
        }
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


    setId(id)
    {
        super.setId(id);

        const oldId = super._id;

        if (typeof(oldId) === "string" && this.parent)
        {
            delete this.parent.subviews[oldId];
        }

        if (this.$element)
        {
            this.$element.attr("id", this.id);
        }
        if (this.parent)
        {
            this.parent.subviews[this.id] = this;
        }
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


    _frame = null;
    get frame()
    {
        return this._frame;
    }
    set frame(frame)
    {
        this.setFrame(frame, true);
    }


    _$element = null;
    get $element()
    {
        return this._$element;
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
            return this.subviews.includes(view);
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
        Array.prototype.add.apply(this.subviews, [ view ]);
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
        Array.prototype.removeAt.apply(this.subviews, [ this.subviews.indexOf(view) ]);
        if (view.id)
        {
            this.subviews[view.id] = null;
            delete this.subviews[view.id];
        }

        view.$element.detach();
    }

    removeFromParent()
    {
        if (this.parent)
        {
            this.parent.removeSubview(this);
        }
    }

    clearSubviews()
    {
        while (this.subviews.length > 0)
        {
            this.removeSubview(this.subviews[0]);
        }
    }




    placeAt(place)
    {
        if (place instanceof jQuery)
        {
            place.append(this.$element);
        }
        else
        {
            jQuery(place).append(this.$element);
        }
    }



    setFrame(frame, reset = false)
    {
        if (!this.$element)
        {
            return;
        }
        if (!frame)
        {
            frame = {};
        }

        if (reset)
        {
            this._frame = frame;
        }
        else
        {
            if (this._frame)
            {
                $.extend(this._frame, frame);
            }
        }


        this.css(frame);
        if (notEmpty(frame.left) || notEmpty(frame.right) || notEmpty(frame.top) || notEmpty(frame.bottom))
        {
            this.css("position", "absolute");
        }
    };





    $(...args)
    {
        return this.$element.find(...args);
    }

    addClass(...args)
    {
        return this.$element.addClass(...args);
    }

    removeClass(...args)
    {
        return this.$element.removeClass(...args);
    }

    toggleClass(...args)
    {
        return this.$element.toggleClass(...args);
    }

    show(...args)
    {
        return this.$element.show(...args);
    }

    hide(...args)
    {
        return this.$element.hide(...args);
    }

    fadeIn(...args)
    {
        return this.$element.fadeIn(...args);
    }

    fadeOut(...args)
    {
        return this.$element.fadeOut(...args);
    }

    animate(...args)
    {
        return this.$element.animate(...args);
    }

    transit(...args)
    {
        return this.$element.transit(...args);
    }

    transition(...args)
    {
        return this.$element.transition(...args);
    }

    css(...args)
    {
        return this.$element.css(...args);
    }

    offset(...args)
    {
        return this.$element.offset(...args);
    }

    width()
    {
        return this.$element.width();
    }

    height()
    {
        return this.$element.height();
    }
}


function notEmpty(a)
{
    return typeof(a) !== "undefined" && a !== null;
}
