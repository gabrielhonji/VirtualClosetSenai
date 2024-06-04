import { Image, Box, Text, Heading, Center, FormControl, Input, InputField, InputSlot, Button, ButtonText, SafeAreaView } from '@gluestack-ui/themed';
import { useState } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Alert } from 'react-native';
import axios from 'axios';


export default function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false)
  const handleState = () => {
    setShowPassword((showState) => {
      return !showState
    })
  }

  const handleLogin = async () =>{
      if (!email.includes('@')) {
      Alert.alert('Por favor, insira um email válido')
      return
    }
    
    //verificar se os campos foram preenchidos 
      if (email === "" || password==="") {
        Alert.alert('Erro', 'Por favor, preencha todos os campos.');
        return
      }
      try{
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

              const obj = response.data;

              navigation.navigate('Home',{obj});
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
    
  }
  
  return (
    <SafeAreaView bg='#1E1716' flex={1}>
      <KeyboardAwareScrollView>
        <Box w='84%' h='$full' py='10%' ml='8%'>
          <Box h='10%' mb='15%'>
            <Image size='sm' alt='Virtual Closet logo' source={require('../../res/img/Icon.png')}/>
          </Box>
          <Box h='55%' mb='5%'>
            <Box mb='15%'>
              <Heading size='3xl' color='#F5F0F6'>Login</Heading>
              <Text color='#B2AEB2'>Faça login para continuar</Text>
            </Box>
            <Box>
              <FormControl isRequired={true} mb='$5'>
                <Input bg='#2D2221' borderWidth={0} h='$16' >
                  <InputField type="text" placeholder="Email:" onChangeText={value => setEmail(value.toLowerCase())} color='#F5F0F6'/>
                </Input>
              </FormControl>
              <FormControl isRequired={true} mb='$5'>
                <Input bg='#2D2221' borderWidth={0} h='$16'>
                  <InputField type={showPassword ? "text" : "password"}  placeholder="Senha:" onChangeText={value => setPassword(value)} color='#F5F0F6'/>
                  <InputSlot pr="$5" onPress={handleState}>
                    <Ionicons name={showPassword ? 'eye-outline' : 'eye-off-outline'} color={showPassword ? '#F5F0F6' : '#807c80'} size={20}/>
                  </InputSlot>
                </Input>
                <Text mt='$3' onPress={() => navigation.navigate('ResetLogin')}>Esqueceu a senha?</Text>
              </FormControl>
            </Box>
          </Box>
          <Center h='20%' mb='5%'>
            <Button size="md" w='80%' h='$16' variant="solid" bg='#654E4D' isDisabled={false} isFocusVisible={false} borderRadius="$xl" onPress={(handleLogin)}>
              <ButtonText color='#F5F0F6' onPress={() => navigation.navigate('Home')}>Entre</ButtonText>
            </Button>
          </Center>
          <Center h='10%'>
            <Text color='#F5F0F6'>Não tem uma conta? <Text color='#3665cb' onPress={() => navigation.navigate('Sign')}>Crie uma agora</Text></Text>
          </Center>
        </Box>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}