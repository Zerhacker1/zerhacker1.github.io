export class GeneralSet<Type> {
  map: Map<String, Type>;

  constructor() {
    this.map = new Map();
  }

  add(item: Type)  {
    this.map.set(this.toIdString(item), item);
  }

  values() {
    return this.map.values();
  }

  delete(item: Type) {
    return this.map.delete(this.toIdString(item));
  }

  toIdString(item: Type): string {
    return JSON.stringify(item);
  } 
}