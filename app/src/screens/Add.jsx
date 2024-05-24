import { Image, Box, HStack, Center, FormControl, Input, InputField, InputSlot, Button, ButtonText, SafeAreaView } from '@gluestack-ui/themed';
import { useState } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

export default function Add({ navigation }) {
  const [clothName, setClothName] = useState("");
  const [clothDesc, setClothDesc] = useState("");
  const [clothStyle, setClothStyle] = useState("");
  const [clothSize, setClothSize] = useState("");
  const [clothColor, setClothColor] = useState("");
  const [clothTag, setClothTag] = useState("");

  const [caminhoImagem, setCaminhoImagem] = useState(null);
  const [listaArquivos, setListaArquivos] = useState([]);

  return (
    <SafeAreaView bg='#1E1716' flex={1}>
      <KeyboardAwareScrollView>
        <Box bg='#f2f2f2' h='100%' w='84%' py='10%' ml='8%'>
          <Box bg='#94c133' h='20%' mb='10%'>
            {/* <Image w='100%' h='100%' alt='Virtual Closet logo' source={require('../../res/img/Add.png')}/> */}
          </Box>
          <Box bg='#33c17f' h='70%'>
            <Box h='40%' mb='5%'>
              {/* <FormControl isRequired={true}>
                <Input bg='#2D2221' borderWidth={0} h='$14' >
                  <InputField type="text" placeholder="Nome da peça:" onChangeText={value => setClothName()} color='#F5F0F6'/>
                </Input>
              </FormControl> */}
            </Box>
            <HStack h='30%' space="md" reversed={false} bg='#5b939f' mb='5%'>
              {/* <FormControl>
                <Input bg='#2D2221' borderWidth={0} h='$14' >
                  <InputField type="text" placeholder="Descrição:" onChangeText={value => setClothStyle()} color='#F5F0F6'/>
                </Input>
              </FormControl>
              <FormControl>
                <Input bg='#2D2221' borderWidth={0} h='$14' >
                  <InputField type="text" placeholder="Estilo:" onChangeText={value => setClothDesc()} color='#F5F0F6'/>
                </Input>
              </FormControl> */}
            </HStack>
            <HStack h='30%' space="md" reversed={false} bg='#7027d1' mb='5%'>
              {/* <FormControl isRequired={true}>
                <Input bg='#2D2221' borderWidth={0} h='$14' >
                  <InputField type="text" placeholder="Tamanho:" onChangeText={value => setClothName()} color='#F5F0F6'/>
                </Input>
              </FormControl>
              <FormControl isRequired={true}>
                <Input bg='#2D2221' borderWidth={0} h='$14' >
                  <InputField type="text" placeholder="Cor:" onChangeText={value => setClothName()} color='#F5F0F6'/>
                </Input>
              </FormControl>
              <FormControl>
                <Input bg='#2D2221' borderWidth={0} h='$14' >
                  <InputField type="text" placeholder="Tag:" onChangeText={value => setClothName()} color='#F5F0F6'/>
                </Input>
              </FormControl> */}
            </HStack>
            <Center h='15%' mb='5%' bg='#ff2222'>
              {/* <Button size="md" w='80%' h='$16' variant="solid" bg='#654E4D' isDisabled={false} isFocusVisible={false} borderRadius="$xl">
                <ButtonText color='#F5F0F6' onPress={() => navigation.navigate('Home')}>Adicionar</ButtonText>
              </Button> */}
            </Center>
          </Box>
        </Box>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}