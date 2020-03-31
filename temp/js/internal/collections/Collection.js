function Collection(parent, id, attributes) {
  this.id = id;
  this.attributes = attributes;
  this.objects = [];

  // TODO would be nice to extend Updateable and Drawable. (inherit update and draw methods)
  this.update = function(input) {

      for (let i = this.objects.length - 1; i >= 0; i--) {
        this.objects[i].update(input);
        //REMOVE IF DEAD
        if (this.objects[i].dead === true) {
          this.objects.splice(i, 1);
        }
      }
    };
  this.draw = function(ctx) {
      loopFor(this.objects, 'draw', ctx);
    };
  //
  this.add = function(value) {
      this.objects.push(value);
    };

}
