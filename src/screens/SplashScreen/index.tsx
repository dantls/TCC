import React, { useEffect } from 'react'
import {ActivityIndicator}from 'react-native';
import {Container} from './styles'
import { useNavigation } from '@react-navigation/native';

export function SplashScreen() {
  const {reset} = useNavigation();
 
  useEffect(() => {
    setTimeout(() => {
      reset({
        routes: [
          { name: 'MainBottom'}
        ],
        index: 0
      })
    }, 2000)
  }, [reset])

  return (
    <Container>
      <ActivityIndicator size="large" color="#999"/>
    </Container>
  )
}