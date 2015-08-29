/**
 * Created by Michael on 28.08.2015.
 */
function Content(text){
    this.text = text;
}
Content.prototype.constructor = Content;
Content.prototype.deleteContent = function() {
    for(var i in this){
        delete this[i];
    }
};
Content.prototype.showContent = function() {
    return this.text;
};

module.exports = Content;