import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import styled, {css} from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background-color: ${({theme}) => theme.COLORS.BACKGROUND};
`;

export const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  
  position: absolute;
  margin-top: ${getStatusBarHeight()+ 18}px;
  margin-left: 24px;

`;

export const CarImages = styled.View`
  margin-top: ${getStatusBarHeight()+ 32}px;
`;

export const Title = styled.Text`
margin: 36px 24px;
text-align: center;
font-size: 28px;
${({theme})=> css`
  font-family: ${theme.FONTS.TITLE};
  color: ${theme.COLORS.TITLE};
`};

`;
export const Content = styled.ScrollView.attrs({
  contentContainerStyle:{
    paddingBottom: 24,
    alignItems: 'center'
  },
  showsVerticalScrollIndicator: false
})``;


export const ServicesOffered = styled.Text`
  color: ${({theme}) => theme.COLORS.PRIMARY_900};
  font-family: ${({theme}) => theme.FONTS.MEDIUM};
  font-size: 20px;
`;

export const About = styled.Text`
  color: ${({theme}) => theme.COLORS.SHAPE};
  font-family: ${({theme}) => theme.FONTS.TEXT};
  margin: 12px 24px  ;
  font-size: 18px;
  text-align: justify;
`;

export const Rating = styled.Text`
  color: ${({theme}) => theme.COLORS.PRIMARY_900};
  font-family: ${({theme}) => theme.FONTS.MEDIUM};
  font-size: 20px;
  margin-top: 24px;
`;



export const CreateAppointmentButton = styled.TouchableOpacity`
  height: 50px;
  border-radius: 10px;
  align-items: center;
  justify-content: center;
  background: #ff9000;
  margin: 0 24px 16px;
`;

export const CreateAppointmentButtonText = styled.Text`
 
  ${({theme})=> css`
    font-family: ${theme.FONTS.TEXT};
  `}
  font-weight: bold;
  font-size: 16px;
  color: #232129;
`;
