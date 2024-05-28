import { Image, Box, Text, Heading, Center, FormControl, Input, InputField, InputSlot, Button, ButtonText, SafeAreaView } from '@gluestack-ui/themed';
import { useState } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Alert } from 'react-native';
import axios from 'axios';


export default function Sign({ navigation }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false)

  const handleState = () => {
    setShowPassword((showState) => {
      return !showState
    })
  }

  const handleCadastro = async () => {

    if (!email.includes('@')) {
      Alert.alert('Por favor, insira um email válido')
      return
    }

    //verificar se os campos foram preenchidos 
    if (name === "" || email === "" || password==="") {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return
    }

    const data = {
      name: name,
      email: email,
      password: password
    }

    console.log(data);
    try {
      await axios.post('http://10.0.2.2:8085/user/cadastrar', data);
      Alert.alert('Cadastro realizado com sucesso');
      navigation.navigate('Login');
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <SafeAreaView bg='#1E1716' flex={1}>
      <KeyboardAwareScrollView>
        <Box w='84%' h='$full' py='10%' ml='8%'>
          <Box h='10%' mb='15%'>
            <Image size='sm' alt='Virtual Closet logo' source={require('../../res/img/Icon.png')} />
          </Box>
          <Box h='55%' mb='5%'>
            <Box mb='10%'>
              <Heading size='3xl' color='#F5F0F6'>Cadastro</Heading>
              <Text color='#B2AEB2'>Registre-se para continuar</Text>
            </Box>
            <Box>
              <FormControl isRequired={true} mb='$2'>
                <Input bg='#2D2221' borderWidth={0} h='$16' >
                  <InputField type="text" placeholder="Nome:" onChangeText={value => setName(value)} color='#F5F0F6' />
                </Input>
              </FormControl>
              <FormControl isRequired={true} mb='$2'>
                <Input bg='#2D2221' borderWidth={0} h='$16' >
                  <InputField type="text" placeholder="Email:" onChangeText={value => setEmail(value.toLowerCase())} color='#F5F0F6' />
                </Input>
              </FormControl>
              <FormControl isRequired={true} mb='$2'>
                <Input bg='#2D2221' borderWidth={0} h='$16'>
                  <InputField type={showPassword ? "text" : "password"} placeholder="Senha:" onChangeText={value => setPassword(value)} color='#F5F0F6' />
                  <InputSlot pr="$5" onPress={handleState}>
                    <Ionicons name={showPassword ? 'eye-outline' : 'eye-off-outline'} color={showPassword ? '#F5F0F6' : '#807c80'} size={20} />
                  </InputSlot>
                </Input>
              </FormControl>
            </Box>
          </Box>
          <Center h='20%' mb='5%'>
            <Button size="md" w='80%' h='$16' variant="solid" bg='#654E4D' isDisabled={false} isFocusVisible={false} borderRadius="$xl" onPress={(handleCadastro)}>
              <ButtonText color='#F5F0F6'>Cadastre-se</ButtonText>
            </Button>
          </Center>
          <Center h='10%'>
            <Text color='#F5F0F6'>Já tem uma conta? <Text color='#3665cb' onPress={() => navigation.navigate('Login')}>Conecte-se agora</Text></Text>
          </Center>
        </Box>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}