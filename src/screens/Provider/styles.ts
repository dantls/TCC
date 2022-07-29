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
    paddingTop: 68,
    paddingBottom: getBottomSpace() + 48
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