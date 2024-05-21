import { Image, Box, SafeAreaView, KeyboardAvoidingView, Text, Heading, Center, FormControl, FormControlLabel, FormControlLabelText, Input, InputField, VStack, InputSlot } from '@gluestack-ui/themed';
import { useState } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false)
  const handleState = () => {
    setShowPassword((showState) => {
      return !showState
    })
  }

  return (
    <SafeAreaView bg='#1E1716'>
      <KeyboardAvoidingView behavior='padding'>
        <Box w='84%' h='$full' py='10%' ml='8%'>
          <Box h='10%' mb='15%'>
            <Image size='sm' alt='Virtual Closet logo' source={require('../../../res/img/Icon.png')}/>
          </Box>
          <Box h='50%' mb='5%'>
            <Box mb='15%'>
              <Heading size='3xl' color='#F5F0F6'>Login</Heading>
              <Text color='#B2AEB2'>Faça login para continuar</Text>
            </Box>
            <Box>
              <FormControl isRequired={true} mb='$5'>
                <VStack space='lg'>
                  <VStack mb='$6'>
                    <FormControlLabel mb="-$8" ml='$3' zIndex={5}><FormControlLabelText color='#807c80' fontWeight='$medium' fontSize='$xs'>Email:</FormControlLabelText></FormControlLabel>
                    <Input bg='#2D2221' borderWidth={0} h='$20' ><InputField pt='$8' type="text" placeholder="seu@email.com" onChangeText={value => setEmail(value.toLowerCase())} color='#F5F0F6'/></Input>
                  </VStack>
                  <VStack>
                    <FormControlLabel mb="-$8" ml='$3' zIndex={5}><FormControlLabelText color='#807c80' fontWeight='$medium' fontSize='$xs'>Senha:</FormControlLabelText></FormControlLabel>
                    <Input bg='#2D2221' borderWidth={0} h='$20'>
                      <InputField pt='$8' type={showPassword ? "text" : "password"}  placeholder="********" onChangeText={value => setPassword()} color='#F5F0F6'/>
                      <InputSlot pr="$5" pt='$5' onPress={handleState}>
                        <Ionicons name={showPassword ? 'eye-outline' : 'eye-off-outline'} color={showPassword ? '#F5F0F6' : '#807c80'} size={20}/>
                      </InputSlot>
                    </Input>
                  </VStack>
                </VStack>
              </FormControl>
            </Box>
          </Box>
          <Box bg='#4f4f4f' h='15%' mb='5%'>

          </Box>
          <Center h='10%' mb='5%'>
            <Text color='#F5F0F6'>Não tem uma conta? <Text color='#3665cb'>Crie uma agora</Text></Text>
          </Center>
        </Box>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}