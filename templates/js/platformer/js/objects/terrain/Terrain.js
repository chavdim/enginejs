class Terrain extends StaticObject {
  constructor(x, y, w, h , imgSrc, collections, inputMap) { // TODO add actions[]?
    super(x, y, w, h, imgSrc, inputMap);
    // Custom
    this.collections = collections;
  }

  updateCustom(input) {
  }

}
