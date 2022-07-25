import { Button } from '@components/Button';
import { Input } from '@components/Input';
import React, { useState } from 'react'; 

import { KeyboardAvoidingView, Platform } from 'react-native';
import {
  Container,
  Content,
  Title,
} from './styles';


export function Provider(){
  const [name,setName]  = useState('');
  const [email,setEmail]  = useState('');
  const [rg,setRG]  = useState('');
  const [cpf,setCPF]  = useState('');

  function handleRegister(){
    const data = {
      name,
      email,
      rg,
      cpf
    }
    console.log(data)
  }

  return(
    <Container>
       <KeyboardAvoidingView>
          <Content>
            <Title>Cadastro de Cliente</Title>

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
             placeholder="RG"
             type="secondary"
             autoCorrect = {false}
             autoCapitalize = "none"
             onChangeText={setRG}

            />
            <Input 
              placeholder="CPF"
              type="secondary"
              autoCorrect = {false}
              autoCapitalize = "none"
              onChangeText={setCPF}

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