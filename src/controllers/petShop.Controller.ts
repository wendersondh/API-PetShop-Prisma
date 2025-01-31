import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import {v4 as criarId} from 'uuid';

const prisma = new PrismaClient();

export async function adicionarPetShop (req: Request, res: Response) {
    try{
        const {name, cnpj} = req.body;

        // Validar se o CNPJ é válido
        const cnpjRegex = /^\d{2}\.\d{3}\.\d{3}\/0001-\d{2}$/;
        if(!cnpjRegex.test(cnpj)){
            return res.status(400).json({error: 'CNPJ inválido'});
        }

        // Verificar se o CNPJ já existe
        const petShopExists = await prisma.petShops.findUnique({
            where: {
                cnpj
            }
        });
        if(petShopExists){
            return res.status(400).json({error: 'CNPJ já existe'});
        }

        const petShop = await prisma.petShops.create({
            data: {
                id: criarId(),
                name,
                cnpj
            }
        })
        return res.status(201).json(petShop);
    }catch(err){
        return res.status(500).json({mensagem: 'Erro ao cadastrar petshop', error: err});
    }
}
