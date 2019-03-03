class IdGenerator {
  constructor() {
    this.current = 0;
  }

  get id() {
    this.current += 1;
    return `${this.current}`;
  }
}

const instance = new IdGenerator();

export default instance;
