function TimedGenerator(time, generatorFunction, targetCollectionFunction) {
  this.generatorFunction = generatorFunction;
  this.targetCollectionFunction = targetCollectionFunction;
  this.timer = new TimedEvent(time, 1, this, 'gen');
  this.update = function() {
      this.timer.update();
    };
  this.gen = function() {
      let newObj = this.generatorFunction();
      this.targetCollectionFunction().push(newObj);
    };

}
