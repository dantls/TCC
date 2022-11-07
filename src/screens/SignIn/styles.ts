import styled, {css} from 'styled-components/native';
import { getBottomSpace } from 'react-native-iphone-x-helper';

export const Container = styled.View`
  flex: 1;
  background-color: ${({theme}) => theme.COLORS.BACKGROUND};
  justify-content: center;
`;


export const Content = styled.ScrollView.attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: {
    paddingBottom: getBottomSpace() + 48
  }
})`
  width: 100%;
  padding: 0 32px;

`;

export const Title = styled.Text`
  font-size: 32px;
  margin-bottom: 16px;
  align-self: center;

  ${({theme})=> css`
    font-family: ${theme.FONTS.TITLE};
    color: ${theme.COLORS.TITLE}
  `};

`;

export const Brand = styled.Image.attrs({
  resizeMode: 'contain'
})`
  height: 340px;
  margin-top: 64px;
  margin-bottom: 24px;
`;

export const ForgotPasswordButton = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  margin: 25px 0;

`;

export const ForgotPasswordLabel = styled.Text`
  font-size: 14px;
  ${({theme})=> css`
    font-family: ${theme.FONTS.TEXT};
    color: ${theme.COLORS.TITLE}
  `};
`;

export const CreateAccountButton = styled.TouchableOpacity`
  /* position: absolute;
  left: 0;
  bottom: 0;
  right: 0; */
  background: #312e38;
  border-top-width: 1px;
  border-color: #232129;
  margin-top: 80px;
  padding: 12px 0;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const CreateAccountButtonText = styled.Text`
  color: ${({theme}) => theme.COLORS.PRIMARY_900};
  font-size: 15px;
  font-family: ${({theme})=> theme.FONTS.MEDIUM};
`;