import { Button } from '@components/Button';
import { Input } from '@components/Input';
import React, { useState } from 'react'; 


import { KeyboardAvoidingView, Platform,TouchableOpacity,Text} from 'react-native';
import {
  Container,
  Content,
  Title,
} from './styles';
import {useAuth} from '../../hooks/auth';

export function Recent(){
  const { signOut } = useAuth();

  function handleLogout(){
    console.log("handle");
    signOut();
  }

  return(
    <Container>
       <KeyboardAvoidingView>
          <Content>
            <Title>Recentes</Title>
            {/* <Button 
              title="Logout"
                onPress={() => handleLogout()}
            /> */}
          <TouchableOpacity
            // style={styles.button}
            onPress={handleLogout}
          >
        <Text>Press Here</Text>
      </TouchableOpacity>
          </Content>
      </KeyboardAvoidingView>
    </Container>
  )
}