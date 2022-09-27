import styled, {css} from 'styled-components/native';
import { getBottomSpace } from 'react-native-iphone-x-helper';

export const Container = styled.View`
  flex: 1;
  background-color: ${({theme}) => theme.COLORS.BACKGROUND};
`;


export const Content = styled.ScrollView.attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: {
    paddingBottom: getBottomSpace() + 38
  }
})`
  width: 100%;
  padding: 0 32px;

`;

export const Title = styled.Text`
  font-size: 32px;
  margin-bottom: 28px;
  align-self: center;

  ${({theme})=> css`
    font-family: ${theme.FONTS.TITLE};
    color: ${theme.COLORS.TITLE}
  `};

`;
export const UserAvatarButton = styled.TouchableOpacity`
  font-size: 32px;
  margin-bottom: 28px;
  align-self: center;

  ${({theme})=> css`
    font-family: ${theme.FONTS.TITLE};
    color: ${theme.COLORS.TITLE}
  `};

`;
export const BackButton = styled.TouchableOpacity`
  ${({theme})=> css`
    font-family: ${theme.FONTS.TITLE};
    color: #f4ede8;
  `};
  margin-top: 32px;
  
`;
export const UserAvatar = styled.Image`
  width: 186px;
  height: 186px;
  border-radius:98px;
  
  align-self: center;
  background-color: #fff;
`;

