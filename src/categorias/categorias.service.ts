import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Categoria } from './categorias/categoria.interface';
import { Model } from 'mongoose'
import { CriarCategoriaDto } from './categorias/dtos/criar-categoria.dto';

@Injectable()
export class CategoriasService {
    constructor(@InjectModel('Categoria') private readonly categoriaModel: Model<Categoria>) {}

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
        return await this.categoriaModel.find().exec()
    }

    async consultarCategoria(categoria: string): Promise<Categoria> {
        const categoriaEncontrada = await this.categoriaModel.findOne({categoria}).exec()
        if (!categoriaEncontrada) {
            throw new NotFoundException(`categoria ${categoria} não encontrada`)
        }
        return categoriaEncontrada
    }
}
