Array.prototype.add = Array.prototype.push;

Array.prototype.addAll = function(items)
{
    if (Array.isArray(items))
    {
        items.forEach(item =>
        {
            this.push(item);
        });
    }
    else
    {
        throw new Error("items must be an array.");
    }
};

Array.prototype.insert = function(startIndex, item)
{
    this.splice(startIndex, 0, item);
    return true;
};

Array.prototype.insertBefore = function(item, beforeItem)
{
    const index = this.indexOf(beforeItem);
    if (index === -1)
    {
        return false;
    }

    this.insert(index, item);
    return true;
};

Array.prototype.insertAfter = function(item, afterItem)
{
    const index = this.indexOf(afterItem);
    if (index === -1)
    {
        return false;
    }
    else if (index === this.length)
    {
        this.add(item);
        return true;
    }
    else
    {
        this.insert(index + 1, item);
        return true;
    }
};

Array.prototype.remove = function(item)
{
    return this.removeAt(this.indexOf(item));
};

Array.prototype.removeAt = function(index)
{
    if (index >= 0 && index < this.length)
    {
        this.splice(index, 1);
        return true;
    }
    else
    {
        return false;
    }
};


Array.prototype.clear = function()
{
    if (this.length > 0)
    {
        this.splice(0, this.length);
    }
};

Array.prototype.clone = function()
{
    return this.slice(0, this.length);
};
