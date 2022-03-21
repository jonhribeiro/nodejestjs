import { ArrayMinSize, IsArray, IsNotEmpty, IsString } from 'class-validator'
import { Evento } from '../categoria.interface';

export class CriarCategoriaDto {
    
    @IsNotEmpty()
    @IsNotEmpty()
    readonly categoria: string;

    @IsString()
    @IsNotEmpty()
    descricao: string;

    @IsArray()
    @ArrayMinSize(1)
    eventos: Array<Evento>;
}