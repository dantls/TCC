import styled from "styled-components/native";
import { Dimensions } from 'react-native';

interface ImageIndexProps{
  active: boolean;
}


export const Container = styled.View`
  width:100%;
`;
export const ImageIndexes = styled.View`
  flex-direction: row;
  padding-right: 24px;
  align-self: flex-end;
`;


export const ImageIndex = styled.View<ImageIndexProps>`
  width: 6px;
  height: 6px;

  margin-left: 8px;
  border-radius: 3px;
  background-color: ${({theme, active})=> active ? theme.COLORS.PRIMARY_900 : theme.COLORS.SHAPE}
`;

export const CarImageWrapper = styled.View`
  width: ${Dimensions.get('window').width}px;
  height: 132px;

  justify-content: center;
  align-items: center;
`;
export const CarImage = styled.Image`
  width: 280px;
  height: 132px;
`;