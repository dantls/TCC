import { Button } from '@components/Button';
import { Input } from '@components/Input';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react'; 

import { KeyboardAvoidingView, Platform } from 'react-native';
import {
  Container,
  Content,
  Title,
} from './styles';


export function User(){
  const {navigate} = useNavigation();
  const [name,setName]  = useState('');
  const [email,setEmail]  = useState('');
  const [password,setPassword]  = useState('');
  const [confirmPassword,setConfirmPassword]  = useState('');

  function handleRegister(){
    const data = {
      name,
      email,
      password,
      confirmPassword
    }

    fetch("https://api-flash-services.herokuapp.com/src/Routes/user/create/", {
      method: "POST",
      headers: {
        'Accept': 'application/json',
          'Content-Type': 'application/json'
      },
        body: JSON.stringify({
            "name": data.name,
            "email": data.email,
            "password": data.password,
            "confirmPassword": data.confirmPassword
        })
      })
      .then(()=>{
        navigate('SignIn')
      })
      .catch(err => {
          console.log("Error occurred: " + err);
      })
  }

  return(
    <Container>
       <KeyboardAvoidingView>
          <Content>
            <Title>Cadastro de Usuário</Title>

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
              placeholder="Senha"
              type="secondary"
              secureTextEntry
              onChangeText={setPassword}

            />
             <Input 
              placeholder="Confirmação de Senha"
              type="secondary"
              secureTextEntry
              onChangeText={setConfirmPassword}

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