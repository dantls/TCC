import styled, {css} from 'styled-components/native';
import { FlatList } from 'react-native';
import {Provider} from './index';

interface ProviderContainerProps {
  selected: boolean;
}
interface ProviderNameProps {
  selected: boolean;
}

interface HourProps {
  available: boolean;
  selected: boolean;
}
interface HourTextProps {
  selected: boolean;
}

export const Container = styled.View`
  flex: 1;
  background-color: ${({theme}) => theme.COLORS.BACKGROUND};
  /* justify-content: center; */
`;

export const Content = styled.ScrollView`
`;

export const ProvidersListContainer = styled.View`
  height: 112px;
`;

export const ProvidersList = styled(FlatList as new () => FlatList<Provider>)`
  padding: 32px 24px 16px;
`;


export const ProviderContainer = styled.TouchableOpacity<ProviderContainerProps>`
  background: ${({selected}) => selected ? "#f69000": "#3e3b47"} ;
  flex-direction: row;
  align-items: center;
  padding: 8px 12px;
  margin-right: 16px;
  border-radius: 10px;


`
export const ProviderAvatar = styled.Image`
  width: 32px;
  height: 32px;
  border-radius: 16px;
`
export const ProviderName = styled.Text<ProviderNameProps>`
  margin-left: 8px;
  font-size: 16px;
  font-family: ${({theme}) => theme.FONTS.TITLE};
  color: ${({selected}) => selected ? "#232129": "#f4ede8"} ;
`

export const Calendar = styled.View`
  background-color: ${({theme}) => theme.COLORS.BACKGROUND};
`;
export const CalendarTitle = styled.Text`
  margin: 12px 24px  ;
  font-size: 24px;
  ${({theme})=> css`
    font-family: ${theme.FONTS.TITLE};
    color: ${theme.COLORS.TITLE}
  `};

`;
export const OpenDatePickerButton = styled.TouchableOpacity`
  height: 46px;
  border-radius: 10px;
  align-items: center;
  justify-content: center;
  background: #ff9000;
  margin: 0 24px;
`;

export const OpenDatePickerText = styled.Text`
  font-size: 16px;
  ${({theme})=> css`
    font-family: ${theme.FONTS.TEXT};
  `};
  font-weight: bold;
`;


 export const Schedule = styled.View`
  padding: 24px 0 16px;
 
 `;
 export const Section = styled.View`
  margin-bottom: 24px;
 
 `;
 export const SectionContent = styled.ScrollView.attrs({
  contentContainerStyle: {paddingHorizontal: 24},
  horizontal: true,
  showsHorizontalScrollIndicator: false,
 })`
 
 
 `;
 export const SectionTitle = styled.Text`
  font-size: 18px;
  color: #999591;
  ${({theme})=> css`
    font-family: ${theme.FONTS.TEXT};
  `};
  margin: 0 24px 12px;
 `;
 export const Hour = styled.TouchableOpacity<HourProps>`
  padding: 12px;
  background: ${({selected}) => selected ? '#ff9000': '#3e3b47'};
  border-radius: 10px;
  margin-right: 10px;

  opacity: ${({available})=> ( available ? 1 : 0.3)};
 
 `;
export const HourText = styled.Text<HourTextProps>`
  color: ${({selected}) => selected ? '#232129': '#f4ede8'};
  ${({theme})=> css`
    font-family: ${theme.FONTS.TITLE};
  `}

`;

export const CreateAppointmentButton = styled.TouchableOpacity`
 height: 50px;
  border-radius: 10px;
  align-items: center;
  justify-content: center;
  background: #ff9000;
  margin: 0 24px;
`;
export const CreateAppointmentButtonText = styled.Text`
 
  ${({theme})=> css`
    font-family: ${theme.FONTS.TEXT};
  `}
  font-weight: bold;
  font-size: 16px;
  color: #232129;
`;
