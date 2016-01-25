import Component from "../com/component";

export default class View extends Component
{
    constructor(id)
    {
        super(id);
        this._$element = jQuery("<div>");
        this.$element.data("view", this);

        if (id)
        {
            this.setId(id);
        }
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





    removeFromParent()
    {
        if (this.parent)
        {
            this.parent.removeSubview(this);
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
                jQuery.extend(this._frame, frame);
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
