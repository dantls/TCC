import React, { useEffect,useState } from 'react'; 
import { Alert, KeyboardAvoidingView, Platform ,View, RefreshControl} from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';
import { useAuth } from '@hooks/auth';
import {useTheme} from 'styled-components/native';
import {
  Container,
  RemoveButton,
  ServicesList,
  ServicesContainer,
  ServicesAvatar,
  ServicesTimeContainer,
  ServicesInfo,
  ServicesName,
  ServicesMeta,
  ServicesText,
  ServicesTime,
  ServicesMetaText,
  ServicesListTitle,
 
} from './styles';
import api from '@src/services/api';
import Icon from 'react-native-vector-icons/Feather';
import { Animated } from 'react-native';
import { Feather } from '@expo/vector-icons';

export interface Service {
  id: number;
  idprovider: string;
  localservice: string;
  dateservice: string;
  timeservice: string;
  typeservice: string;
}

export function Schedules({ navigation }){
  const theme = useTheme();
  const {user} = useAuth(); 
  const [services, setServices] = useState<Service[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  async function handleRemove(service :Service) {
    Alert.alert('Remover',`Deseja remover a ${service.idprovider}?`,[
      {
        text: 'Não',
        style: 'cancel'
      },
      {
        text: 'Sim',
        onPress: async ()=>{
          try {
            const responseServices = await api.post("/service/delete/", {id: String(service.id)}); 
            setServices(oldData => oldData.filter(item => item.id !== service.id))
          }
          catch(error){
            Alert.alert('Não foi possível remover')
          }
        }
      }
    ])
  }
  async function loadData(){

    const responseServices = await api.post("/service/getbyuser/", {iduser: String(user.id)}); 

    const {service} = responseServices.data;

    setServices(service);
 
    setRefreshing(false);
  }

  const onRefresh = () => {
    setRefreshing(true);
    setServices([]);
    loadData();
  };

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
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
              />
            }
            renderItem={({ item: service }) => (
              <Swipeable
                overshootRight={false}
                renderRightActions={()=>(
                  <Animated.View>
                    <View>
                        <RemoveButton
                          onPress={() => handleRemove(service)}
                        >
                          <Feather 
                            name="trash"
                            size={32}
                            color= {theme.COLORS.SHAPE}
                          />
                        </RemoveButton>
                    </View>
                  </Animated.View>
                )}
              >
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
                                      
                      
                  </ServicesInfo>
                  
                  <ServicesTimeContainer>
                    <ServicesTime>
                        <Icon name="calendar" size={14} color="#FF9000" />
                        <ServicesMetaText>{service.dateservice}</ServicesMetaText>
                    </ServicesTime>  
                    <ServicesTime>  
                        <Icon name="clock" size={14} color="#FF9000" />
                        <ServicesMetaText>{service.timeservice}</ServicesMetaText>
                    </ServicesTime>   
                  </ServicesTimeContainer>
              
                </ServicesContainer>
              </Swipeable>
            )}
          />
      
        
      </KeyboardAvoidingView>
    </Container>
  )
}