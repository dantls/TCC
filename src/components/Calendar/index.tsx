import {useTheme} from 'styled-components';
import {Calendar as CustomCalendar,
LocaleConfig} from 'react-native-calendars';


LocaleConfig.locales['pt-br'] = {
  monthNames: ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'],
  monthNamesShort: ['Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez'],
  dayNames: ['Domingo','Segunda','Terça','Quarta','Quinta','Sexta'],
  dayNamesShort: ['DOM','SEG','TER','QUA','QUI','SEX','SÁB'],
}

LocaleConfig.defaultLocale = 'pt-br';

interface DateData {
  year: number;
  month: number;
  day: number;
  timestamp: number;
  dateString: string;
};

interface MarkedDateProps{
  [x: string]: {
    customStyles: {
        container: {
            backgroundColor: string;
        };
        text: {
            color: string;
            fontWeight: string;
        };
    };
};
}

interface CalendarProps {
  markedDates: MarkedDateProps;
  onDayPress: (date: DateData) => void;
}


function Calendar({onDayPress,markedDates}:CalendarProps){
  const theme = useTheme();

 

  return(
    <CustomCalendar 
      markingType={'custom'}
      markedDates={markedDates}
      minDate={String(new Date())}
      onDayPress={onDayPress}
      
    />

    
  )
}

export {
  Calendar,
  DateData,
  MarkedDateProps
}