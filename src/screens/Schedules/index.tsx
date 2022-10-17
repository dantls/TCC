import React, { useEffect,useState } from 'react'; 
import { KeyboardAvoidingView, Platform } from 'react-native';
import { useAuth } from '@hooks/auth';
import {
  Container,
  Title,
  ServicesList,
  ServicesContainer,
  ServicesAvatar,
  ServicesInfo,
  ServicesName,
  ServicesMeta,
  ServicesText,
  ServicesMetaText,
  ServicesListTitle,
 
} from './styles';
import api from '@src/services/api';
import Icon from 'react-native-vector-icons/Feather';

export interface Service {
  id: number;
  idprovider: string;
  localservice: string;
  dateservice: string;
  timeservice: string;
  typeservice: string;
}

export function Schedules({ navigation }){
  const {user} = useAuth(); 
  const [services, setServices] = useState<Service[]>([]);
  
  async function loadData(){

    const responseServices = await api.post("/service/getbyuser/", {iduser: String(user.id)}); 

    const {service} = responseServices.data;

    setServices(service);
 
    console.log(services);
    // const formattedProviders = responseServices.data.service.map((provider:Provider) => {
    //   const favorite = responseFavorites.data.favorites.find( item => item.idprovider == provider.id);
    //   if(favorite){
    //     provider.isFavorite = true;
    //     return provider;
    //   }else{
    //     provider.isFavorite = false;
    //     return provider
    //   }
    // });

    // setProviders([...formattedProviders]);

  }

  useEffect(() => {
    loadData();
  },[])

  return(
    <Container>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding': undefined}
      >
         <ServicesList
            data={services}
            keyExtractor={service => String(service.id)}
            ListHeaderComponent={
              <ServicesListTitle>Serviços Agendados</ServicesListTitle>
            }
            renderItem={({ item: service }) => (
              <ServicesContainer
                // onPress={() => navigateToCreateAppointment(provider.id)}
              >
                <ServicesInfo>
                  <ServicesName>{service.idprovider}</ServicesName> 
                  <ServicesMeta>
                    {/* <Icon name="phone" size={14} color="#FF9000" /> */}
                    <ServicesText>{service.typeservice}</ServicesText>
                  </ServicesMeta>       
                  <ServicesText>{service.description}</ServicesText>               
                  <ServicesMeta>
                    <Icon name="calendar" size={14} color="#FF9000" />
                    <ServicesMetaText>{service.dateservice}</ServicesMetaText>
                    <Icon name="clock" size={14} color="#FF9000" />
                    <ServicesMetaText>{service.timeservice}</ServicesMetaText>
                  </ServicesMeta>                      
                    
                </ServicesInfo>
                
            
              </ServicesContainer>
            )}
          />
      
        
      </KeyboardAvoidingView>
    </Container>
  )
}