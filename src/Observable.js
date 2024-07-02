class Observable {
  constructor() {
    this.observers = [];
  }

  subscribe(f) {
    this.observers.push(f);
  }
  unsubscribe(f) {
    this.observers = this.observers.filter((subs) => subs !== f);
  }

  notify(data) {
    this.observers.forEach((observer) => observer(data));
  }
}

export default new Observable();
