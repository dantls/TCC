import React, { useEffect } from 'react'
import {ActivityIndicator}from 'react-native';
import {Container} from './styles'

export function SplashScreen({ navigation }) {
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('MainBottom')
    }, 2000)
  }, [navigation])

  return (
    <Container>
      <ActivityIndicator size="large" color="#999"/>
    </Container>
  )
}