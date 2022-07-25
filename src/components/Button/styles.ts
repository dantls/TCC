import styled ,{ css } from 'styled-components/native';

import { RectButton } from 'react-native-gesture-handler';

export type TypeProps = 'primary' | 'secondary';

type ContainerProps = {
  type: TypeProps
};

export const Container = styled(RectButton)<ContainerProps>`
  flex:1; 
  max-height: 56px;
  min-height: 56px;
  border-radius: 12px;

  justify-content: center;
  align-items: center;
  
  ${({theme, type}) => css`
    background-color: ${type === 'primary' ? theme.COLORS.SUCCESS_900 : theme.COLORS.PRIMARY_800};
  `};
`;

export const Title = styled.Text`
  font-size: 16px;
  
  ${({theme}) => css`
    color: #232129
    font-family: ${theme.FONTS.MEDIUM};
  `};
`;

export const Load = styled.ActivityIndicator.attrs(({theme})=> ({
  color: theme.COLORS.TITLE
}))``;
