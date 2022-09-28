import React ,{useCallback, useMemo} from 'react';
import Icon from 'react-native-vector-icons/Feather';
// import {Platform, Alert} from 'react-native';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import {
  Container,
  Title,
  Description,
  OkButton,
  OkButtonText
} from './styles';
import { useNavigation ,useRoute} from '@react-navigation/native';


interface RouteParams {
  date: number;
}

export function AppointmentsCreated(){
  const {reset} = useNavigation();
  const { params } = useRoute();

  const routeParams = params as RouteParams;


  const handleOkPressed = useCallback(() => {
    reset({
      routes: [
        { name: 'MainBottom'}
      ],
      index: 0
    })
  },[]);

  const formattedDate = useMemo(()=>{

    return format(
      routeParams.date,
      "EEEE', dia' dd 'de' MMMM 'de' yyyy 'às' HH:mm'h'",
      {locale: ptBR})
  },[routeParams.date])

  return (
    <Container>
      <Icon 
        name="check"
        size={80}
        color="#FF9000"
      />
      <Title>Agendamento concluído</Title>
      <Description>{formattedDate}</Description>
   
      <OkButton
        onPress={handleOkPressed}
      >
        <OkButtonText>Ok</OkButtonText>
      </OkButton>
    </Container>
  );
}