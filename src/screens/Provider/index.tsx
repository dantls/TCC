import { Button } from '@components/Button';
import { Input } from '@components/Input';
import React, { useState } from 'react'; 
import { useNavigation } from '@react-navigation/native';

import { KeyboardAvoidingView } from 'react-native';
import {
  Container,
  Content,
  Title,
} from './styles';


import { useAuth } from '../../hooks/auth';


export function Provider(){
  const {navigate} = useNavigation();

  // useEffect(() => {
  //   fetch("https://api-flash-services.herokuapp.com/src/Routes/user/read/", {
  //     method: "POST",
  //     headers: {
  //       'Accept': 'application/json',
  //         'Content-Type': 'application/json'
  //     },
  //       body: JSON.stringify({
  //           "id": user.id,
  //       })
  //     })
  //     .then(()=>{
  //       navigate('Home')
  //     })
  //     .catch(err => {
  //         console.log("Error occurred: " + err);
  //     })
  // },[])

  const { user } = useAuth();

  function handleRegister(){
    const data = {
      id: user.id,
      name,
      email,
      phone,
      street,
      district,
      city
    }
    fetch("https://api-flash-services.herokuapp.com/src/Routes/user/update/", {
      method: "POST",
      headers: {
        'Accept': 'application/json',
          'Content-Type': 'application/json'
      },
        body: JSON.stringify({
            "id": data.id,
            "name": data.name,
            "email": data.email,
            "phone": data.phone,
            "street": data.street,
            "district": data.district,
            "city": data.city
        })
      })
      .then(()=>{
        navigate('Home')
      })
      .catch(err => {
          console.log("Error occurred: " + err);
      })
    console.log(data)

  }

  const [name,setName]  = useState(user.name || '');
  const [email,setEmail]  = useState( user.email || '');
  const [phone,setPhone]  = useState(user.phone || '');
  const [street,setStreet]  = useState(user.street || '');
  const [district,setDistrict]  = useState(user.district || '');
  const [city,setCity]  = useState(user.city || '');


  return(
    <Container>
       <KeyboardAvoidingView>
          <Content>
            <Title>Perfil</Title>

            <Input 
              placeholder="Nome"
              type="secondary"
              value={name}
              autoCorrect = {false}
              autoCapitalize = "none"
              onChangeText={setName}
            />
            <Input 
             placeholder="E-mail"
             type="secondary"
             value = {email}
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