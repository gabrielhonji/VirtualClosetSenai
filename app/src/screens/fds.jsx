import React, { useState } from 'react';
import { View, Button, TextInput, Alert, Image, StyleSheet, ScrollView, KeyboardAvoidingView } from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import axios from 'axios';
import RNFS from 'react-native-fs';

const Registro = ({ navigation }) => {
    const [nome, setNome] = useState('');
    const [sobrenome, setSobrenome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [imagem, setImagem] = useState(null);

    //acessar a câmera do celular
    const handleCameraLaunch = async () => {
        const options = {
            mediaType: 'photo',
        };

        try {
            const response = await launchCamera(options);
            console.log('pickedFile', response);

            // Verifica se a imagem foi capturada com sucesso
            if (response.assets && response.assets.length > 0) {
                const image = response.assets[0];
                setImagem(image);
            } else {
                console.log('Nenhuma imagem capturada.');
            }
        } catch (error) {
            console.error('Erro ao capturar a imagem:', error);
        }
    };

    //Acessar a biblioteca de imagens do celular
    const handleImageLibraryLaunch = async () => {
        const options = {
            mediaType: 'photo',
        };

        try {
            const response = await launchImageLibrary(options);
            console.log('pickedFile', response);

            // Verifica se a imagem foi selecionada com sucesso
            if (response.assets && response.assets.length > 0) {
                const image = response.assets[0];
                setImagem(image);
            } else {
                console.log('Nenhuma imagem selecionada.');
            }
        } catch (error) {
            console.error('Erro ao selecionar a imagem:', error);
        }
    };

    const limparFormulario = () => {
        setNome('');
        setSobrenome('');
        setEmail('');
        setSenha('');
        setImagem(null);
    };

    const enviarDadosParaApi = async () => {
        try {
            // Verifica se os campos obrigatórios foram preenchidos
            if (!nome || !sobrenome || !email || !senha || !imagem) {
                Alert.alert('Todos os campos são obrigatórios.');
                return;
            }

            // Lê o arquivo da imagem como base64
            const imageData = await RNFS.readFile(imagem.uri, 'base64');

            // Configuração da requisição Axios
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                },
            };

            // URL da sua API para enviar os dados e a imagem
            const apiUrl = 'http://10.0.2.2:8085/api/registerImage';

            // Dados a serem enviados para a API
            const data = {
                nome: nome,
                sobrenome: sobrenome,
                email: email,
                senha: senha,
                imagemBase64: imageData,
            };

            // Envia os dados e a imagem para a API usando Axios
            const response = await axios.post(apiUrl, data, config);
            console.log('Resposta da API:', response.data);

            // Limpa o formulário após o envio dos dados
            limparFormulario();

            // Retorna para a página inicial
            navigation.navigate('LoginAP');
        } catch (error) {
            console.error('Erro ao enviar os dados e a imagem para a API:', error);

            if (error.response && error.response.status === 401) {
                Alert.alert('E-mail já cadastrado na base de dados. Tente com um e-mail diferente.');
            } else {
                // Caso contrário, exibe uma mensagem genérica de erro
                Alert.alert('Erro ao enviar os dados. Por favor, tente novamente mais tarde.');
            }
        }
    };

    return (
        <KeyboardAvoidingView style={styles.container} behavior="padding">
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                <View style={styles.imageContainer}>
                    {/* Imagem centralizada no topo */}
                    <Image
                        source={imagem ? { uri: imagem.uri } : require('../../../res/img/logo-senai-1.png')}
                        style={styles.image}
                    />
                </View>
                <View style={styles.formContainer}>
                    {/* Formulário de cadastro */}
                    <TextInput
                        placeholder="Nome"
                        value={nome}
                        onChangeText={(text) => setNome(text)}
                        style={styles.input}
                    />
                    <TextInput
                        placeholder="Sobrenome"
                        value={sobrenome}
                        onChangeText={(text) => setSobrenome(text)}
                        style={styles.input}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Email"
                        onChangeText={setEmail}
                        value={email}
                        keyboardType="email-address"
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Senha"
                        onChangeText={setSenha}
                        value={senha}
                        secureTextEntry
                    />
                </View>
                <View style={styles.buttonContainer}>
                    {/* Botão da câmera na cor verde */}
                    <Button title="Câmera" onPress={handleCameraLaunch} color="green" />
                    {/* Botão para selecionar imagem da galeria na cor azul */}
                    <Button title="Galeria" onPress={handleImageLibraryLaunch} color="blue" />
                    {/* Botão de enviar na cor vermelha */}
                    <Button title="Enviar" onPress={enviarDadosParaApi} color="red" />
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    scrollViewContent: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    imageContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    image: {
        width: 200,
        height: 200,
        resizeMode: 'contain',
    },
    formContainer: {
        width: '80%',
        marginBottom: 20,
    },
    input: {
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '80%',
    },
});

export default Registro;
