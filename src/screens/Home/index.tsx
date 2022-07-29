import React, {useState, useEffect} from 'react'; 

import { KeyboardAvoidingView, Platform } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import {
  Container,
  Content,
  Title,
} from './styles';

import {OccupationButton } from '../../components/OccupationButton';

interface OccupationsProps {
  id: number;
  name: string
}


export function Home(){
  const [loadOccupations, setLoadOccupations] = useState<OccupationsProps[]>([]);
  const [occupationsSelected, setOccupationsSelected] = useState(0); 

  useEffect(() => {
    fetch("https://api-flash-services.herokuapp.com/src/Routes/occupation/read/", {
          method: "GET",
          headers: {
            'Accept': 'application/json',
              'Content-Type': 'application/json'
          },
            body: null
          })
          .then(response => response.json())
          .then(data => {
              const {occupations} = data
              setLoadOccupations([{
                id: 0,
                name: 'TODOS'
              },...occupations]);
          })
          .catch(err => {
              console.log("Error occurred: " + err);
          })

  },[])
  
  function handleOccupationSelected (occupation: number){
    setOccupationsSelected(occupation);
    console.log(occupationsSelected)
    // if(occupation === 0){
    //   return setFilteredPlants(plants)
    // }

    // const filtered = plants.filter(plant => plant.environments.includes(environment))

    // setFilteredPlants(filtered);

  }


  return(
    <Container>
       <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding': undefined}
        >
        <Content>
            <Title>Home</Title>
            <FlatList
              data={loadOccupations}
              keyExtractor={(item) => String(item.name)}
              renderItem={({item})=>(
                <OccupationButton 
                  title={item.name}
                  active={item.id === occupationsSelected}
                  onPress={()=>{handleOccupationSelected(Number(item.id))}}
                />
              )}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{
                height: 40,
                justifyContent:'center',
                paddingBottom: 5,
                paddingRight: 30,
                marginLeft: 32,
                marginVertical: 32,
              }}
            />
        </Content>
      </KeyboardAvoidingView>
    </Container>
  )
}