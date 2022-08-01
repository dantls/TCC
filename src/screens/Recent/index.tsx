import React, {useState, useEffect} from 'react'; 
import Icon from 'react-native-vector-icons/Feather';

import { KeyboardAvoidingView, Platform } from 'react-native';
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


export interface Provider {
  id: number;
  name: string;
  email:string
  photo: string;
}

export function Recent(){

  // useEffect(() => {
  //   fetch("https://api-flash-services.herokuapp.com/src/Routes/occupation/read/", {
  //         method: "GET",
  //         headers: {
  //           'Accept': 'application/json',
  //             'Content-Type': 'application/json'
  //         },
  //           body: null
  //         })
  //         .then(response => response.json())
  //         .then(data => {
  //             const {occupations} = data
  //             setLoadOccupations([{
  //               id: 0,
  //               name: 'TODOS'
  //             },...occupations]);
  //         })
  //         .catch(err => {
  //             console.log("Error occurred: " + err);
  //         })

  // },[])
  
 

  const providers: Provider[] = [
    {
      "id": 3,
      "name": "ALAM TRINDADE MANUTENçõES",
      "email": "alam.trindade@bonitoponto.com.br",
      "photo": "https://eletrokassio.com.br/wp-content/uploads/elementor/thumbs/Manutencoes-Residenciais-pf4uomuxioe64g84homm3euiom3uaryuwlpsi0f0k4.png"
      // "phone": "(67)98418-1733",
      // "password": null,
      // "cash": null,
      // "idoccupation": null
    },
    {
      "id": 2,
      "name": "ALAM TRINDADE MANUTENçõES",
      "email": "alam.trindade@bonitoponto.com.br",
      "photo": "https://eletrokassio.com.br/wp-content/uploads/elementor/thumbs/Manutencoes-Residenciais-pf4uomuxioe64g84homm3euiom3uaryuwlpsi0f0k4.png"
      // "password": null,
      // "phone": "(67)98418-1733",
      // "cash": null,
      // "idoccupation": null
    },
    {
      "id": 1,
      "name": "ALAM TRINDADE MANUTENçõES",
      "email": "alam.trindade@bonitoponto.com.br",
      "photo": "https://eletrokassio.com.br/wp-content/uploads/elementor/thumbs/Manutencoes-Residenciais-pf4uomuxioe64g84homm3euiom3uaryuwlpsi0f0k4.png"
      // "phone": "(67)98418-1733",
      // "password": null,
      // "cash": null,
      // "idoccupation": null
    },
  ]


  return(
    <Container>
       <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding': undefined}
        >
        {/* <Content> */}
            <ProvidersList
                    data={providers}
                    keyExtractor={provider => provider.id}
                    ListHeaderComponent={
                      <ProvidersListTitle>Recentes</ProvidersListTitle>
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
                      </ProviderContainer>
                    )}
                  />
        {/* </Content> */}
        
      </KeyboardAvoidingView>
    </Container>
  )
}