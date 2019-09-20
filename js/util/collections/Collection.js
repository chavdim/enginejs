function Collection(parent, id, attributes) {
    this.id = id;
    this.attributes = attributes;
    this.objects = [];

    // TODO would be nice to extend Updateable and Drawable. (inherit update and draw methods)
    this.update = function (input) {
        loopFor(this.objects, 'update', input);
    };
    this.draw = function (ctx) {
        loopFor(this.objects, 'draw', ctx);
    };
    //
    this.add = function (value) {
        this.objects.push(value)
    }
}
