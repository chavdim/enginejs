function ActionWithCooldown(cooldownTime, parent, actionMethodName) {
  this.cooldownTime = cooldownTime;
  this.cooldownTimer = 0;
  this.parent = parent;
  this.actionMethodName = actionMethodName;

  this.update = function() {
      if (this.cooldownTimer !== 0) {
        this.cooldownTimer -= 1; // TODO maybe take as param
      }
    };
  this.doAction = function(params) {
      if (this.cooldownTimer === 0) {
        this.parent[actionMethodName](params);
        this.cooldownTimer = this.cooldownTime;
      }
    };
}
