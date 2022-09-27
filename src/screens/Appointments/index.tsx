import React, { useMemo, useState,useCallback } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker'
import {Platform, Alert} from 'react-native';
import { format } from 'date-fns';
import {
  Container,
  Content,
  Calendar,
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
  CreateAppointmentButtonText
} from './styles';
import { useNavigation } from '@react-navigation/native';

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


export function Appointments(){
  const {goBack, navigate} = useNavigation();

  const [availability, setAvailability] = useState<AvailabilityItem[]>(initialDate);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedHour, setSelectedHour] = useState(0);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleToggleDatePicker = () => {
    return setShowDatePicker((state) => !state)
  }
  const handleDateChanged = (event: any, date: Date | undefined) => {
    if (date) {
      setSelectedDate(date);
    }
    if(Platform.OS === 'android') {
      return setShowDatePicker(false);
    }
  }

  const handleSelectHour = useCallback((hour:number) => {
    setSelectedHour(hour);
  },[])

  const handleCreateAppointment = useCallback(async () => {
    try{
      const date = selectedDate;

      console.log(date)
      date.setHours(selectedHour);
      date.setMinutes(0);

      // await api.post('appointments',{
      //   provider_id: selectedProvider,
      //   date,
      // });

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
  },[])

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
  return (
    <Container>

      <Content>
      <Calendar>
        <CalendarTitle>Escolha a data</CalendarTitle>

        <OpenDatePickerButton
          onPress={handleToggleDatePicker}
        >
          <OpenDatePickerText>Escolha outra data</OpenDatePickerText>
        </OpenDatePickerButton>
        {
          showDatePicker &&
          (
            <DateTimePicker 
              mode="date" 
              is24Hour
              display="calendar"
              onChange={handleDateChanged}
              value={selectedDate}
            />
          )        
        }
      </Calendar>

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
      <CreateAppointmentButton 
        onPress={handleCreateAppointment}
      >
        <CreateAppointmentButtonText>Agendar</CreateAppointmentButtonText>
      </CreateAppointmentButton>
      </Content>
    </Container>
  );
}