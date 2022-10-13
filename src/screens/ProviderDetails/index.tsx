import React,{useCallback, useState,useEffect} from 'react'; 
import { BackButton } from '@src/components/BackButton';
import { ImageSlider } from '@src/components/ImageSlider';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation, useRoute } from '@react-navigation/native';
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



export function ProviderDetails(){

  const route = useRoute();

  const routeParams = route.params as RouteParams;

  const [provider, setProvider] = useState<Provider>({} as Provider);

  const navigation = useNavigation();

  const handleGoBack = useCallback(() => {
    navigation.goBack();
  },[]);

  const navigateToCreateAppointment = useCallback((providerId: string) => {
     navigation.navigate('Appointments', {providerId})
  },[navigation]);

  

  useEffect(() =>{
    fetch("https://api-flash-services.herokuapp.com/src/Routes/provider/read/", {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
        body: JSON.stringify({
          "id": String(routeParams.providerId)
        })
      })
      .then(response => response.json())
      .then(data => {

        setProvider(data)
        // const {message} = data;
        // if(message){
        //   Alert.alert("Error ao buscar favoritos")
        // }else{
        //   const {favorites: fav} = data;
        //   setFavorites([...fav]);
        // }
      })
      .catch(err => {
          console.log("Error occurred: " + err);
      })

  },[routeParams.providerId])


  // useEffect(()=>{
  //   async function loadProvider(){

  //     // console.log(routeParams.providerId)
  //     const response =  await api.post<Provider>('provider/read//',
  //     JSON.stringify( {
  //       id: routeParams.providerId
  //     }),{
  //       headers: {
  //           'Content-Type': 'application/json',
  //       }
  //     });

  //     console.log(response.data);
  //     // setProvider(response.data)
  //   }

  //   //   setProvider(response.data);
  //   // console.log(provider)
  //   loadProvider();
  // },[routeParams])
  
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
          name={'favorite'}
          // name={provider.isFavorite ? 'favorite' : 'favorite-border'}
          size={24}
          color="#FF9000"
          onPress={
            () => {}
            // () => toggleFavorite(provider.id)
          }
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