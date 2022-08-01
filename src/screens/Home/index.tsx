import React, {useState, useEffect, useCallback, useMemo} from 'react'; 
import Icon from 'react-native-vector-icons/Feather';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

import { KeyboardAvoidingView, Platform } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { useFavorites } from '@hooks/favorites';
import { useAuth } from '@hooks/auth';

import {
  Container,
  Content,
  Title,
  ProvidersList,
  ProvidersListTitle,
  ProviderContainer,
  ProviderMeta,
  ProviderMetaText,
  ProviderAvatar,
  ProviderInfo,
  ProviderName,
} from './styles';

import {OccupationButton } from '../../components/OccupationButton';
import { Provider } from '../Provider';

interface OccupationsProps {
  id: number;
  name: string
}

export interface Provider {
  id: number;
  name: string;
  email:string
  photo: string;
  isFavorite?: boolean;
}

export function Home(){
  const {user} = useAuth(); 
  const {favorites, getFavorites, addFavorite} = useFavorites(); 

  const [loadOccupations, setLoadOccupations] = useState<OccupationsProps[]>([]);
  const [providers, setProviders] = useState<Provider[]>([]);
  const [occupationsSelected, setOccupationsSelected] = useState(0); 
  

  const toggleFavorite = (providerId: string) => {
    addFavorite(user.id, providerId);
    getFavorites(user.id)
    loadData();
  }


  function loadData(){

    fetch("https://api-flash-services.herokuapp.com/src/Routes/provider/getall/", {
          method: "GET",
          headers: {
            'Accept': 'application/json',
              'Content-Type': 'application/json'
          },
            body: null
          })
          .then(response => response.json())
          .then(data => {
              const {providers: items} = data

              const formattedProviders = items.map((provider:Provider) => {
                const favorite = favorites.find( item => Number(item.idprovider) === provider.id);
                if(favorite){
                  provider.isFavorite = true;
                  return provider;
                }
                provider.isFavorite = false;
                return provider
              });

              setProviders( [...formattedProviders]);

          })
          .catch(err => {
              console.log("Error occurred: " + err);
          })

          fetch("https://api-flash-services.herokuapp.com/src/Routes/occupation/read/", {
            method: "GET",
            headers: {
              'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
              body: null
            })
            .then(response => response.json())
            .then(data => {
                const {occupations} = data
                setLoadOccupations([{
                  id: 0,
                  name: 'TODOS'
                },...occupations]);
            })
            .catch(err => {
                console.log("Error occurred: " + err);
            })     

    }


  useEffect(() => {
    getFavorites(user.id)

  },[])

  useEffect(() => {
    getFavorites(user.id)
    loadData();
  },[favorites])
  
  function handleOccupationSelected (occupation: number){
    setOccupationsSelected(occupation);
    console.log(occupationsSelected)
    // if(occupation === 0){
    //   return setFilteredPlants(plants)
    // }

    // const filtered = plants.filter(plant => plant.environments.includes(environment))

    // setFilteredPlants(filtered);

  }

  return(
    <Container>
       <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding': undefined}
        >
        <Content>
            <FlatList
              data={loadOccupations}
              keyExtractor={(item) => String(item.name)}
              renderItem={({item})=>(
                <OccupationButton 
                  title={item.name}
                  active={item.id === occupationsSelected}
                  onPress={()=>{handleOccupationSelected(Number(item.id))}}
                />
              )}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{
                height: 40,
                justifyContent:'center',
                paddingBottom: 5,
                paddingRight: 30,
                marginLeft: 32,
                marginVertical: 32,
              }}
            />


            <ProvidersList
                    data={providers}
                    keyExtractor={provider => provider.id}
                    ListHeaderComponent={
                      <ProvidersListTitle>Profissionais</ProvidersListTitle>
                    }
                    renderItem={({ item: provider }) => (
                      <ProviderContainer
                        // onPress={() => navigateToCreateAppointment(provider.id)}
                      >
                        <ProviderAvatar source={{ uri: provider.photo }} />
                        <ProviderInfo>
                          <ProviderName>{provider.name}</ProviderName>
                          <ProviderMeta>
                            <Icon name="calendar" size={14} color="#FF9000" />
                            <ProviderMetaText>Segunda à sábado</ProviderMetaText>
                          </ProviderMeta>

                          <ProviderMeta>
                            <Icon name="clock" size={14} color="#FF9000" />
                            <ProviderMetaText>8h às 18h</ProviderMetaText>
                          </ProviderMeta>
                        </ProviderInfo>
                        <MaterialIcon
                            name={provider.isFavorite ? 'favorite' : 'favorite-border'}
                            size={24}
                            color="#FF9000"
                            onPress={() => toggleFavorite(provider.id)}
                        />
                      </ProviderContainer>
                    )}
                  />
        </Content>

        
      </KeyboardAvoidingView>
    </Container>
  )
}