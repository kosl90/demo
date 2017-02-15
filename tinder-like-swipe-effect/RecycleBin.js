class RecycleBin {
  constructor(ctor, predefinedNum) {
    this.ctor = ctor;
    const num = predefinedNum >= 0 ? predefinedNum : 0;
    this.bins = new Array(num);
    for (let i = 0; i < num; ++i) {
      this.bins[i] = ctor();
    }
  }

  peek() {
    if (this.isEmpty()) {
      return null;
    }
    return this.bins.splice(0, 1);
  }

  peekNewIfNeeded() {
    return this.peek() || this.ctor();
  }

  add(bin) {
    if (bin) {
      this.bins.push(bin);
    }
  }

  isEmpty() {
    return this.bins.length === 0;
  }

  length() {
    return this.bins.length;
  }
}
