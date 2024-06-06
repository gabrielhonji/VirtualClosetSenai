import React, {useEffect, useState} from "react";
import { Image, Box, HStack, Center, FormControl, Input, InputField, Button, ButtonText} from '@gluestack-ui/themed';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SistemaArquivos, {RNFS} from 'react-native-fs';
import { launchCamera } from 'react-native-image-picker';
import { Alert } from 'react-native';
import axios from 'axios';
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import RNPickerSelect from 'react-native-picker-select';


// Path to save the images
const imageDirectory = `${SistemaArquivos.DocumentDirectoryPath}/images`;

// Create one if don't exist
SistemaArquivos.mkdir(imageDirectory).then(() => {
  console.log('Diretório criado');
}).catch(erro => {
  console.log('Erro ao criar diretório:', erro);
});

export default function Add({ navigation, route }){

  const user = route.params?.user;

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

  const [data, setDataType] = useState([]);
  const [size, setSize] = useState([]);
  const [color, setColor] = useState([]);
  const [tag, setTag] = useState([]);


  //recuperar informações do tipo 
  useEffect(() => {
    // Função para buscar dados da API
    const fetchDataType = async () => {
      try {
        const response = await axios.get('http://10.0.2.2:8085/type/listar'); // Substitua pela URL da sua API
        setDataType(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Erro ao buscar dados da API:', error);
      }
    };

    fetchDataType();
  }, []);

  //recuperar informações do style 
  useEffect(() => {
    // Função para buscar dados da API
    const fetchSize = async () => {
      try {
        const response = await axios.get('http://10.0.2.2:8085/size/listar'); // Substitua pela URL da sua API
        setSize(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Erro ao buscar dados da API:', error);
      }
    };
    fetchSize();
  }, []);

  //recuperar informações do tipo 
  useEffect(() => {
    // Função para buscar dados da API
    const fetchColor = async () => {
      try {
        const response = await axios.get('http://10.0.2.2:8085/color/listar'); // Substitua pela URL da sua API
        setColor(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Erro ao buscar dados da API:', error);
      }
    };

    fetchColor();
  }, []);

  //recuperar informações do tipo 
  useEffect(() => {
    // Função para buscar dados da API
    const fetchTag = async () => {
      try {
        const response = await axios.get('http://10.0.2.2:8085/tag/listar'); // Substitua pela URL da sua API
        setTag(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Erro ao buscar dados da API:', error);
      }
    };

    fetchTag();
  }, []);


  

  const handleCadastro = async () => {

    //verificar se os campos foram preenchidos 
    if (clothName === "" || clothDesc === "" || clothStyle ==="" || clothSize ==="" || clothColor  ==="" || clothTag  ===""   ) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return
    }

    const imageData = await RNFS.readFile(imagem.uri, 'base64');

    // Configuração da requisição Axios
    const config = {
      headers: {
          'Content-Type': 'application/json',
      },
  };

    const data = {
      name: clothName,
      descripction : clothDesc,
      type_id_type : clothStyle,
      size_id_size : clothSize,
      color_id_color : clothColor,
      tag_id_tag : clothTag,
      image: imageData
    }

    console.log(data);
    try {
      await axios.post('http://10.0.2.2:8085/roupas/cadastrar', data, config);
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
    <KeyboardAwareScrollView enableOnAndroid={true} 
    contentContainerStyle={{backgroundColor: '#1E1716', minHeight: '100%'}}>
      <Box h='86%' w='84%' ml='8%' mt='10%'>
        <Box h='38%' mb='$4'>
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
        <Box h='60%'>
          <Input bg='#2D2221' borderWidth={0} h='$16' mb='$4'>
            <InputField type="text" placeholder="Nome da peça:" onChangeText={value => setClothName(value)} color='#F5F0F6'/>
          </Input>
          <HStack space="lg" mb='$4'>
            <FormControl w='65%'>
              <Input bg='#2D2221' borderWidth={0} h='$14' >
                <InputField type="text" placeholder="Descrição:" onChangeText={value => setClothDesc(value)} color='#F5F0F6'/>
              </Input>
            </FormControl>
            <FormControl w='30%' bg='#2D2221' borderRadius={4} px='$2'>
              <RNPickerSelect placeholder={{label: "Tamanho:", value: null, color: '#000000'}} useNativeAndroidPickerStyle={false}
                onValueChange={(clothSize) => setClothSize(clothSize)}
                items={[
                    { label: "P", value: "1", itemKey: 1 },
                    { label: "M", value: "2", itemKey: 2 },
                    { label: "G", value: "3", itemKey: 3 },
                ]}
              />
            </FormControl>
          </HStack>
          <HStack space="lg" mb='$8'>
            <FormControl w='35%' bg='#2D2221' borderRadius={4} px='$2'>
              <RNPickerSelect placeholder={{label: "Tipo:", value: null, color: '#000000'}} useNativeAndroidPickerStyle={false}
                onValueChange={(clothStyle) => setClothStyle(clothStyle)}
                items={[
                    { label: "Calça", value: "1", itemKey: 1 },
                    { label: "Short", value: "2", itemKey: 2 },
                    { label: "Camisa", value: "3", itemKey: 3 },
                ]}
              />
            </FormControl>
            <FormControl w='25.5%' bg='#2D2221' borderRadius={4} px='$2'>
              <RNPickerSelect placeholder={{label: "Cor:", value: null, color: '#000000'}} useNativeAndroidPickerStyle={false}
                onValueChange={(clothColor) => setClothColor(clothColor)}
                items={[
                    { label: "Azul", value: "1", itemKey: 1 },
                    { label: "Verde", value: "2", itemKey: 2 },
                    { label: "Vermelho", value: "3", itemKey: 3 },
                ]}
              />
            </FormControl>
            <FormControl w='30%' bg='#2D2221' borderRadius={4} px='$2'>
              <RNPickerSelect placeholder={{label: "Tag:", value: null, color: '#000000'}} useNativeAndroidPickerStyle={false}
                onValueChange={(clothColor) => setClothColor(clothColor)}
                items={[
                    { label: "Verão", value: "1", itemKey: 1 },
                    { label: "Inverno", value: "2", itemKey: 2 },
                    { label: "Social", value: "3", itemKey: 3 },
                ]}
              />
            </FormControl>
          </HStack>
          <HStack space="lg" reversed={false} justifyContent="center">
              <Button size="md" w='55%' h='$16' variant="solid" bg='#654E4D' isDisabled={false} isFocusVisible={false} borderRadius="$xl" onPress={(handleCadastro)}>
                <ButtonText color='#F5F0F6' onPress={() => navigation.navigate('Closet')}>Adicionar ao closet</ButtonText>
              </Button>
              <Button onPress={handleState} size="md" w='20%' h='$16' variant="solid" bg={isFavorite ? '#654E4D' : '#2D2221'} isDisabled={false} isFocusVisible={false} borderRadius="$xl">
                <Ionicons name={isFavorite ? 'heart' : 'heart-outline'} color={isFavorite ? '#fff' : '#B2AEB2'} size={20}/>
              </Button>
          </HStack>
        </Box>
      </Box>
    </KeyboardAwareScrollView>
  );
}



