import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import {v4 as criarId} from 'uuid';

const prisma = new PrismaClient();

export const listarPets = async (req: Request, res: Response) => {
    const petShop = req.petshop
    try{
        const pets = await prisma.petShops.findUnique({
            where: {
                cnpj: petShop.cnpj
            },
            select: {
                pets: true
            }
        })
        
        res.json(pets);
        return
    }catch(err){
        res.status(500).json({mensagem: 'Erro ao listar pets', error: err});
        return;
    }
}


export const adicionarPet = async (req: Request, res: Response) => {
    const petShop = req.petshop
    try{
        const { nome, type, description, deadline_vaccination } = req.body;
        const deadlineDate = new Date(deadline_vaccination);
        const novoPet = await prisma.pets.create({
            data: {
                nome,
                type,
                description,
                vaccinated: false, 
                deadline_vaccination: deadlineDate,
                petShopId: req.petshop.id 
            }
        });
        
        res.status(201).json({ "message": "Pet cadastrado com sucesso!" , pet: novoPet});
    }catch(error){
         res.status(500).json({mensagem: 'Erro ao adicionar pet', error: error});

    }
}

export const atualizarPet = async (req: Request, res: Response) => {
    const petShop = req.petshop
    const id = req.params.id
    const dados = req.body;
    try{
        const pets = await prisma.petShops.findUnique({
            where: {
                cnpj: petShop.cnpj
            },
            select: {
                pets: true
            }
        })

        const pet = pets?.pets.find(pet => pet.id === id)

        if(pet != null) {
            await prisma.pets.update({
                where: {
                    id: String(id),
                    petShopId: String(petShop.id)
                },
                data: {
                    ...dados
                }
            })
            res.status(201).json({ "message": "Pet atualizado com sucesso!" });
        }else{
            res.status(404).json({ "message": "Pet não encontrado!" });
        }
    }catch(error){
         res.status(500).json({mensagem: 'Erro ao atualizar pet', error: error});
    }
}

export const atualizarVacina = async (req: Request, res: Response) => {
    const petShop = req.petshop
    const id = req.params.id
    try{
        const pets = await prisma.petShops.findUnique({
            where: {
                cnpj: petShop.cnpj
            },
            select: {
                pets: true
            }
        })

        const pet = pets?.pets.find(pet => pet.id === id)

        if(pet != null) {
            await prisma.pets.update({
                where: {
                    id: String(id),
                    petShopId: String(petShop.id)
                },
                data: {
                    vaccinated: !pet.vaccinated
                }
            })
            res.status(201).json({ "message": "Vacina atualizada com sucesso!" });
        }else{
            res.status(404).json({ "message": "Pet não encontrado!" });
        }
        
    }catch(error){
         res.status(500).json({mensagem: 'Erro ao atualizar pet', error: error});
    }

}

export const deletarPet = async (req: Request, res: Response) => {
    const petShop = req.petshop
    const id = req.params.id
    try{
        const pets = await prisma.petShops.findUnique({
            where: {
                cnpj: petShop.cnpj
            },
            select: {
                pets: true
            }
        });

        const pet = pets?.pets.find(pet => pet.id === id)

        if(pet != null) {
            await prisma.pets.delete({
                where :{
                    id: String(id),
                    petShopId: String(petShop.id)
                }
            })
            res.status(201).json({ "message": "Pet deletado com sucesso!" });
        }else{
            res.status(404).json({ "message": "Pet não encontrado!" });
        }
    }catch(error){
         res.status(500).json({mensagem: 'Erro ao deletar pet', error: error});
    }
}



