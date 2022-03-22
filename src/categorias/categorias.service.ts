import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Categoria } from './categorias/categoria.interface';
import { Model } from 'mongoose'
import { CriarCategoriaDto } from './categorias/dtos/criar-categoria.dto';
import { AtualizarCategoriaDto } from './categorias/dtos/atualizar-categoria.dto';
import { JogadoresService } from 'src/jogadores/jogadores.service';

@Injectable()
export class CategoriasService {
    constructor(@InjectModel('Categoria') private readonly categoriaModel: Model<Categoria>, private readonly jogadoresSeervice: JogadoresService) {}

    async criarCategoria(criarCategoriaDto: CriarCategoriaDto): Promise<Categoria> {
        const { categoria } = criarCategoriaDto
        const categoriaEncontrada = await this.categoriaModel.findOne({categoria}).exec()
        if (categoriaEncontrada) {
            throw new BadRequestException(`categoria ${categoria} já cadastrada`)
        }
        const categoriaCriada = new this.categoriaModel(criarCategoriaDto)
        return await categoriaCriada.save()
    }

    async consultarTodasCategorias(): Promise<Array<Categoria>> {
        return await this.categoriaModel.find().populate('jogadores').exec()
    }

    async consultarCategoria(categoria: string): Promise<Categoria> {
        const categoriaEncontrada = await this.categoriaModel.findOne({categoria}).exec()
        if (!categoriaEncontrada) {
            throw new NotFoundException(`categoria ${categoria} não encontrada`)
        }
        return categoriaEncontrada
    }

    async atualizarCategoria(categoria: string, atualizarCategoriaDto: AtualizarCategoriaDto): Promise<void> {
        const categoriaEncontrada = await this.categoriaModel.findOne({categoria}).exec()
        if (!categoriaEncontrada) {
            throw new NotFoundException(`categoria ${categoria} não encontrada`)
        }
        await this.categoriaModel.findOneAndUpdate( {categoria}, {$set: atualizarCategoriaDto} ).exec()
    }

    async atribuirCategoriaJogador(params: string[]): Promise<void> {
        const categoria = params['categoria']
        const idJogador = params['idJogador']
        const categoriaEncontrada = await this.categoriaModel.findOne({categoria}).exec()

        await this.jogadoresSeervice.consultarJogador(idJogador)
        const jogadorEncontrado = await this.categoriaModel.find({categoria}).where('jogadores').in(idJogador).exec()
        
        if (!categoriaEncontrada) {
            throw new BadRequestException(`categoria ${categoria} não encontrada`)
        }
        if (jogadorEncontrado.length > 0) {
            throw new BadRequestException(`jogador ${idJogador} já cadastrado na ${categoria}`)
        }

        categoriaEncontrada.jogadores.push(idJogador)
        await this.categoriaModel.findOneAndUpdate({categoria},{$set: categoriaEncontrada}).exec()
    }
}
