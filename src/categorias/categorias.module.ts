import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JogadoresModule } from 'src/jogadores/jogadores.module';
import { CategoriasController } from './categorias.controller';
import { CategoriasService } from './categorias.service';
import { CategoriaEchema } from './categorias/categoria.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Categoria', schema: CategoriaEchema }]), JogadoresModule],
  controllers: [CategoriasController],
  providers: [CategoriasService]
})
export class CategoriasModule {}
