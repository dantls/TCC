import React,{useCallback} from 'react'; 
import { BackButton } from '@src/components/BackButton';
import { ImageSlider } from '@src/components/ImageSlider';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

import {
  Container,
  Content,
  Header,
  Title,
  CarImages,
  ServicesOffered,
  About,
  Rating,
  CreateAppointmentButton,
  CreateAppointmentButtonText
} from './styles';

import { useNavigation } from '@react-navigation/native';
export function ProviderDetails(){

  const navigation = useNavigation();
  const handleGoBack = useCallback(() => {
    navigation.goBack();
  },[])
  return(
    <Container>
      <Header>
        <BackButton
          color="#FFF"
          onPress={handleGoBack}
        />
      </Header>
      <CarImages>
        <ImageSlider 
          imagesUrl={['https://freepngimg.com/thumb/audi/35227-5-audi-rs5-red.png']}
          />
      </CarImages>
      <Content>
        <Title>Rei das Chaves</Title>
        <ServicesOffered>Serviços Oferecidos:</ServicesOffered>
        <About>Cópias - Fechaduras - Abertura de Cofres</About>
     
        <MaterialIcon
          name={'favorite'}
          // name={provider.isFavorite ? 'favorite' : 'favorite-border'}
          size={24}
          color="#FF9000"
          onPress={
            () => {}
            // () => toggleFavorite(provider.id)
          }
        />
          <Rating>Avaliações:</Rating>
     
      </Content>
      <CreateAppointmentButton 
          onPress={()=>{}}
        >
          <CreateAppointmentButtonText>Agendar</CreateAppointmentButtonText>
      </CreateAppointmentButton>
    
    </Container>
  )
}