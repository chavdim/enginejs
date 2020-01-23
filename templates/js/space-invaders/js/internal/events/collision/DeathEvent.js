function killFirstObjectOnCollision(obj1, obj2) {
  // has obj2 as param due to collisionHandler returning 2 collided objects
  obj1.dead = true;
}

class KillBothObjectsOnCollision {
  apply(obj1, obj2) {
    // has obj2 as param due to collisionHandler returning 2 collided objects

    obj1.dead = true;
    obj2.dead = true;
  }
}
