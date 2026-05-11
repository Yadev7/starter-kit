import { Get, Post, Body, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';

export class BaseController<T> {
  constructor(private readonly service: any) {}

  @Post()
  @ApiOperation({ summary: 'Create new record' })
  create(@Body() dto: any) { return this.service.create(dto); }

  @Get()
  @ApiOperation({ summary: 'Get all' })
  findAll() { return this.service.findAll(); }

  @Get(':id')
  @ApiOperation({ summary: 'Get by ID' })
  findOne(@Param('id', ParseIntPipe) id: number) { return this.service.findOne(id); }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete' })
  remove(@Param('id', ParseIntPipe) id: number) { return this.service.remove(id); }
}