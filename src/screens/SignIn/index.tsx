import React, {useState} from 'react'; 
import { Input } from '@components/Input';
import api from '../../services/api';
import { useAuth } from '../../hooks/auth';
import { Button } from '@components/Button';
import { useNavigation } from '@react-navigation/native';

import { KeyboardAvoidingView, Platform } from 'react-native';
import {
  Container,
  Content,
  Title,
  Brand,
  CreateAccountButton,
  CreateAccountButtonText,
  ForgotPasswordLabel,
  ForgotPasswordButton
} from './styles';


// import brandImg from '@assets/brand.png';

export function SignIn(){
  const { navigate } = useNavigation();
  const { signIn } = useAuth();

  const [email,setEmail]  = useState('');
  const [password,setPassword]  = useState('');

  function handleRegister(){
    signIn({email, password});
  
    // fetch("https://api-flash-services.herokuapp.com/src/Routes/login/", {
    //   method: "POST",
    //   headers: {
    //     'Accept': 'application/json',
    //       'Content-Type': 'application/json'
    //   },
    //     body: JSON.stringify({
    //         "email": email,
    //         "password": password
    //     })
    //   })
    //   .then(response => response.json())
    //   .then(data => {
    //       console.log(data);
    //   })
    //   .catch(err => {
    //       console.log("Error occurred: " + err);
    //   })


    // let reqs = await fetch('https://api-flash-services.herokuapp.com/src/Routes/login/',{
    //   method:'POST',
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify(data)
    
    // });

    // let ress = await reqs.json();

    // console.log(ress)

    // await signIn({
    //   email,
    //   password
    // });
    // console.log(ress);
  }

  return(
    <Container>
       <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding': undefined}
        >
          <Content>
            {/* <Brand source={brandImg}/> */}
            <Title>Faça seu Login</Title>
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
            <Button 
              title="Entrar"
              type="secondary"
              onPress={handleRegister}
            />

            <ForgotPasswordButton>
              <ForgotPasswordLabel>Esqueci minha senha</ForgotPasswordLabel>
            </ForgotPasswordButton>

            <CreateAccountButton
              onPress={() => {
                navigate('User');
              }}
            >
              {/* <Icon name="log-in" size={20} color="#39ff14" /> */}
              <CreateAccountButtonText>Criar uma conta</CreateAccountButtonText>
            </CreateAccountButton>
          
        </Content>
      </KeyboardAvoidingView>
    </Container>
  )
}