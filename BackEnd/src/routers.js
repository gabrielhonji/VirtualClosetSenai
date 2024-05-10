const express = require("express");
const clientController = require("../controller/controller");
const router = express.Router();

router.get('/', clientController.getRoot); //rota raiz

//router user
router.get('/user/listar', clientController.listAllUsers); //Listar todos os usuários
router.get('/user/listar/:email',clientController.listByEmail); //Listar usuário por id
router.delete('/user/deletar/:email', clientController.deleteUser); //deletar  usuário
router.put('/user/atualizar/:email', clientController.updateUser); //atualizar usuário

//criar e validar
router.post('/user/cadastrar', clientController.createNewUser); //Cadastrar novo usuário
router.post('/user/validate',clientController.Login)//validar o login

//router type
router.post('/type/cadastrar', clientController.createType); //Cadastrar type

//router tag
router.post('/tag/cadastrar', clientController.createTag); //Cadastrar tag

//router size
router.post('/size/cadastrar', clientController.createSize); //Cadastrar tag

//router color
router.post('/color/cadastrar', clientController.createColor); //Cadastrar tag

//router clothes
router.get('/roupas/listar', clientController.listAllClothes); //Listar todos os usuários
router.get('/roupas/listar/:id_clothes',clientController.listByIdClothes); //Listar usuário por id
router.post('/roupas/cadastrar', clientController.createClothes); //Cadastrar novo usuário
router.delete('/roupas/deletar/:id_clothes', clientController.deleteClothes); //deletar  usuário
router.put('/roupas/atualizar/:id_clothes', clientController.updateClothes); //atualizar usuário

module.exports = router;