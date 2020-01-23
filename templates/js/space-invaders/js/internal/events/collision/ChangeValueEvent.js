class ChangeValueEvent {
  // TODO inherit obj1, obj2?. ObjectsCollisionEvent?
  constructor(changeTarget, changeMethod, changeTo) {
    console.log(changeTarget);
    this.changeTarget = changeTarget;
    console.log(this.changeTarget);
    this.changeMethod = changeMethod;
    this.changeTo = changeTo;
  }

  // has obj2 as param due to collisionHandler returning 2 collided objects
  apply(obh1, obj2) {
    this.changeTarget[this.changeMethod](this.changeTo);
  }
}
