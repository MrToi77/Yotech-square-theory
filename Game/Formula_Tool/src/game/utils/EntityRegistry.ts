// EntityRegistry.ts

export interface Constructor<T> {
  new (...args: any[]): T;
}

export interface DTOConstructor<T> {
  new (data: any): T;
}

export interface ViewConstructor<V, D> {
  new (id: number, scene: Phaser.Scene, dto: D): V;
}

export class EntityRegistry {
  private static dtoMap: Record<string, DTOConstructor<any>> = {};
  private static viewMap: Record<string, ViewConstructor<any, any>> = {};

  static register<T, V>(
    type: string,
    dtoCtor: DTOConstructor<T>,
    viewCtor: ViewConstructor<V, T>
  ) {
    this.dtoMap[type] = dtoCtor;
    this.viewMap[type] = viewCtor;
  }

  static createDTO<T = any>(type: string, data: any): T {
    const ctor = this.dtoMap[type];
    if (!ctor) throw new Error(`DTO class not found for type '${type}'`);
    return new ctor(data);
  }

  static createView<V = any>(id: number, type: string, scene: Phaser.Scene, dto: any): V {
    const ctor = this.viewMap[type];
    if (!ctor) throw new Error(`View class not found for type '${type}'`);
    return new ctor(id, scene, dto);
  }

  static hasType(type: string): boolean {
    return !!this.dtoMap[type] && !!this.viewMap[type];
  }

  static listRegisteredTypes(): string[] {
    return Object.keys(this.dtoMap);
  }
}
