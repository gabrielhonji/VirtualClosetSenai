import React from 'react';
import { Image, Box, Text, Heading, Center, FormControl, Input, InputField, InputSlot, Button, ButtonText, SafeAreaView, ScrollView, Card, HStack, Avatar, AvatarFallbackText, AvatarImage, Modal, ModalBackdrop, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter  } from '@gluestack-ui/themed';
import { useState } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

export default function Closet({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showModal, setShowModal] = useState(false);
  const handleState = () => {
    setShowModal(true);
    console.log("Modal open")
  }
  const ref = React.useRef(null)

  return (
    <SafeAreaView bg='#1E1716' flex={1}>
      <HStack ml='10%' w='80%' h='$24' mx={'24'}>
        <Box h='100%' w='80%'>
          <Heading fontSize={'$2xl'} color='#fff' textAlignVertical='center' h='100%'>Virtual Closet</Heading>
        </Box>
        <Box onPress={() => navigation.navigate('Login')} justifyContent='center' alignItems='flex-end' h='100%' w='20%'>
          <Avatar size='md'>
            <AvatarFallbackText>GH</AvatarFallbackText>
              <AvatarImage alt='Avatar Image' source={{ uri: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60"}}
              />
          </Avatar>
        </Box>
      </HStack>
      <ScrollView>
        <HStack w='80%'my={20} ml={'10%'} flexWrap='wrap' columnGap={'$4'} rowGap={'$4'}>
          <Button onPress={handleState} ref={ref} p='$0'w='47%' h='$56' borderWidth={2} borderColor="#5c433f" bg='#0000000' variant='link'>
            <Image w='100%' h='100%' alt='Cloth image' borderRadius="$sm" source={{ uri: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60"}}/>
          </Button>
          <Button onPress={handleState} ref={ref} p='$0'w='47%' h='$56' borderWidth={2} borderColor="#5c433f" bg='#0000000' variant='link'>
            <Image w='100%' h='100%' alt='Cloth image' borderRadius="$sm" source={{ uri: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60"}}/>
          </Button>
        </HStack>
      </ScrollView>
      <Modal isOpen={showModal} onClose={() => {setShowModal(false)}} finalFocusRef={ref}>
        <ModalBackdrop />
        <ModalContent>
          <ModalHeader>
            <Heading size="lg">Engage with Modals</Heading>
            <ModalCloseButton>
              <Ionicons name='close' />
            </ModalCloseButton>
          </ModalHeader>
          <ModalBody>
            <Text>Elevate user interactions with our versatile modals. Seamlessly integrate notifications, forms, and media displays. Make an impact effortlessly.</Text>
          </ModalBody>
          <ModalFooter>
            <Button variant="outline" size="sm" action="secondary" mr="$3" onPress={() => {setShowModal(false)}}>
              <ButtonText>Cancel</ButtonText>
            </Button>
            <Button size="sm" action="positive" borderWidth="$0" onPress={() => {setShowModal(false)}}>
              <ButtonText>Explore</ButtonText>
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </SafeAreaView>
  );
}