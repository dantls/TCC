import React,{useCallback, useState,useEffect} from 'react'; 
import {  useRoute } from '@react-navigation/native';

import { BackButton } from '@src/components/BackButton';
import { ImageSlider } from '@src/components/ImageSlider';

import { useFavorites } from '@hooks/favorites';
import { useAuth } from '@hooks/auth';

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
import api from '@src/services/api';

interface RouteParams {
  providerId: string;
}
export interface Provider {
  id: number;
  name: string;
  email:string;
  photo: string;
  isFavorite?: boolean;
  servicesoffered: string;
}

export function ProviderDetail({ navigation}){

  const {user} = useAuth(); 

  const route = useRoute();

  const routeParams = route.params as RouteParams;

  const [provider, setProvider] = useState<Provider>({} as Provider);

  const { addFavorite} = useFavorites(); 

  const handleGoBack = useCallback(() => {
    navigation.goBack();
  },[]);

  const navigateToCreateAppointment = useCallback((providerId: string) => {
     navigation.navigate('Appointments', {providerId})
  },[navigation]);

  function toggleFavorite (providerId: string){
    addFavorite(user.id, providerId);
    loadData();
  }

  async function loadData(){

    const [ responseFavorites,responseProvider ] = await Promise.all([
      api.post("/favorites/read/", {iduser: String(user.id)}), 
      api.post("/provider/read/",{id: routeParams.providerId})
    ]);
 
      const favorite = responseFavorites.data.favorites.find( item => item.idprovider == Number(routeParams.providerId));
      if(favorite){
        responseProvider.data.isFavorite = true;
      }else{
        responseProvider.data.isFavorite = false;
      }
    setProvider(responseProvider.data);
  }
  
  
  
  useEffect(() => {
    loadData();  
  },[provider])

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      loadData();
    });
    
  }, [navigation]);  
  
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
          imagesUrl={provider.photo}
        />
      </CarImages>
      <Content>
        <Title>{provider.name}</Title>
        <ServicesOffered>Serviços Oferecidos:</ServicesOffered>
        <About>{provider.servicesoffered}</About>
     
        <MaterialIcon
          name={provider.isFavorite ? 'favorite' : 'favorite-border'}
          size={24}
          color="#FF9000"
          onPress={() => toggleFavorite(String(provider.id))}
        />
          {/* <Rating>Avaliações:</Rating> */}
     
      </Content>
      <CreateAppointmentButton 
          onPress={() => navigateToCreateAppointment(String(provider.id))}
        >
          <CreateAppointmentButtonText>Agendar</CreateAppointmentButtonText>
      </CreateAppointmentButton>
    
    </Container>
  )
}