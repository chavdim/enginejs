function RandomRangeGenerator(fromValue, toValue, interval) {

    this.fromValue =fromValue;
    this.toValue = toValue;
    this.interval = interval;

    this.getValue = function () {
        // TODO implement from and interval
        return Math.floor(Math.random() * Math.floor(this.toValue));
    }

}
