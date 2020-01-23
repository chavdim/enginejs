class StageCreator {
  constructor() {
    this.menuObj = [
        new Button(1, 'menu', 5, 5, 80, 50, function func() {
            master.loopCollection.changeActiveLoop(0);
          })
    ];
    this.generators =
        [
            new TimedGenerator(
                40,
                function() {
                    // TODO get width from better place. config?
                    return new EnemyShip(
                        new RandomRangeGenerator(0, master.canvas.width, 1),
                        -50, -40, 6, '');
                  },
                function() {
                    return master.loopCollection['loops'][1].dynamicObjects['enemyShips'];
                  })// TODO way to not have to index loops
        ];

    this.visualObj = [];
    this.dynamicObj = {
        'ships': [
            new PlayerShip(100, 590, 30, 1.0, '', 8, 8,
                [new Collection(parent = this, 'bullets', {})],
                // button key : [keydown, keyup]
                new InputMapping({
                        'a': ['moveLeft', 'decelerate'],
                        'd': ['moveRight', 'decelerate'],
                        'w': ['moveUp', 'decelerate'],
                        's': ['moveDown', 'decelerate'],
                        ' ': ['shoot', null]
                      },
                    function() {
                        return master.loopCollection['loops'][1].dynamicObjects['ships'][0]; // TODO fix dangerous indexing
                      }
                )
            )
        ],
        'enemyShips': []
      };
    this.collisionHandlers = [
        new CollisionHandler('enemyShipToBullet',
            function() {
                return master.loopCollection['loops'][1].dynamicObjects['enemyShips'];
              },
            function() {
                const o = master.loopCollection['loops'][1].dynamicObjects['ships'][0];
                if (o) {
                  return o.collections[0].objects;
                } else {
                  return [];
                }//TODO do in better way?
              },
            function() {
                return master.loopCollection['loops'][1];
              }, // TODO better way to indicate parent
            [new KillBothObjectsOnCollision()],
            rectCollision),

        new CollisionHandler('playerToEnemy',
            function() {
                return master.loopCollection['loops'][1].dynamicObjects['ships'];
              },
            function() {
                return master.loopCollection['loops'][1].dynamicObjects['enemyShips'];
              },
            function() {
                return master.loopCollection['loops'][1];
              },
            [new KillBothObjectsOnCollision(), new ChangeValueEvent(master.loopCollection, 'changeActiveLoop', 0)],
            rectCollision)
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
