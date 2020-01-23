function RandomGenerator(generatorFunction, targetCollectionFunction) {
  this.generatorFunction = generatorFunction;
  this.targetCollectionFunction = targetCollectionFunction;

  this.gen = function() {
      let newObj = this.generatorFunction();
      this.targetCollectionFunction().add(newObj);
    };
}
