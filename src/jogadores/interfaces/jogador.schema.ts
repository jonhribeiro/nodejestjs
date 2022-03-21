import * as  mongoose from "mongoose";

export const JogadorEchema = new mongoose.Schema({
    email: { type: String, unique: true },
    telefone: String,
    nome: String,
    ranking: String,
    posicaoRanking: Number,
    urlFotoJogador: String,
}, {timestamps: true, collection: 'jogadores' }) 
