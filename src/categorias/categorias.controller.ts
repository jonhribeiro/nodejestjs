import { Body, Controller, Get, Param, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { CategoriasService } from './categorias.service';
import { Categoria } from './categorias/categoria.interface';
import { CriarCategoriaDto } from './categorias/dtos/criar-categoria.dto';

@Controller('api/v1/categorias')
export class CategoriasController {
    constructor(private readonly categoriasService: CategoriasService){}

    @Post()
    @UsePipes(ValidationPipe)
    async criarCategoria(
        @Body() criarCategoriaDto: CriarCategoriaDto): Promise<Categoria> {
            return await this.categoriasService.criarCategoria(criarCategoriaDto)
        }

    @Get()
    async consultarCategorias(): Promise<Array<Categoria>> {
        return this.categoriasService.consultarTodasCategorias()
    }

    @Get('/:categoria')
    async consultarCategoria(@Param('categoria') categoria: string): Promise<Categoria> {
        return await this.categoriasService.consultarCategoria(categoria)
    }
}
