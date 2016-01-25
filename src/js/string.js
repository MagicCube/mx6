if (!String.prototype.includes)
{
    String.prototype.includes = function(substring)
    {
        return this.indexOf(substring) !== -1;
    };
}

if (!String.prototype.startsWith)
{
    String.prototype.startsWith = function(substring)
    {
        return this.indexOf(substring) === 0;
    };

    String.prototype.endsWith = function(substring)
    {
        return this.substring(this.length - substring.length) === substring;
    };
}
