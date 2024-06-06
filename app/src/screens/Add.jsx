import React, {useEffect, useState} from "react";
import { Image, Box, HStack, Center, FormControl, Input, InputField, Button, ButtonText} from '@gluestack-ui/themed';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SistemaArquivos from 'react-native-fs';
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
    if (clothName === "" || clothDesc === "" || clothStyle ==="" || clothSize ==="" || clothColor  ==="" ) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return
    } else if ( !imagePath ) {
      Alert.alert('Erro, insira uma imagem')
      return
    }
    const imageData = await SistemaArquivos.readFile(imagePath, { encoding: 'base64' });

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
      favorite : isFavorite,
      image: imageData
    }

    console.log(data);
    try {
      await axios.post('http://10.0.2.2:8085/roupas/cadastrar', data, config);
      Alert.alert('Cadastro realizado com sucesso');
      Console.log(data);
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
                    { label: "PP", value: "1", itemKey: 1 },
                    { label: "P", value: "2", itemKey: 2 },
                    { label: "M", value: "3", itemKey: 3 },
                    { label: "G", value: "4", itemKey: 4 },
                    { label: "GG", value: "5", itemKey: 5 },
                    { label: "XG", value: "6", itemKey: 6 }
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
                    { label: "Blusa", value: "2", itemKey: 2 },
                    { label: "Jaqueta", value: "3", itemKey: 3 },
                    { label: "Bermuda", value: "4", itemKey: 3 },
                    { label: "Short", value: "5", itemKey: 3 },
                    { label: "Saia", value: "6", itemKey: 3 },
                    { label: "Casaco", value: "7", itemKey: 3 },
                    { label: "Acessório", value: "8", itemKey: 3 },
                    { label: "Sapato", value: "9", itemKey: 3 },
                    { label: "Vestido", value: "10", itemKey: 3 },
                    { label: "Macacão", value: "11", itemKey: 3 },
                    { label: "Bolsa", value: "13", itemKey: 3 },
                 
                ]}
              />
            </FormControl>
            <FormControl w='25.5%' bg='#2D2221' borderRadius={4} px='$2'>
              <RNPickerSelect placeholder={{label: "Cor:", value: null, color: '#000000'}} useNativeAndroidPickerStyle={false}
                onValueChange={(clothColor) => setClothColor(clothColor)}
                items={[
                    { label: "Rosa", value: "1", itemKey: 1 },
                    { label: "Azul", value: "2", itemKey: 2 },
                    { label: "Vermelho", value: "3", itemKey: 3 },
                    { label: "Preto", value: "4", itemKey: 4 },
                    { label: "Branco", value: "5", itemKey: 5 },
                    { label: "Verde", value: "6", itemKey: 6 },
                    { label: "Roxo", value: "7", itemKey: 7 },
                    { label: "Amarelo", value: "8", itemKey: 8 },
                    { label: "Laranja", value: "9", itemKey: 9 },
                    { label: "Cinza", value: "10", itemKey: 10 },
                    { label: "Bege", value: "11", itemKey: 11 },
                    { label: "Marrom", value: "12", itemKey: 12 },
                    { label: "Estampado", value: "13", itemKey: 13 },
                ]}
              />
            </FormControl>
            <FormControl w='30%' bg='#2D2221' borderRadius={4} px='$2'>
              <RNPickerSelect placeholder={{label: "Tag:", value: null, color: '#000000'}} useNativeAndroidPickerStyle={false}
                onValueChange={(clothTag) => setClothTag(clothTag)}
                items={[
                    { label: "Verão", value: "1", itemKey: 1 },
                    { label: "Outono", value: "2", itemKey: 2 },
                    { label: "Inverno", value: "3", itemKey: 3 },
                    { label: "Primavera", value: "4", itemKey: 4 },
                    { label: "Traje de festa", value: "5", itemKey: 5 },
                    { label: "Jeans", value: "6", itemKey: 6 },
                    { label: "Formal", value: "7", itemKey: 7 },
                    { label: "Casual", value: "8", itemKey: 8 },
                    { label: "Esportivo", value: "9", itemKey: 9 },
                    { label: "Elegante", value: "10", itemKey: 10 },
                    { label: "Fofo", value: "11", itemKey: 11 },
                    { label: "Vintage", value: "12", itemKey: 12 },
                ]}
              />
            </FormControl>
          </HStack>
          <HStack space="lg" reversed={false} justifyContent="center">
              <Button size="md" w='55%' h='$16' variant="solid" bg='#654E4D' isDisabled={false} isFocusVisible={false} borderRadius="$xl" onPress={(handleCadastro)}>
                <ButtonText color='#F5F0F6'>Adicionar ao closet</ButtonText>
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