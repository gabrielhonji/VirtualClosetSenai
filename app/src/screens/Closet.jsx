import React from 'react';
import { Image, Box, Heading, FormControl, Input, InputField, Button, ButtonText, SafeAreaView, ScrollView, HStack, VStack, Avatar, AvatarFallbackText, AvatarImage, Modal, ModalBackdrop, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter  } from '@gluestack-ui/themed';
import { useState } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Alert } from 'react-native';
import axios from 'axios';

export default function Closet({ navigation, route }) {
  
  const [id, setId] = useState("");
  const [clothName, setClothName] = useState("");
  const [clothDesc, setClothDesc] = useState("");
  const [clothStyle, setClothStyle] = useState("");
  const [clothSize, setClothSize] = useState("");
  const [clothColor, setClothColor] = useState("");
  const [clothTag, setClothTag] = useState("");

  const [imagePath, setImagePath] = useState(null);

  const [showModal, setShowModal] = useState(false);
  const handleState = () => {
    setShowModal(true);
    console.log("Modal open")
  }
  const [isFavorite, setFavorite] = useState(false);
  const handleStateFavorite = () => {
    setFavorite(!isFavorite);
  }
  const ref = React.useRef(null)

  const handleDelete = () => {
    axios.delete(`http://10.0.2.2:8085/roupas/deletar/${id_clothes}`)
        .then(response => {
            Alert.alert('Usuário deletado com sucesso!!!');
            setId("");
        })
        .catch(error => {
            if (error.response && error.response.status === 401) {
                Alert.alert("O ID não existe no bd");
            }
            else {
                Alert.alert("Erro ao deletar o usuário");
            }
        });
      }

  return (
    <SafeAreaView bg='#1E1716' flex={1}>
      <HStack ml='10%' w='80%' h='$24' mx={'24'}>
        <Box h='100%' w='80%'>
          <Heading fontSize={'$2xl'} color='#fff' textAlignVertical='center' h='100%'>Virtual Closet</Heading>
        </Box>
        <Box justifyContent='center' alignItems='flex-end' h='100%' w='20%'>
          <Button onPress={() => navigation.navigate('Login')} variant='link'>
            <Avatar size='md' bg='#f2f2'>
              <AvatarFallbackText color='#fff'>GH</AvatarFallbackText>
            </Avatar>
          </Button>
        </Box>
      </HStack>
      <ScrollView>
        <HStack w='80%'my={20} ml={'10%'} flexWrap='wrap' columnGap={'$4'} rowGap={'$4'}>
          <Button onPress={handleState} ref={ref} p='$0'w='47%' h='$56' borderWidth={2} borderColor="#5c433f" bg='#0000000' variant='link' borderRadius={20}>
            <Image w='100%' h='100%' alt='Cloth image' borderRadius="$sm" source={require("../../res/img/closet-img-1.png")}/>
          </Button>
          <Button onPress={handleState} ref={ref} p='$0'w='47%' h='$56' borderWidth={2} borderColor="#5c433f" bg='#0000000' variant='link' borderRadius={20}>
            <Image w='100%' h='100%' alt='Cloth image' borderRadius="$sm" source={require("../../res/img/closet-img-2.png")}/>
          </Button>
          <Button onPress={handleState} ref={ref} p='$0'w='47%' h='$56' borderWidth={2} borderColor="#5c433f" bg='#0000000' variant='link' borderRadius={20}>
            <Image w='100%' h='100%' alt='Cloth image' borderRadius="$sm" source={require("../../res/img/closet-img-3.png")}/>
          </Button>
          <Button onPress={handleState} ref={ref} p='$0'w='47%' h='$56' borderWidth={2} borderColor="#5c433f" bg='#0000000' variant='link' borderRadius={20}>
            <Image w='100%' h='100%' alt='Cloth image' borderRadius="$sm" source={require("../../res/img/closet-img-4.png")}/>
          </Button>
          <Button onPress={handleState} ref={ref} p='$0'w='47%' h='$56' borderWidth={2} borderColor="#5c433f" bg='#0000000' variant='link' borderRadius={20}>
            <Image w='100%' h='100%' alt='Cloth image' borderRadius="$sm" source={require("../../res/img/closet-img-5.png")}/>
          </Button>
          <Button onPress={handleState} ref={ref} p='$0'w='47%' h='$56' borderWidth={2} borderColor="#5c433f" bg='#0000000' variant='link' borderRadius={20}>
            <Image w='100%' h='100%' alt='Cloth image' borderRadius="$sm" source={require("../../res/img/closet-img-6.png")}/>
          </Button>
        </HStack>
      </ScrollView>
      <Modal isOpen={showModal} onClose={() => {setShowModal(false)}} finalFocusRef={ref}>
        <ModalBackdrop />
        <ModalContent bg='#323232'>
          <ModalHeader mb='$6'>
            <Heading color='#fff' size="lg">Atualizar peça</Heading>
            <ModalCloseButton>
              <Ionicons color='#fff' name='close' />
            </ModalCloseButton>
          </ModalHeader>
          <ModalBody>
            <KeyboardAwareScrollView>
              <VStack space='sm'>
                <FormControl isRequired={true}>
                <Input borderWidth={1} borderColor='#ffffff33' h='$16'>
                  <InputField type="text" placeholder="Nome da peça:" onChangeText={value => setClothName()} color='#F5F0F6'/>
                </Input>
                </FormControl>
                <FormControl isRequired={true}>
                <Input borderWidth={1} borderColor='#ffffff33' h='$14'>
                  <InputField type="text" placeholder="Descrição:" onChangeText={value => setClothDesc()} color='#F5F0F6'/>
                </Input>
                </FormControl>
              </VStack>
            </KeyboardAwareScrollView>
          </ModalBody>
          <ModalFooter>
            <Button variant="link" size="sm" action="secondary" mr="auto" onPress={handleDelete}>
              <Ionicons name='trash' color='#fff' size={20}/>
            </Button>
            <Button onPress={handleStateFavorite} size="md" w='20%' h='$16' variant="link" isDisabled={false} isFocusVisible={false} borderRadius="$xl">
                <Ionicons name={isFavorite ? 'heart' : 'heart-outline'} color={isFavorite ? '#fff' : '#B2AEB2'} size={28}/>
              </Button>
            <Button variant="outline" size="sm" action="secondary" mr="$3" onPress={() => {setShowModal(false)}}>
              <ButtonText color='#fff'>Cancelar</ButtonText>
            </Button>
            <Button bg='#654E4D' size="sm" action="positive" borderWidth="$0" onPress={() => {setShowModal(false)}}>
              <ButtonText>Atualizar</ButtonText>
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </SafeAreaView>
  );
}