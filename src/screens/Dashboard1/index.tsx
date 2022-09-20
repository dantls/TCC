import { useNavigation } from '@react-navigation/native';
import {useCallback} from 'react';
import Icon from 'react-native-vector-icons/Feather';
import {
  Container,
  Header,
  HeaderTitle,
  UserName,
  ProfileButton,
  UserAvatar,
  ProvidersList,
  ProvidersListTitle,
  ProviderContainer,
  ProviderMeta,
  ProviderMetaText,
  ProviderAvatar,
  ProviderInfo,
  ProviderName
} from './styles';

const providers = [
  {}
]

export function Dashboard1(){
  const {navigate} = useNavigation()

  const navigateToProfile = useCallback(() => {
    navigate('Profile');
  },[navigate])

  return(
    <Container>
      <Header>
        <HeaderTitle>
          Bem vindo, {"\n"}
          <UserName>Danilo Gomes</UserName>
        </HeaderTitle>
      
        <ProfileButton onPress={navigateToProfile} >
          <UserAvatar source ={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQaM4sg3aaFooLaveswHnzau2ZtT9kG2dPpTQ&usqp=CAU'}} />
        </ProfileButton>

      
      </Header>

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
  )
}