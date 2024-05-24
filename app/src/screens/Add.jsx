import React, {useEffect, useState} from "react";
import { Image, Box, HStack, Center, FormControl, Input, InputField, Button, ButtonText, SafeAreaView } from '@gluestack-ui/themed';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import SistemaArquivos from 'react-native-fs';
import { launchCamera } from 'react-native-image-picker';

// Path to save the images
const diretorioImagens = `${SistemaArquivos.DocumentDirectoryPath}/imagens`;

// Create one if don't exist
SistemaArquivos.mkdir(diretorioImagens).then(() => {
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

  const [caminhoImagem, setCaminhoImagem] = useState(null);
  const [listaArquivos, setListaArquivos] = useState([]);

  const [isFavorite, setFavorite] = useState(true)
  const handleState = () => {
    setFavorite(false);
    console.log(isFavorite);
  }

  useEffect(() => {
    const carregarArquivos = async () => {
      try {
        const resultado = await SistemaArquivos.readDir(diretorioImagens);
        const imagens = resultado.filter(arquivo => arquivo.isFile() && ['.png', '.jpg', '.jpeg'].includes(arquivo.name.toLowerCase().slice(-4)));
        setListaArquivos(imagens.map(arquivo => arquivo.name));
      } catch (erro) {
        console.error('Erro ao buscar arquivos', erro);
      }
    };

    carregarArquivos();
  }, []);

  const tirarFoto = () => {
    const opcoes = { mediaType: 'photo' };
    launchCamera(opcoes, (resposta) => {
      if (resposta.didCancel) {
        console.log('Cancelado pelo usuário');
      } else if (resposta.errorCode) {
        console.log('Erro da Câmera: ', resposta.errorMessage);
      } else if (resposta.assets && resposta.assets.length > 0) {
        const { uri } = resposta.assets[0];
        const timestamp = new Date().toISOString().replace(/[:.-]/g, '');
        const nomeArquivo = `imagem_${timestamp}.jpg`;
        const caminhoDestino = `${diretorioImagens}/${nomeArquivo}`;

        SistemaArquivos.copyFile(uri, caminhoDestino)
          .then(() => {
            console.log('Imagem salva em:', caminhoDestino);
            setCaminhoImagem(caminhoDestino);
          })
          .catch(erro => console.log('Erro ao salvar a imagem:', erro));
      }
    });
  };

  return (
    <SafeAreaView bg='#1E1716' flex={1}>
      {/* <KeyboardAwareScrollView> */}
        <Box h='94%' w='84%' py='10%' ml='8%'>
          <Box h='40%' mb='5%'>
            {caminhoImagem ? (
                  <Button w='100%' h='100%' variant="link" onPress={tirarFoto}>
                    <Image borderWidth={2} borderColor="#5c433f" w='100%' h='$full' alt='Cloth image' borderRadius="$xl" source={{ uri: `file://${caminhoImagem}` }}/>
                  </Button>
                ) : (
                  <Button w='100%' h='100%' variant="outline" borderRadius="$xl" onPress={tirarFoto} borderColor="#c3c3c375">
                    <Center><ButtonText color='#F5F0F6'>Foto da Roupa</ButtonText></Center>
                  </Button>
                )}
          </Box>
          <Box h='40%' mb='15%'>
            <Box h='35%' mb='2%'>
              <FormControl isRequired={true}>
                <Input bg='#2D2221' borderWidth={0} h='$16' >
                  <InputField type="text" placeholder="Nome da peça:" onChangeText={value => setClothName()} color='#F5F0F6'/>
                </Input>
              </FormControl>
            </Box>
            <HStack h='35%' space="lg" reversed={false} mb='2%'>
              <FormControl w='65%'>
                <Input bg='#2D2221' borderWidth={0} h='$16' >
                  <InputField type="text" placeholder="Descrição:" onChangeText={value => setClothDesc()} color='#F5F0F6'/>
                </Input>
              </FormControl>
              <FormControl w='30%'>
                <Input bg='#2D2221' borderWidth={0} h='$16' >
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
            </HStack>
          </Box>
          <HStack h='15%' space="lg" reversed={false} justifyContent="center">
              <Button size="md" w='55%' h='$16' variant="solid" bg='#654E4D' isDisabled={false} isFocusVisible={false} borderRadius="$xl">
                <ButtonText color='#F5F0F6' onPress={() => navigation.navigate('Home')}>Adicionar ao closet</ButtonText>
              </Button>
              <Button onPress={handleState} size="md" w='20%' h='$16' variant="solid" bg={isFavorite ? '#654E4D' : '#2D2221'} isDisabled={false} isFocusVisible={false} borderRadius="$xl">
                <Ionicons name={isFavorite ? 'heart' : 'heart-outline'} color={isFavorite ? '#fff' : '#B2AEB2'} size={20}/>
              </Button>
          </HStack>
        </Box>
      {/* </KeyboardAwareScrollView> */}
    </SafeAreaView>
  );
}