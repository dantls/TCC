import { Button } from '@components/Button';
import { Input } from '@components/Input';
import React, { useState } from 'react'; 

import { KeyboardAvoidingView, Platform } from 'react-native';
import {
  Container,
  Content,
  Title,
} from './styles';


export function Profile(){

  function handleRegister(){
    const data = {
      name,
      email,
      phone,
      street,
      district,
      city
    }

    console.log(data)

  }

  const [name,setName]  = useState('');
  const [email,setEmail]  = useState('');
  const [phone,setPhone]  = useState('');
  const [street,setStreet]  = useState('');
  const [district,setDistrict]  = useState('');
  const [city,setCity]  = useState('');


  return(
    <Container>
       <KeyboardAvoidingView>
          <Content>
            <Title>Perfil</Title>

            <Input 
              placeholder="Nome"
              type="secondary"
              autoCorrect = {false}
              autoCapitalize = "none"
              onChangeText={setName}
            />
            <Input 
             placeholder="E-mail"
             type="secondary"
             autoCorrect = {false}
             autoCapitalize = "none"
             onChangeText={setEmail}
            />
            <Input 
             placeholder="Celular"
             type="secondary"
             autoCorrect = {false}
             autoCapitalize = "none"
             onChangeText={setPhone}
            />
            <Input 
              placeholder="Rua"
              type="secondary"
              autoCorrect = {false}
              autoCapitalize = "none"
              onChangeText={setStreet}
            />
         
            <Input 
              placeholder="Bairro"
              type="secondary"
              autoCorrect = {false}
              autoCapitalize = "none"
              onChangeText={setDistrict}
            />
          
            <Input 
              placeholder="Cidade"
              type="secondary"
              autoCorrect = {false}
              autoCapitalize = "none"
              onChangeText={setCity}
            />
            
           
           
            <Button 
              title="Salvar"
              type="secondary"
              onPress={handleRegister}
            />
        </Content>
      </KeyboardAvoidingView>
    </Container>
  )
}