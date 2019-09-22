function killFirstObjectOnCollision(obj1, obj2) {
    // has obj2 as param due to collisionHandler returning 2 collided objects
    obj1.dead = true;
}
function killBothObjectsOnCollision(obj1, obj2) {
    // has obj2 as param due to collisionHandler returning 2 collided objects

    obj1.dead = true;
    obj2.dead = true;
}

