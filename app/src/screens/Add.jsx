import React, {useEffect, useState} from "react";
import { Image, Box, HStack, Center, FormControl, Input, InputField, Button, ButtonText, SafeAreaView, KeyboardAvoidingView } from '@gluestack-ui/themed';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SistemaArquivos from 'react-native-fs';
import { launchCamera } from 'react-native-image-picker';
import { Alert } from 'react-native';
import axios from 'axios';

// Path to save the images
const imageDirectory = `${SistemaArquivos.DocumentDirectoryPath}/images`;

// Create one if don't exist
SistemaArquivos.mkdir(imageDirectory).then(() => {
  console.log('Diretório criado');
}).catch(erro => {
  console.log('Erro ao criar diretório:', erro);
});

export default function Add({ navigation }) {
  const [clothName, setClothName] = useState("");
  const [clothDesc, setClothDesc] = useState("");
  const [clothStyle, setClothStyle] = useState("");
  const [clothSize, setClothSize] = useState("");
  const [clothColor, setClothColor] = useState("");
  const [clothTag, setClothTag] = useState("");

  const [imagePath, setImagePath] = useState(null);
  const [imageList, setImageList] = useState([]);

  const [isFavorite, setFavorite] = useState(false);
  const handleState = () => {
    setFavorite(!isFavorite);
  }

  const handleCadastro = async () => {

    //verificar se os campos foram preenchidos 
    if (clothName === "" || clothDesc === "" || clothStyle ==="" || clothSize ==="" || clothColor  ==="" || clothTag  ===""   ) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return
    }

    const data = {
      name: clothName,
      descripction : clothDesc,
      type_id_type : clothStyle,
      size_id_size : clothSize,
      color_id_color : clothColor,
      tag_id_tag : clothTag
    }

    console.log(data);
    try {
      await axios.post('http://10.0.2.2:8085/roupas/cadastrar', data);
      Alert.alert('Cadastro realizado com sucesso');
      navigation.navigate('Home');
    } catch (error) {
      console.log(error);
    }
  };






  useEffect(() => {
    const loadImages = async () => {
      try {
        const result = await SistemaArquivos.readDir(imageDirectory);
        const images = result.filter(imageFile => imageFile.isFile() && ['.png', '.jpg', '.jpeg'].includes(imageFile.name.toLowerCase().slice(-4)));
        setImageList(images.map(imageFile => imageFile.name));
      } catch (erro) {
        console.error('Erro ao buscar arquivos', erro);
      }
    };

    loadImages();
  }, []);

  const shootImage = () => {
    const options = { mediaType: 'photo' };
    launchCamera(options, (answer) => {
      if (answer.didCancel) {
        console.log('Cancelado pelo usuário');
      } else if (answer.errorCode) {
        console.log('Erro da Câmera: ', answer.errorMessage);
      } else if (answer.assets && answer.assets.length > 0) {
        const { uri } = answer.assets[0];
        const timestamp = new Date().toISOString().replace(/[:.-]/g, '');
        const fileName = `imagem_${timestamp}.jpg`;
        const filePath = `${imageDirectory}/${fileName}`;

        SistemaArquivos.copyFile(uri, filePath)
          .then(() => {
            console.log('Imagem salva em:', filePath);
            setImagePath(filePath);
          })
          .catch(erro => console.log('Erro ao salvar a imagem:', erro));
      }
    });
  };


  

  return (
    // <SafeAreaView bg='#1E1716' flex={1}>
    <KeyboardAvoidingView bg='#1E1716' flex={1} behavior={'position'}>
    {/* <KeyboardAwareScrollView contentContainerStyle={{flexGrow: 1, backgroundColor: '#1E1716', minHeight: '84%'}}> */}
      <Box h='94%' w='84%' py='$10' ml='8%'>
        <Box h='40%' mb='$5'>
          {imagePath ? (
                <Button w='100%' h='100%' variant="link" onPress={shootImage}>
                  <Image borderWidth={2} borderColor="#5c433f" w='100%' h='$full' alt='Cloth image' borderRadius="$xl" source={{ uri: `file://${imagePath}` }}/>
                </Button>
              ) : (
                <Button w='100%' h='100%' variant="outline" borderRadius="$xl" onPress={shootImage} borderColor="#c3c3c375">
                  <Center><ButtonText color='#F5F0F6'>Adicionar foto da peça</ButtonText></Center>
                </Button>
              )}
        </Box>
        <Box h='40%' mb='$12'>
          <Box h='40%' mb='$1'>
            <FormControl isRequired={true}>
              <Input bg='#2D2221' borderWidth={0} h='$16'>
                <InputField type="text" placeholder="Nome da peça:" onChangeText={value => setClothName()} color='#F5F0F6'/>
              </Input>
            </FormControl>
          </Box>
<<<<<<< HEAD
          <Box h='40%' mb='15%'>
            <Box h='40%'>
              <FormControl isRequired={true}>
                <Input bg='#2D2221' borderWidth={0} h='$16' >
                  <InputField type="text" placeholder="Nome da peça:" onChangeText={value => setClothName(value)} color='#F5F0F6'/>
                </Input>
              </FormControl>
            </Box>
            <HStack h='30%' space="lg" reversed={false} mb='2%'>
              <FormControl w='65%'>
                <Input bg='#2D2221' borderWidth={0} h='$14' >
                  <InputField type="text" placeholder="Descrição:" onChangeText={value => setClothDesc(value)} color='#F5F0F6'/>
                </Input>
              </FormControl>
              <FormControl w='30%'>
                <Input bg='#2D2221' borderWidth={0} h='$14' >
                  <InputField type="text" placeholder="Tamanho:" onChangeText={value => setClothSize(value)} color='#F5F0F6'/>
                </Input>
              </FormControl>
            </HStack>
            <HStack h='30%' space="lg" reversed={false}>
              <FormControl isRequired={true} w='35%'>
                <Input bg='#2D2221' borderWidth={0} h='$14' >
                  <InputField type="text" placeholder="Estilo:" onChangeText={value => setClothStyle(value)} color='#F5F0F6'/>
                </Input>
              </FormControl>
              <FormControl isRequired={true} w='25.5%'>
                <Input bg='#2D2221' borderWidth={0} h='$14' >
                  <InputField type="text" placeholder="Cor:" onChangeText={value => setClothColor(value)} color='#F5F0F6'/>
                </Input>
              </FormControl>
              <FormControl w='30%'>
                <Input bg='#2D2221' borderWidth={0} h='$14' >
                  <InputField type="text" placeholder="Tags:" onChangeText={value => setClothTag(value)} color='#F5F0F6'/>
                </Input>
              </FormControl>
            </HStack>
          </Box>
          <HStack h='15%' space="lg" reversed={false} justifyContent="center">
              <Button size="md" w='55%' h='$16' variant="solid" bg='#654E4D' isDisabled={false} isFocusVisible={false} borderRadius="$xl" onPress={(handleCadastro)}>
                <ButtonText color='#F5F0F6' onPress={() => navigation.navigate('Closet')}>Adicionar ao closet</ButtonText>
              </Button>
              <Button onPress={handleState} size="md" w='20%' h='$16' variant="solid" bg={isFavorite ? '#654E4D' : '#2D2221'} isDisabled={false} isFocusVisible={false} borderRadius="$xl">
                <Ionicons name={isFavorite ? 'heart' : 'heart-outline'} color={isFavorite ? '#fff' : '#B2AEB2'} size={20}/>
              </Button>
=======
          <HStack h='30%' space='lg' reversed={false} mb='$2'>
            <FormControl w='65%'>
              <Input bg='#2D2221' borderWidth={0} h='$14' >
                <InputField type="text" placeholder="Descrição:" onChangeText={value => setClothDesc()} color='#F5F0F6'/>
              </Input>
            </FormControl>
            <FormControl w='30%'>
              <Input bg='#2D2221' borderWidth={0} h='$14' >
                <InputField type="text" placeholder="Tamanho:" onChangeText={value => setClothSize()} color='#F5F0F6'/>
              </Input>
            </FormControl>
          </HStack>
          <HStack h='30%' space="lg" reversed={false}>
            <FormControl isRequired={true} w='35%'>
              <Input bg='#2D2221' borderWidth={0} h='$14' >
                <InputField type="text" placeholder="Estilo:" onChangeText={value => setClothStyle()} color='#F5F0F6'/>
              </Input>
            </FormControl>
            <FormControl isRequired={true} w='25.5%'>
              <Input bg='#2D2221' borderWidth={0} h='$14' >
                <InputField type="text" placeholder="Cor:" onChangeText={value => setClothColor()} color='#F5F0F6'/>
              </Input>
            </FormControl>
            <FormControl w='30%'>
              <Input bg='#2D2221' borderWidth={0} h='$14' >
                <InputField type="text" placeholder="Tags:" onChangeText={value => setClothTag()} color='#F5F0F6'/>
              </Input>
            </FormControl>
>>>>>>> 85393fbe6b73fb20606f05924b71ab754b563885
          </HStack>
        </Box>
        <HStack h='15%' space="lg" reversed={false} justifyContent="center">
          <Button size="md" w='55%' h='$16' variant="solid" bg='#654E4D' isDisabled={false} isFocusVisible={false} borderRadius="$xl">
            <ButtonText color='#F5F0F6' onPress={() => navigation.navigate('Closet')}>Adicionar ao closet</ButtonText>
          </Button>
          <Button onPress={handleState} size="md" w='20%' h='$16' variant="solid" bg={isFavorite ? '#654E4D' : '#2D2221'} isDisabled={false} isFocusVisible={false} borderRadius="$xl">
            <Ionicons name={isFavorite ? 'heart' : 'heart-outline'} color={isFavorite ? '#fff' : '#B2AEB2'} size={20}/>
          </Button>
        </HStack>
      </Box>
    {/* </KeyboardAwareScrollView> */}
    </KeyboardAvoidingView>
    // </SafeAreaView>
  );
}