export class BaseRepository<T> {
  async find(id: string | number): Promise<T | undefined> {
    return { id } as unknown as T;
  }

  async all(...args: any): Promise<T[]> {
    throw args;
  }

  async create(...args: any): Promise<T> {
    return { ...args } as T;
  }

  async update(id: string | number, data: Partial<T>): Promise<void> {
    throw { id, data };
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async delete(...args: any): Promise<void> {
    return;
  }
}
