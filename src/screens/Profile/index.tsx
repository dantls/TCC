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
 

  return(
    <Container>
       <KeyboardAvoidingView>
          <Content>
            <Title>Perfil</Title>
        </Content>
      </KeyboardAvoidingView>
    </Container>
  )
}