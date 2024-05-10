const clientController = require("../model/model");

const userController = {

    //route root 
    getRoot: async (req, res) => {
        res.status(200).json({ msg: "The API is running!!!" })
    },

    //table user
    listAllUsers: async (req, res) => {
        try {
            const clients = await clientController.getAllUsers();
            res.status(200).json(clients);
        }
        catch (error) {
            res.status(500).json({ error: "Erro ao obter a lista de usuários" })
        }
    },

    listByEmail: async (req, res) => {
        try {
            const sql = await clientController.getByEmail(req.params.email);

            if (sql.length > 0) {
                res.status(200).json(sql)
            }
            else {
                res.status(401).json({ msg: "Não existe registro no banco com este email" })
            }
        }
        catch (error) {
            return error
        }
    },

    createNewUser: async (req, res) => {
        const { id, name, email, password } = req.body;

        try {
            const sql = await clientController.getByEmail(email);

            if (sql.length > 0) {
                res.status(401).json({ msg: "O usuário já está cadastrado" })
            }
            else {
                await clientController.registerUser(id, name, email, password);
                res.status(201).json({ msg: "Usuário cadastrado com sucesso" });
            }
        }
        catch (error) {
            return error
        }
    },

    deleteUser: async (req, res) => {
        try {
            const sql = await clientController.getByEmail(req.params.email);

            if (sql.length > 0) {
                await clientController.deleteUser(req.params.email);
                res.status(200).json({ msg: "Usuário deletado com sucesso!!" })
            }
            else {
                res.status(401).json({ msg: "O usuário não existe no bd" })
            }
        }

        catch (error) {
            res.status(500).json({ error: "Erro ao tentar deletar usuário" })
        }
    },

    updateUser: async (req, res) => {
        const { name, password } = req.body;

        try {
            const sql = await clientController.getByEmail(req.params.email);

            if (sql.length > 0) {
                await clientController.updateUser(name, password, req.params.email)
                res.status(200).json({ msg: "Usuário atualizado com sucesso" });
            }
            else {
                res.status(401).json({ msg: "O usuário não existe na base de dados" });
            }
        }
        catch (error) {
            if (error) {
                console.log(error)

            }
        }
    },

    //Login

    Login:async(req,res)=>{
        const {email,password} = req.body;
        
        try{
            const sql = await clientController.validateLogin(email,password);

            console.log(sql);

            if(sql.length > 0){
                res.status(200).json({msg:"Email e senha validados com sucesso!!!"})
            }
            else{
                res.status(401).json({msg:"email ou senha incorretos"});
            }
        }
        catch(error){
            if(error){
                res.status(500).json(error);
            }
        }
    },


    //table type

    createType: async (req, res) => {
        const { id_type, name } = req.body;

        try {
            const sql = await clientController.getByIdType(id_type);

            if (sql.length > 0) {
                res.status(401).json({ msg: "O usuário já está cadastrado" })
            }
            else {
                await clientController.registerType(id_type, name);
                res.status(201).json({ msg: "Usuário cadastrado com sucesso" });
            }
        }
        catch (error) {
            return error
        }
    },

    //table tag

    createTag: async (req, res) => {
        const { id_tag,tag} = req.body;

        try {
            const sql = await clientController.getByIdTag(id_tag);

            if (sql.length > 0) {
                res.status(401).json({ msg: "O usuário já está cadastrado" })
            }
            else {
                await clientController.registerTag(id_tag,tag);
                res.status(201).json({ msg: "Usuário cadastrado com sucesso" });
            }
        }
        catch (error) {
            return error
        }
    },

    //table size

    createSize: async (req, res) => {
        const { id_size,size} = req.body;

        try {
            const sql = await clientController.getByIdSize(id_size);

            if (sql.length > 0) {
                res.status(401).json({ msg: "O usuário já está cadastrado" })
            }
            else {
                await clientController.registerSize(id_size,size);
                res.status(201).json({ msg: "Usuário cadastrado com sucesso" });
            }
        }
        catch (error) {
            return error
        }
    },

    //table color

    createColor: async (req, res) => {
        const { id_color,name} = req.body;

        try {
            const sql = await clientController.getByIdColor(id_color);

            if (sql.length > 0) {
                res.status(401).json({ msg: "O usuário já está cadastrado" })
            }
            else {
                await clientController.registerColor(id_color,name);
                res.status(201).json({ msg: "Usuário cadastrado com sucesso" });
            }
        }
        catch (error) {
            return error
        }
    },





     //table roupas

    //Controller para listar todos os usuários do banco
    listAllClothes: async(req,res)=>{
        try{
            const clients = await clientController.getAllClothes();
            res.status(200).json(clients);
        }
        catch(error){
            res.status(500).json({error: "Erro ao obter a lista de usuários"})
        }
    },

    //listar usuário por id

    listAllClothes: async (req, res) => {
        try {
            const clients = await clientController.getAllClothes();
            res.status(200).json(clients);
        }
        catch (error) {
            res.status(500).json({ error: "Erro ao obter a lista de usuários" })
        }
    },

    listByIdClothes: async (req, res) => {
        try {
            const sql = await clientController.getByIdClothes(req.params.id_clothes);

            if (sql.length > 0) {
                res.status(200).json(sql)
            }
            else {
                res.status(401).json({ msg: "Não existe registro no banco com este email" })
            }
        }
        catch (error) {
            return error
        }
    },

    createClothes: async (req, res) => {
        const {id_clothes,name,descripction, user_id, type_id_type, size_id_size, color_id_color, favorite, image, tag_id_tag} = req.body;

        try {
            const sql = await clientController.getByIdClothes(id_clothes);

            if (sql.length > 0) {
                res.status(401).json({ msg: "O usuário já está cadastrado" })
            }
            else {
                await clientController.registerClothes(id_clothes,name,descripction, user_id, type_id_type, size_id_size, color_id_color, favorite, image, tag_id_tag);
                res.status(201).json({ msg: "Usuário cadastrado com sucesso" });
            }
        }
        catch (error) {
            return error
        }
    },

    deleteClothes: async (req, res) => {
        try {
            const sql = await clientController.getByIdClothes(req.params.id_clothes);

            if (sql.length > 0) {
                await clientController.deleteClothes(req.params.id_clothes);
                res.status(200).json({ msg: "Usuário deletado com sucesso!!" })
            }
            else {
                res.status(401).json({ msg: "O usuário não existe no bd" })
            }
        }

        catch (error) {
            res.status(500).json({ error: "Erro ao tentar deletar usuário" })
        }
    },

    updateClothes: async (req, res) => {
        const {name,descripction, favorite} = req.body;

        try {
            const sql = await clientController.getByIdClothes(req.params.id_clothes);

            if (sql.length > 0) {
                await clientController.updateClhothes(name,descripction,favorite,req.params.id_clothes)
                res.status(200).json({ msg: "Usuário atualizado com sucesso" });
            }
            else {
                res.status(401).json({ msg: "O usuário não existe na base de dados" });
            }
        }
        catch (error) {
            if (error) {
                console.log(error)

            }
        }
    },
};

module.exports = userController;
