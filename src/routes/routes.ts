import { Router } from "express";
import { adicionarPetShop } from "../controllers/petShop.Controller";
import { verificarContaExistente } from "../middlewares/verificarContaExistente";
import * as petController from '../controllers/pet.controller'

const router = Router();

router.post('/petshops', adicionarPetShop);
router.get('/pets', verificarContaExistente, petController.listarPets);
router.post('/pets', verificarContaExistente, petController.adicionarPet);
router.put('/pets/:id', verificarContaExistente, petController.atualizarPet);
router.patch('/pets/:id', verificarContaExistente, petController.atualizarVacina);
router.delete('/pets/:id', verificarContaExistente, petController.deletarPet);


export { router };
