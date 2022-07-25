import React from 'react'; 

import { KeyboardAvoidingView, Platform } from 'react-native';
import {
  Container,
  Content,
  Title,
} from './styles';


export function Home(){

  return(
    <Container>
       <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding': undefined}
        >
          <Content>
            <Title>Home</Title>
        </Content>
      </KeyboardAvoidingView>
    </Container>
  )
}