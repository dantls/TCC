import React, { useMemo, useState,useCallback, useEffect } from 'react';
// import DateTimePicker from '@react-native-community/datetimepicker'
import {Platform, Alert, Text} from 'react-native';
import {StatusBar} from 'expo-status-bar';
import { format } from 'date-fns';
import {
  Container,
  Content,
  ProvidersListContainer,
  ProvidersList,
  // Calendar,
  CalendarTitle,
  OpenDatePickerButton,
  OpenDatePickerText,
  Schedule,
  Section,
  SectionContent,
  SectionTitle,
  Hour,
  HourText,
  CreateAppointmentButton,
  CreateAppointmentButtonText,
  ProviderContainer,
  ProviderAvatar,
  ProviderName
} from './styles';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Calendar,  DateData, MarkedDateProps } from '@src/components/Calendar';
import { generateMarked } from '@src/components/Calendar/generateMarked';
import { BackButton } from '@src/components/BackButton';
import { TextArea } from '@src/components/TextArea';
import { Input } from '@src/components/Input';
import { useAuth } from '@src/hooks/auth';
import api from '@src/services/api';

const initialDate = [
  {
    "hour":8,
    "available":false
  },
  {
    "hour":9,
    "available":true
  },
  {
    "hour":10,
    "available":true
  },
  {
    "hour":11,
    "available":true
  },
  {
    "hour":12,
    "available":false
  },
  {
    "hour":13,
    "available":true
  },
  {
    "hour":14,
    "available":true
  },
  {
    "hour":15,
    "available":true
  },
  {
    "hour":16,
    "available":true
  },
  {
    "hour":17,
    "available":true
  }
  
]

interface AvailabilityItem {
  hour: number;
  available: boolean;
}

export interface Provider {
  id: number;
  name: string;
  email:string;
  photo: string;
  isFavorite?: boolean;
}

interface RouteParams {
  providerId: string;
}


export function Appointments(){
  const route = useRoute();
  const {goBack, navigate} = useNavigation();
  const {user} = useAuth(); 

  const routeParams = route.params as RouteParams;

  // const [providers, setProviders] = useState<Provider[]>([]);
  const [availability, setAvailability] = useState<AvailabilityItem[]>(initialDate);
  // const [showDatePicker, setShowDatePicker] = useState(false);

  const [selectedProvider, setSelectedProvider] = useState(routeParams.providerId);

  const [selectedHour, setSelectedHour] = useState(0);

  const [selectedDate, setSelectedDate] = useState<DateData>({} as DateData);

  const [markedDate, setMarketDate] = useState<MarkedDateProps>({}as MarkedDateProps);

  const [typeservice,setTypeservice]  = useState('');
  const [description,setDescription]  = useState('');
  const [localservice,setLocalService]  = useState('');

  const handleChangeDate = (date:DateData)=>{
    setSelectedDate(date)
    setMarketDate(generateMarked(date))
  }

  // const handleToggleDatePicker = () => {
  //   return setShowDatePicker((state) => !state)
  // }
  // const handleDateChanged = (event: any, date: Date | undefined) => {
  //   if (date) {
  //     setSelectedDate(date);
  //   }
  //   if(Platform.OS === 'android') {
  //     return setShowDatePicker(false);
  //   }
  // }

  // const handleSelectProvider = useCallback((providerId: string) => {
  //   setSelectedProvider(providerId);
  // },[])

  const handleSelectHour = useCallback((hour:number) => {
    setSelectedHour(hour);
  },[])

  const handleCreateAppointment = useCallback(async () => {
    try{
      
      const date = new Date(selectedDate.year,selectedDate.month-1,selectedDate.day);
      date.setHours(selectedHour);
      date.setMinutes(0);
      
      const data = {
        iduser: user.id,
        idprovider:selectedProvider,
        dateservice: `${selectedDate.day}-${String(selectedDate.month-1).padStart(2,'0')}-${selectedDate.year}`,
        timeservice: `${String(selectedHour).padStart(2,'0')}:00`,  
        localservice,
        typeservice,
        description        
      }

      const response = await api.post('service/create/', data);

      navigate(
        "AppointmentsCreated",
        {date: date.getTime()}
      );

    }catch(error){
      Alert.alert(
        'Erro ao criar agendamento',
        'Ocorreu um erro ao tentar criar o agendamento, tente novamente.'
      )
    }
  },[selectedDate,
    selectedHour,
    localservice,
    typeservice,
    description ,
   ])

  const morningAvaliability = useMemo(()=>{
    return availability
      .filter(({hour}) => hour < 12)
      .map(({hour,available})=>{
        return {
          hour,
          available,
          hourFormatted: format(new Date().setHours(hour), 'HH:00')
        }
      })
  },[])
  const afternoonAvaliability = useMemo(()=>{
    return availability
      .filter(({hour}) => hour >= 12)
      .map(({hour,available})=>{
        return {
          hour,
          available,
          hourFormatted: format(new Date().setHours(hour), "HH:00")
        }
      })
  },[])

 
  // useEffect(() => {

  //   function loadProviders(){
  //     fetch("https://api-flash-services.herokuapp.com/src/Routes/provider/getall/", {
  //           method: "GET",
  //           headers: {
  //             'Accept': 'application/json',
  //               'Content-Type': 'application/json'
  //           },
  //             body: null
  //           })
  //           .then(response => response.json())
  //           .then(data  => {
  //               const {providers: items} = data
  //               setProviders(items);
  //               console.log(items)
  //           })
  //           .catch(err => {
  //               console.log("Error occurred: " + err);
  //           })
  //   }

  //   loadProviders();
  // },[])

  return (
<>
  <StatusBar style="light"  backgroundColor="transparent" translucent/>

  <Container>
  <BackButton 
    color="#fff"
  />

  <Content>

    {/*       
      <ProvidersListContainer>
        <ProvidersList
          horizontal
          data={providers}
          keyExtractor={(provider) => provider.id}
          renderItem={({ item : provider}) => (
            <ProviderContainer 
              onPress={() => handleSelectProvider(provider.id)}
              selected={provider.id === selectedProvider}
            >
              <ProviderAvatar source= {{uri: provider.photo}}/>
              <ProviderName
                selected={provider.id === selectedProvider}
              >
                {provider.name}
              </ProviderName>
            </ProviderContainer>
          )}
        
        />
      </ProvidersListContainer> */}
      <CalendarTitle>Escolha a data</CalendarTitle>
      <Calendar
         markedDates={markedDate}
         onDayPress={handleChangeDate}
      />

      <Schedule>
        <CalendarTitle>Escolha o horário</CalendarTitle>
        <Section>
          <SectionTitle>Manhã</SectionTitle>
          <SectionContent>
            {morningAvaliability.map(({hourFormatted,hour, available}) => (
              <Hour 
                enabled={available}
                selected={selectedHour === hour}
                available={available}
                key={hourFormatted}
                onPress={() => handleSelectHour(hour)}
              >
                <HourText
                  selected={selectedHour === hour}
                >
                  {hourFormatted}
                </HourText>
              </Hour>
            ))}
          </SectionContent>
        </Section>
        <Section>
          <SectionTitle>Tarde</SectionTitle>
          <SectionContent>
            {afternoonAvaliability.map(({hourFormatted,hour, available}) => (
              <Hour 
                enabled={available}
                selected={selectedHour === hour}
                available={available}
                key={hourFormatted}
                onPress={() => handleSelectHour(hour)}
              >
                <HourText
                  selected={selectedHour === hour}
                >
                  {hourFormatted}
                </HourText>
              </Hour>
            ))}
          </SectionContent>
        </Section>
      </Schedule>
      <SectionTitle>Tipo do serviço</SectionTitle>
    
      <TextArea
        multiline
        maxLength={100}
        numberOfLines={5}
        autoCorrect={false}
        onChangeText={setTypeservice}
      />
      <SectionTitle>Descrição do serviço</SectionTitle>
      <TextArea
        multiline
        maxLength={100}
        numberOfLines={5}
        autoCorrect={false}
        onChangeText={setDescription}
      />
      <SectionTitle>Local do serviço</SectionTitle>
      <TextArea
        multiline
        maxLength={100}
        numberOfLines={5}
        autoCorrect={false}
        onChangeText={setLocalService}
      />
      <CreateAppointmentButton 
        onPress={
          handleCreateAppointment
        }
      >
        <CreateAppointmentButtonText>Agendar</CreateAppointmentButtonText>
      </CreateAppointmentButton>
      </Content>
    </Container>
    </>
  );
}