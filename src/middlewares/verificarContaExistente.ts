import { PrismaClient } from "@prisma/client";
import { Request, Response, NextFunction } from "express";
const prisma = new PrismaClient();

export const verificarContaExistente = async (req: Request, res: Response, next: NextFunction) => {
   
        const cnpj = req.headers.cnpj;
        const petshop = await prisma.petShops.findUnique({
            where: {
                cnpj: String(cnpj),
            }
        });

        if (!petshop) {
            res.status(404).json({ mensagem: 'Petshop não encontrado' });
            return;
        }

        req.petshop = {
            ...petshop,
            pets: [],
        };
        next();

}
