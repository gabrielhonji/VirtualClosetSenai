const connection = require("../config/db");

const userModel = {
    
    //model user
    getAllUsers: async () =>{
        const [result] = await connection.query("SELECT * FROM user")
        .catch(erro => console.log(erro));
        return result
    },

    getByEmail: async (email) =>{
        const [result] = await connection.query("SELECT * FROM user WHERE email =?",[email])
        .catch(erro => console.log(erro));
        return result
    },

    getById: async (id) =>{
        const [result] = await connection.query("SELECT * FROM user WHERE id =?",[id])
        .catch(erro => console.log(erro));
        return result
    },

    registerUser: async (id,name, email, password) =>{
        const [result] = await connection.query("INSERT INTO user values(?,?,?,?)",[id,name, email, password])
        .catch(erro => console.log(erro));
        return result
    },

    deleteUser: async(email)=> {
        const [result] = await connection.query("DELETE FROM user WHERE email=?", [email])
        .catch(erro => console.log(erro));
        return result
    },

    updateUser: async (name,password,email) => {
        const [result] = await connection.query("UPDATE user SET name=?, password=? WHERE email =? ", [name,password,email])
       .catch(erro => console.log(erro));
        return result
    },

    validateLogin: async(email,password) =>{
        const [result] = await connection.query("SELECT * FROM user WHERE email=? AND password=?",[email,password])
        .catch(erro => console.log(erro));
        return result
    },

       //model type

       getAllType: async () =>{
        const [result] = await connection.query("SELECT * FROM type")
        .catch(erro => console.log(erro));
        return result
    },

       getByIdType: async (id_type) =>{
        const [result] = await connection.query("SELECT * FROM type WHERE id_type =?",[id_type])
        .catch(erro => console.log(erro));
        return result
    },

    registerType: async (id_type,name) =>{
        const [result] = await connection.query("INSERT INTO type values(?,?)",[id_type,name])
        .catch(erro => console.log(erro));
        return result
    },

     //model tag
     
    getAllTag: async () =>{
        const [result] = await connection.query("SELECT * FROM tag")
        .catch(erro => console.log(erro));
        return result
    },

     getByIdTag: async (id_tag) =>{
        const [result] = await connection.query("SELECT * FROM tag WHERE id_tag =?",[id_tag])
        .catch(erro => console.log(erro));
        return result
    },

    registerTag: async (id_tag,tag,tagcol) =>{
        const [result] = await connection.query("INSERT INTO tag values(?,?)",[id_tag,tag])
        .catch(erro => console.log(erro));
        return result
    },

    //model size

    getAllSize: async () =>{
        const [result] = await connection.query("SELECT * FROM size")
        .catch(erro => console.log(erro));
        return result
    },

    getByIdSize: async (id_size) =>{
        const [result] = await connection.query("SELECT * FROM size WHERE id_size =?",[id_size])
        .catch(erro => console.log(erro));
        return result
    },

    registerSize: async (id_size,size) =>{
        const [result] = await connection.query("INSERT INTO size values(?,?)",[id_size,size])
        .catch(erro => console.log(erro));
        return result
    },

    //model color

    getAllColor: async () =>{
        const [result] = await connection.query("SELECT * FROM color")
        .catch(erro => console.log(erro));
        return result
    },

    getByIdColor: async (id_color) =>{
        const [result] = await connection.query("SELECT * FROM color WHERE id_color =?",[id_color])
        .catch(erro => console.log(erro));
        return result
    },

    registerColor: async (id_color,name) =>{
        const [result] = await connection.query("INSERT INTO color values(?,?)",[id_color,name])
        .catch(erro => console.log(erro));
        return result
    },

     //model roupas
     getAllClothes: async () =>{
        const [result] = await connection.query("SELECT * FROM clothes")
        .catch(erro => console.log(erro));
        return result
    },

    getByIdClothes: async (id_clothes) =>{
        const [result] = await connection.query("SELECT * FROM clothes WHERE id_clothes =?",[id_clothes])
        .catch(erro => console.log(erro));
        return result
    },


    registerClothes: async (id_clothes,name,descripction, user_id, type_id_type, size_id_size, color_id_color, favorite, image, tag_id_tag) =>{
        const [result] = await connection.query("INSERT INTO clothes values(?,?,?,?,?,?,?,?,?,?)",[id_clothes,name,descripction, user_id, type_id_type, size_id_size, color_id_color, favorite, image, tag_id_tag])
        .catch(erro => console.log(erro));
        return result
    },

    deleteClothes: async(id_clothes)=> {
        const [result] = await connection.query("DELETE FROM clothes WHERE id_clothes=?", [id_clothes])
        .catch(erro => console.log(erro));
        return result
    },

    updateClhothes: async (name,descripction, favorite, id_clothes) => {
        const [result] = await connection.query("UPDATE clothes SET name=?, descripction=?, favorite=? WHERE id_clothes =?", [name,descripction,favorite,id_clothes])
       .catch(erro => console.log(erro));
        return result
    },

    //   //email para resetar  senha do usuario
    //   resetEmail: async (email) =>{
    //     const [result] = await connection.query("SELECT * FROM user WHERE email=?",[email])
    //     .catch(error => console.log(error))
    //     return result;
    // },

    //update the password
    updatePassword: async(email,password) =>{
        const [result] = await connection.query("UPDATE user SET password=? WHERE email=?", [password,email])
        .catch(error => console.log(error))
        return result;
    }
};

module.exports = userModel;