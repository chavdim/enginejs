function TimedEvent(time, countDownBy, parent, onZero) {
  this.time = time;
  this.timeCounter = time;
  this.countDownBy = countDownBy;
  this.onZero = onZero;
  this.active = 1;
  this.update = function() {
      if (this.active === 0) {
        return;
      }
      this.timeCounter -= this.countDownBy;
      if (this.timeCounter <= 0) {
        parent[onZero]();
        this.timeCounter = this.time;
      }
    };
}

class CollisionHandler {
  constructor(name, objList1, objList2, parent, onCollisionEvents, collisionDetectionFunction) {
    this.name = name;
    this.objList1 = objList1;
    this.objList2 = objList2;
    this.parent = parent;
    this.onCollisionEvents = onCollisionEvents;
    this.collisionDetectionFunction = collisionDetectionFunction;
    this.collisionState = false;

  }

  update() {
    this.collisionState = false;
    for (let i = this.objList1().length - 1; i >= 0; i--) {
      let o1 = this.objList1()[i];
      for (let ii = this.objList2().length - 1; ii >= 0; ii--) {
        let o2 = this.objList2()[ii];
        if (this.collisionDetectionFunction(o1.rect, o2.rect)) {
          for (let j = 0; j < this.onCollisionEvents.length; j++) {
            this.onCollisionEvents[j].apply(o1, o2);
            this.collisionState = true;

          }
          break;
        }
      }
    }
  }

}

function EventTrigger(var1, type, var2, onEvent) {
  if (type === '<') {
    if (var1 < var2) {
      onEvent();
    }
  }
  if (type == '<=') {
    if (var1 <= var2) {
      onEvent();
    }
  }
  if (type == '>') {
    if (var1 > var2) {
      onEvent();
    }
  }
  if (type == '>=') {
    if (var1 >= var2) {
      onEvent();
    }
  }
  if (type == '==') {
    if (var1 == var2) {
      onEvent();
    }
  }
  if (type == '!=') {
    if (var1 != var2) {
      onEvent();
    }
  }
}

function Button(visible, text, x, y, w, h, onclick) {
  this.x = x;
  this.y = y;
  this.w = w;
  this.h = h;
  this.onclick = onclick;
  this.visible = visible;
  this.rect = new Rect(x, y, w, h);
  this.protoTypeText = text;
  this.pressable = 1;
  this.update = function(inputList) {
      input = inputList[0];
      processed = inputList[2].mouseProcessed; // TODO recieve inputHandler object?
      this.rect.setTo(this.x, this.y);
      if (processed == 0) {
        if (this.pressable == 1 && pointInRect(input.pageX - 10, input.pageY - 10, this.rect)) {
          console.log('pressed');
          this.onclick();
        }
      }
    };
  this.draw = function(ctx) {
      ctx.fillStyle = 'black';
      if (this.visible == 1) {
        this.rect.draw(ctx);
        write(ctx, this.protoTypeText, this.x + 10, this.y + 30, 'white', 20);

      }
      //this.rect.draw(ctx);
      //write(ctx,this.protoTypeText,this.x+10,this.y+30,"white",20);
      if (this.pressable == 0) {
        var original = ctx.globalAlpha;
        ctx.globalAlpha = 0.5;
        ctx.fillStyle = 'black';
        ctx.fillRect(this.x - 1, this.y, this.w + 1, this.h);
        ctx.globalAlpha = original;
      }
    };
}

function write(ctx, text, x, y, color, size) {
  ctx.fillStyle = color;
  ctx.font = 'bold ' + size.toString() + 'px sans-serif';
  ctx.fillText(text, x, y);
}

function writeCenter(ctx, text, x, y, color, size) {
  ctx.fillStyle = color;
  ctx.font = 'bold ' + size.toString() + 'px customFont';
  //
  var w = ctx.measureText(text).width;
  ctx.fillText(text, x - (w / 2), y);
}

//Splatter effect
function BloodDrop(x, y, size, speedX, speedY, yMax, color) {
  this.x = x;
  this.y = y;
  this.size = size;
  this.color = color;

  this.circle = new Circle(this.x - (this.size / 2), this.y - (this.size / 2), this.size);
  this.dead = 0;
  this.speedX = speedX;
  this.speedY = speedY;
  this.yMax = yMax;
  this.defaultGravity = 1;

  this.update = function(param) {
      if (this.speedY < this.yMax) {
        var g = 0;
        console.log(typeof param['gravity']);
        if (typeof param['gravity'] === 'undefined') {
          g = this.defaultGravity;
        } else {
          g = param['gravity'];
        }
        this.speedY += g;
      }
      this.x += this.speedX;
      this.y += this.speedY;
      this.circle.set(this.x, this.y);
      //

    };
  this.draw = function(ctx) {
      this.circle.draw(ctx, this.color);
    };
}

//CIRCLES
function Circle(x, y, r) {
  this.x = x;
  this.y = y;
  this.r = r;
  this.dead = 0;
  this.set = function(x, y) {
      this.x = x;
      this.y = y;
    };
  this.update = function(ctx, color) {
      this.draw(ctx, color);
    };
  this.draw = function(ctx, color) {
      drawCircle(this.x, this.y, this.r, color, ctx);
    };
}

function drawCircle(x, y, r, color, ctx) {
  ctx.beginPath();
  ctx.arc(x, y, r, 0, 2 * Math.PI, false);
  ctx.fillStyle = color;
  ctx.fill();
}

function cutCircle(context, x, y, radius) {
  context.globalCompositeOperation = 'destination-out';
  context.arc(x, y, radius, 0, Math.PI * 2, true);
  context.fill();
}

//RECT
function Rect(x, y, w, h) {
  this.x = x;
  this.y = y;
  this.w = w;
  this.h = h;
  //
  this.left = this.x;
  this.right = this.x + this.w;
  this.top = this.y;
  this.bottom = this.y + this.h;
  //
  this.set = function() {
      this.left = this.x;
      this.right = this.x + this.w;
      this.top = this.y;
      this.bottom = this.y + this.h;
      return this;
    };
  this.setTo = function(x, y) {
      this.x = x;
      this.y = y;
      //
      this.left = this.x;
      this.right = this.x + this.w;
      this.top = this.y;
      this.bottom = this.y + this.h;
      return this;
    };
  this.setSize = function(w, h) {
      this.w = w;
      this.h = h;
      this.right = this.x + this.w;
      this.bottom = this.y + this.h;
      this.top = this.y;
      this.left = this.x;
    };
  this.draw = function(ctx) {
      ctx.fillRect(this.x, this.y, this.w, this.h);
      if (this.w >= 20) {
        ctx.strokeStyle = 'black';
        ctx.strokeRect(this.x, this.y, this.w, this.h);
      }
    };
}

function pointInRect(x, y, rect) {
  if (x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom) {
    return true;
  } else if (rect.h < 0 && rect.w > 0) {
    if (x > rect.left && x < rect.right && y < rect.top && y > rect.bottom) {
      return true;
    }
  } else if (rect.h > 0 && rect.w < 0) {
    if (x < rect.left && x > rect.right && y > rect.top && y < rect.bottom) {
      return true;
    }
  } else if (rect.h < 0 && rect.w < 0) {
    if (x < rect.left && x > rect.right && y < rect.top && y > rect.bottom) {
      return true;
    }
  } else {
    return false;
  }
}

function rectCollision(rect1, rect2) {
  var rp1 = [[rect1.x, rect1.y], [rect1.x + rect1.w, rect1.y], [rect1.x, rect1.y + rect1.h],
      [rect1.x + rect1.w, rect1.y + rect1.h]];
  var rp2 = [[rect2.x, rect2.y], [rect2.x + rect2.w, rect2.y], [rect2.x, rect2.y + rect2.h],
      [rect2.x + rect2.w, rect2.y + rect2.h]];

  for (var i = 0; i < rp1.length; i++) {
    if (pointInRect(rp1[i][0], rp1[i][1], rect2) == true) {
      return true;
    }
  }
  for (var i = 0; i < rp2.length; i++) {
    if (pointInRect(rp2[i][0], rp2[i][1], rect1) == true) {
      return true;
    }
  }
  return false;
}

function loopFor(objArray, toCall, withParams = null) {
  if (withParams) {
    objArray.forEach(o => {
        o[toCall](withParams);
      });
  } else {
    objArray.forEach(o => {
        o[toCall]();
      });
  }
}

/*
    this.addFromMap=function  () {
        //console.log("add from map");
        //TRY CATCH resets stage when no more objects in current map
        //try{
            //REPEATING
            if (this.repeated==this.stageData["objects"][this.timeStep][0][0]) {
                this.timeStep+=1;
                this.repeated=0;
            };
            for (var i = this.stageData["objects"][this.timeStep].length - 1; i >= 1; i--) {
                var y=this.stageData["objects"][this.timeStep][i][2];
                var speed=this.stageData["objects"][this.timeStep][i][3];
                //ADD ENEMIES
                if ( this.stageData["objects"][this.timeStep][i][0]==0) {
                    this.dynamicObjects["enemies"].push(new Enemy(-this.enemySize,y,this.enemySize,speed));
                }
                //ADD CHICKEN
                else if (this.stageData["objects"][this.timeStep][i][0]==1) {
                    this.dynamicObjects["boosts"].push(new Boost(-this.enemySize+this.stageData["objects"][this.timeStep][i][0],y,this.enemySize,speed,this.boostAdd));
                };
            };
            this.repeated+=1;
        //}
        //catch(e){
        //  console.log(e);
            //this.stageEnded()
        //};

    }*/
