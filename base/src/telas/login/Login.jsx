import React, {useState} from "react";
import {Image, View, SafeAreaView, Alert } from "react-native";
import style from "./Style.jsx";
import { Text, Button, Input } from 'galio-framework';
import axios from "axios";

export default function Login( {navigation} ) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async () =>{
        try{
            //verificar se os campos foram preenchidos 
            if(!email || !password){
                Alert.alert('Erro', 'Por favor, preencha todos os campos.');
                return
            }

            //Objetivo para enviar para a API
            const data = {
                email:email,
                password:password
            }

            //enviar os dados para a API
            const response = await axios.post('http://10.0.2.2:8085/user/validate',data);

            //verificar se o login foi efetuado com sucesso
            if(response.status === 200){
                setEmail('');
                setPassword('');

                navigation.navigate('Inicio');
            }
            else{
                Alert.alert('Erro', `Email ou senha incorretos.Por favor tentar novamente ${error}`);
            }
        }
        catch(error){
              if(error.response && error.response.status === 401){
                Alert.alert('Erro','ocorreu um erro ao fazer o login.Tente novamente');
              }
              else{
                Alert.alert('Erro', `Email ou senha incorretos.Por favor tentar novamente ${error}`)
              }
        }
    };

    return (
        <SafeAreaView style={style.main_container}>
            <View style={style.container_1}>
                <Image style={style.icon} source={require('../../../res/img/Icon.png')}/>
            </View>
            <View style={style.container_2}>
                <View style={[style.subcontainer, style.title]}>
                    <Text h1 style={style.text}>Conectar</Text>
                    <Text style={style.subtext}>Faça login para continuar</Text>
                </View>
                <View style={style.subcontainer}>
                    <Input placeholder="Email" style={style.input} placeholderTextColor="#B2AEB2" borderless color="#F5F0F6" type="email-address" onChangeText={value => setEmail(value)}/>
                    <Input placeholder="Senha" password viewPass style={style.input} placeholderTextColor="#B2AEB2" borderless color="#F5F0F6" iconColor="#F5F0F6" onChangeText={value => setPassword(value)}/>
                </View>
                <View style={style.subcontainer}>
                    <Button color="#654E4D" shadowless style={style.main_buttom}><Text style={style.buttom_text} onPress={handleLogin}>Entre</Text></Button>
                </View>
            </View>
            <View style={style.container_3}>
                <Text style={style.text}>Não tem uma conta? <Text onPress={() => navigation.navigate('Sign')} style={style.link}>Crie uma agora</Text></Text>
            </View>
        </SafeAreaView>
    )
}