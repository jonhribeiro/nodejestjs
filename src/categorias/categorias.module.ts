import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoriasController } from './categorias.controller';
import { CategoriasService } from './categorias.service';
import { CategoriaEchema } from './categorias/categoria.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Categoria', schema: CategoriaEchema }])],
  controllers: [CategoriasController],
  providers: [CategoriasService]
})
export class CategoriasModule {}
