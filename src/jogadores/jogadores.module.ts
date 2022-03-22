import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JogadorEchema } from './interfaces/jogador.schema';
import { JogadoresController } from './jogadores.controller';
import { JogadoresService } from './jogadores.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Jogador', schema: JogadorEchema }])],
  controllers: [JogadoresController],
  providers: [JogadoresService],
  exports: [JogadoresService]
})
export class JogadoresModule {}
