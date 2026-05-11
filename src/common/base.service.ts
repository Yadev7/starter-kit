// This allows you to do CRUD for ANY model in 1 line of code
export abstract class BaseService<T> {
  constructor(protected readonly prismaEntity: any) {}

  async findAll() {
    return this.prismaEntity.findMany();
  }

  async findOne(id: number) {
    return this.prismaEntity.findUnique({ where: { id } });
  }

  async delete(id: number) {
    return this.prismaEntity.delete({ where: { id } });
  }
}