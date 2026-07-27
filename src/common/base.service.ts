// src/common/base.service.ts
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

  // 👈 أضف دالة remove لتطابق Controller أو غير اسم delete لـ remove
  async remove(id: number) {
    return this.delete(id);
  }
}