class ChangeValueEvent {
  // TODO inherit obj1, obj2?. ObjectsCollisionEvent?
  constructor(changeTarget, changeMethod, changeTo) {
    this.changeTarget = changeTarget;
    this.changeMethod = changeMethod;
    this.changeTo = changeTo;
  }

  // has obj2 as param due to collisionHandler returning 2 collided objects
  apply(obh1, obj2) {
    this.changeTarget[this.changeMethod](this.changeTo);
  }
}

class ChangeValueEvent2 {
  // TODO inherit obj1, obj2?. ObjectsCollisionEvent?
  constructor(changeTarget, changeMethod, arg) {
    this.changeTarget = changeTarget;
    this.changeMethod = changeMethod;
    this.arg = arg;
  }

  // has obj2 as param due to collisionHandler returning 2 collided objects
  apply(obh1, obj2) {
    this.changeTarget()[this.changeMethod](this.arg);
  }
}
