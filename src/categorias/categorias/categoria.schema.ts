import * as  mongoose from "mongoose";

export const CategoriaEchema = new mongoose.Schema({
    categoria: { type: String, unique: true },
    descricao: String,
    eventos: [
        {
            nome: { type: String },
            operacao: { type: String },
            valor: { type: Number },
        }
    ],
    jogadores: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Jogador"
    }]
}, {timestamps: true, collection: 'categorias' }) 
