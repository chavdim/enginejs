class StageCreator {
  constructor() {
    this.menuObj = [
        new Button(1, 'menu', 5, 5, 80, 50, function func() {
            master.loopCollection.changeActiveLoop(0);
          })
    ];
    this.generators = [];

    this.visualObj = [];
    this.dynamicObj = {
        'player': [
            new Player(100, 200, 30, 1.0, '', 8, 8, 1,
                [new Collection(parent = this, 'bullets', {})],
                // button key : [keydown, keyup]
                new InputMapping({
                        'a': ['moveLeft', 'decelerate'],
                        'd': ['moveRight', 'decelerate'],
                        'w': ['moveUp', 'decelerate'],
                        's': ['moveDown', 'decelerate'],
                        ' ': ['jump', null]
                      },
                    function() {
                        // TODO fix dangerous indexing
                        return master.loopCollection.loops[1]
                            .dynamicObjects.player[0];
                      }
                )
            )
        ],
        'enemies': [],

        'terrain': [
            new Terrain(0, 390, 200, 8,'',
                [],
                // button key : [keydown, keyup]
                new InputMapping({},
                    function() {
                        // TODO fix dangerous indexing
                        return master.loopCollection.loops[1].dynamicObjects.terrain[0];
                      }
                )
            ),
            new Terrain(300, 390, 400, 8,'',
                [],
                // button key : [keydown, keyup]
                new InputMapping({},
                    function() {
                        // TODO fix dangerous indexing
                        return master.loopCollection.loops[1].dynamicObjects.terrain[0];
                    }
                )
            )
        ]
      };
    this.collisionHandlers = [
        new CollisionHandler('playerTerrain',
            function() {
                return master.loopCollection.loops[1].dynamicObjects.player;
              },
            function() {
                return master.loopCollection.loops[1].dynamicObjects.terrain;
              },
            function() {
                return master.loopCollection.loops[1];
              }, // TODO better way to indicate parent
            [
                new ChangeValueEvent2(function() {
                    return master.loopCollection.loops[1].dynamicObjects.player[0];
                  }, 'changeAy', 0),
                new ChangeValueEvent2(function() {
                    return master.loopCollection.loops[1].dynamicObjects.player[0];
                  }, 'resetTick', 'y')],
            rectCollision),
    ];
  }

  // getters
  getMenuObjects() {
    return this.menuObj;
  };

  getVisualObjects() {
    return this.visualObj;
  };

  getDynamicObjects() {
    return this.dynamicObj;
  };

  getGenerators() {
    return this.generators;
  };

  getCollisionHandlers() {
    return this.collisionHandlers;
  }

}
