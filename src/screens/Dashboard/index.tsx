import { useNavigation } from '@react-navigation/native';
import { Header } from '@src/components/Header/Index';
// import { TabsRoutes } from '@src/routes/tabs.routes';
// import { Header } from '@components/Header';
import {useCallback, useState} from 'react';
import Icon from 'react-native-vector-icons/Feather';
import {
  Container,
  ProvidersList,
  ProvidersListTitle,
  ProviderContainer,
  ProviderMeta,
  ProviderMetaText,
  ProviderAvatar,
  ProviderInfo,
  ProviderName
} from './styles';

interface Provider {
  id: number;
  name: string;
  photo: string;
}

const providersList: Provider[] = [
  {
    "id": 3,
    "name": "ALAM TRINDADE MANUTENCOES",
    "email": "alam.trindade@bonitoponto.com.br",
    "phone": "(67)98418-1733",
    "photo": "https:\/\/eletrokassio.com.br\/wp-content\/uploads\/elementor\/thumbs\/Manutencoes-Residenciais-pf4uomuxioe64g84homm3euiom3uaryuwlpsi0f0k4.png",
    "password": null,
    "cash": "0",
    "idoccupation": null
  },
  {
    "id": 4,
    "name": "MARIANA HAIR",
    "email": "marihair@gmail.com",
    "phone": "(67)99188-7766",
    "photo": "https:\/\/static01.nyt.com\/images\/2022\/04\/24\/magazine\/24mag-kids-hairdiscrimination-03\/24mag-kids-hairdiscrimination-03-mobileMasterAt3x.jpg",
    "password": null,
    "cash": "0",
    "idoccupation": null
  },
  {
    "id": 5,
    "name": "MILAGRE ESTETICA",
    "email": "mnc@gmail.com",
    "phone": "(67)98418-1733",
    "photo": "https:\/\/eletrokassio.com.br\/wp-content\/uploads\/elementor\/thumbs\/Manutencoes-Residenciais-pf4uomuxioe64g84homm3euiom3uaryuwlpsi0f0k4.png",
    "password": null,
    "cash": "0",
    "idoccupation": null
  },
  {
    "id": 1,
    "name": "BONITO PONTO MÁQUINAS DE COSTURA",
    "email": "bonitoponto@gmail.com",
    "phone": "(67)98418-1733",
    "photo": "https:\/\/scontent.ftjl2-1.fna.fbcdn.net\/v\/t39.30808-6\/217640788_4030828770371441_6311139173051681747_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=0CXl0VxWHFUAX8SmuEZ&_nc_oc=AQm6H_ohC9ZGXjEIuzUXLbEgjyamBGovBvg01Pbu1utKHfQsvGrGt830nqQs1ymjBfE&_nc_ht=scontent.ftjl2-1.fna&oh=00_AT-vlc44c4_LIxLmtNjoSGkr337oVP3jOu2HMK7hLgmCwg&oe=62EAB485",
    "password": null,
    "cash": null,
    "idoccupation": null
  },
]

export function Dashboard(){
  const {navigate} = useNavigation()
  const [providers, setProviders] = useState<Provider[]>(providersList);

  const navigateToProfile = useCallback(() => {
    navigate('Profile');
  },[navigate])

  return(
    <>
      <Header />

      <Container>
        
        <ProvidersList
          data={providers}
          keyExtractor={provider => provider.id}
          ListHeaderComponent={
            <ProvidersListTitle>Cabelereiros</ProvidersListTitle>
          }
          renderItem={({ item: provider }) => (
            <ProviderContainer
              // onPress={() => navigateToCreateAppointment(provider.id)}
              onPress={() => {}}
              key={provider.id}
            >
              <ProviderAvatar source={{ uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIxIo0i7f40LMinBi7faUWmfu76GX_VQcYEg&usqp=CAU" }} />
              <ProviderInfo>
                <ProviderName>Joaquim do Corte</ProviderName>
                <ProviderMeta>
                  <Icon name="calendar" size={14} color="#ff9000" />
                  <ProviderMetaText>Segunda à sábado</ProviderMetaText>
                </ProviderMeta>

                <ProviderMeta>
                  <Icon name="clock" size={14} color="#ff9000" />
                  <ProviderMetaText>8h às 18h</ProviderMetaText>
                </ProviderMeta>
              </ProviderInfo>
            </ProviderContainer>
          )}
        />
        
      </Container>
    </>
  )
}