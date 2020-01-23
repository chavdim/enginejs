class Loop {
  constructor(creator) {
    this.currentVisualObjects = [];
    this.currentMenuObjects = [];
    this.gameAttributes = {}; //TODO
    this.dynamicObjects = {};
    //TIMERS
    this.timers = [];
    this.creator = creator;

  }

  //OBJECTS
  // this.creator = new StageSelectCreator();

  //this.timers.push(new TimedEvent (time, countDownBy, parent, onZero) );

  init() {
    this.loadBaseData();
    this.loadPlayerData();
  }

  // Todo loads saved files (progression) ect
  loadPlayerData () {}

  loadBaseData () {
    this.generators = [...this.creator.getGenerators()];
    this.collisionHandlers = [...this.creator.getCollisionHandlers()];
    this.currentVisualObjects = [...this.creator.getVisualObjects()];
    // this.gameAttributes = attributes;
    this.dynamicObjects = Object.assign({}, this.creator.getDynamicObjects());
    this.currentMenuObjects = [...this.creator.getMenuObjects()];
  }

  update (input, param) {
    //UPDATE OBJECTS
    loopFor(this.generators, 'update');
    loopFor(this.collisionHandlers, 'update');

    loopFor(this.currentMenuObjects, 'update', input);
    //UPDATE OBJECTS IN DICT
    for (let key in this.dynamicObjects) {
      for (let i = this.dynamicObjects[key].length - 1; i >= 0; i--) {
        this.dynamicObjects[key][i].update(input);
        this.dynamicObjects[key][i].updateCustom(input);

        //REMOVE IF DEAD
        if (this.dynamicObjects[key][i].dead === true) {
          this.dynamicObjects[key].splice(i, 1);
        }
      }
    }
    //UPDATE TIMED EVENTS
    loopFor(this.timers, 'update');
    //GAME SPECIFIC////////////////////////////////////////////////////////////////////////////////////////

    //COLLISION EVENTS
    /*CollisionHandler ("playerToEnemy",this.dynamicObjects["players"],this.dynamicObjects["enemies"],
        this,"collidedWithEnemy",rectCollision);
    */
    //EventTrigger (1,">",0,this.func)
  }

  draw (ctx) {
    loopFor(this.currentVisualObjects, 'draw', ctx);
    //DRAW OBJECTS IN DICT
    for (let key in this.dynamicObjects) {
      loopFor(this.dynamicObjects[key], 'draw', ctx);
    }
    loopFor(this.currentMenuObjects, 'draw', ctx);
  }

}
