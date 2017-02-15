class SwipeApp {
  constructor() {
    this.MAX_ROTATE_DEG = 30;
    this.target = null;
    this.bcr = null;
    this.currentX = 0;
    this.currentY = 0;
    this.startX = 0;
    this.startY = 0;
    this.likeIt = false;

    this.isDragging = false;

    this.recycleBin = new RecycleBin(_ => {
      document.createElement('img');
    }, 2);

    this.onStart = this.onStart.bind(this);
    this.onMove = this.onMove.bind(this);
    this.onEnd = this.onEnd.bind(this);
    this.update = this.update.bind(this);

    this.addEventListeners();

    requestAnimationFrame(this.update);
  }

  addEventListeners() {
    document.addEventListener('mousedown', this.onStart);
    document.addEventListener('mousemove', this.onMove, {
      passive: false
    });
    document.addEventListener('mouseup', this.onEnd);
    document.addEventListener('touchstart', this.onStart);
    document.addEventListener('touchmove', this.onMove, {
      passive: false
    });
    document.addEventListener('touchend', this.onEnd);
  }

  onStart(evt) {
    const target = evt.target;
    if (!target.classList.contains('pic')) {
      return;
    }

    target.style.willChange = 'transform';

    this.isDragging = true;
    this.target = target;
    this.bcr = target.getBoundingClientRect();
    this.startX = evt.pageX || evt.touches[0].pageX;
    this.startY = evt.pageY || evt.touches[0].pageY;
    this.currentX = this.startX;
    this.currentY = this.startY;
  }

  onMove(evt) {
    if (!evt.target.classList.contains('pic')) return;
    evt.preventDefault();
    this.currentX = evt.pageX || evt.touches[0].pageX;
    this.currentY = evt.pageY || evt.touches[0].pageY;
  }

  onEnd(evt) {
    if (!this.target) {
      return;
    }

    this.isDragging = false;
    const style = this.target.style;
    // style.opacity = 1;
    style.transform = '';
    style.willChange = '';
  }

  update() {
    requestAnimationFrame(this.update);

    if (!this.isDragging) {
      return;
    }

    if (!this.target) {
      return;
    }

    const target = this.target;
    const style = target.style;

    // magic is good
    const width = this.bcr.width;
    const threshold = width * 0.75;
    let shouldGoAway = false;
    if (Math.abs(this.currentX - this.startX) > threshold) {
      const a = width;
      shouldGoAway = true;
    }

    const distanceX = this.currentX - this.startX;
    const distanceY = this.currentY - this.startY;
    const deg = distanceX / threshold * this.MAX_ROTATE_DEG;
    console.log('distance:', distanceX, 'threshold:', threshold, 'deg:', deg);
    style.transform = `translate(${distanceX}px, ${distanceY}px) rotate(${deg}deg)`;


    // if (!shouldGoAway) {
    //   style.transform = '';
    //   style.opacity = 1;
    //   requestAnimationFrame(_ => {
    //     if (this.target) this.target.style.willChange = '';
    //   });
    //   return;
    // }

    if (shouldGoAway) {
      // style.opacity = 1;
      // TODO:
      style.transform = `translateX(${0}px) rotate(${0} deg)`;
      return;
    }
  }
}

new SwipeApp();