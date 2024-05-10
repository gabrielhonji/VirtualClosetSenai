import React, { useState } from "react";
import { Image, View, SafeAreaView, Alert } from "react-native";
import style from "./Style.jsx";
import { Text, Button, Input } from 'galio-framework';
import axios from 'axios';

export default function Sign({ navigation }) {
    const [mensagem, setMensagem] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
 
    const handleCadastro = async () => {
        
        //verificar se os campos foram preenchidos 
        if (!name || !email || !password) {
            Alert.alert('Erro', 'Por favor, preencha todos os campos.');
            return
        }
        
        const data = {
            name:name,
            email:email,
            password:password
        }
        
        try {
            await axios.post('http://10.0.2.2:8085/user/cadastrar', data);
            Alert.alert('Cadastro realizado com sucesso');
            navigation.navigate('Inicio');
        } catch (error) {
            if (error.response.status === 401) {
                Alert.alert('O email' + data.email + 'já está cadastrado');
            } else
                console.log(error);
                Alert.alert('Ocorreu um erro ao cadastrar o usuário. Tente novamente.');
            }
        }
    

    return (
        <SafeAreaView style={style.main_container}>
            <View style={style.container_1}>
                <Image style={style.icon} source={require('../../../res/img/Icon.png')} />
            </View>
            <View style={style.container_2}>
                <View style={[style.subcontainer, style.title]}>
                    <Text h1 style={style.text}>Cadastrar</Text>
                    <Text style={style.subtext}>Faça o cadastro para continuar</Text>
                </View>
                <View style={style.subcontainer}>
                    <Input placeholder="Nome"
                        style={style.input}
                        placeholderTextColor="#B2AEB2" borderless color="#F5F0F6"
                        onChangeText={value => setName(value)} />
                    <Input placeholder="Email"
                        style={style.input}
                        placeholderTextColor="#B2AEB2" borderless color="#F5F0F6" type="email-address"
                        onChangeText={value => setEmail(value.toLowerCase())} />
                    <Input placeholder="Senha"
                        password viewPass style={style.input}
                        placeholderTextColor="#B2AEB2" borderless color="#F5F0F6" iconColor="#F5F0F6"
                        onChangeText={value => setPassword(value)} />
                </View>
                <View style={style.subcontainer}>
                    <Button color="#654E4D" shadowless style={style.main_buttom} onPress={(handleCadastro)}><Text style={style.buttom_text}>Entre</Text></Button>
                </View>
            </View>
            <View style={style.container_3}>
                <Text style={style.text}>Já tem uma conta? <Text onPress={() => navigation.navigate('Login')} style={style.link}>Conecte-se agora</Text></Text>
            </View>
        </SafeAreaView>
    )
};