import styled, {css} from 'styled-components/native';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import { FlatList } from 'react-native';
import { Service } from './index';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled.View`
  flex: 1;
  background-color: ${({theme}) => theme.COLORS.BACKGROUND};
  /* justify-content: center; */
`;


export const Content = styled.ScrollView.attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: {
    paddingBottom: getBottomSpace() + 48
  }
})`
  width: 100%;
  /* padding: 0 32px; */

`;

export const Title = styled.Text`
  font-size: 32px;
  margin: 26px 0 0;
  align-self: center;

  ${({theme})=> css`
    font-family: ${theme.FONTS.TITLE};
    color: ${theme.COLORS.TITLE}
  `};

`;

export const ServicesList = styled(FlatList as new () => FlatList<Service>)`
  padding: 32px 24px 16px;
`;

export const ServicesContainer = styled(RectButton)`
  background: #3e3b47;
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 20px;
  flex-direction: row;
  align-items: center;
`;

export const ServicesAvatar = styled.Image`
  width: 72px;
  height: 72px;
  border-radius: 36px;
`;

export const ServicesInfo = styled.View`
  flex: 1;
  margin-left: 20px;
`;

export const ServicesName = styled.Text`
  font-family: ${({theme}) => theme.FONTS.MEDIUM};
  font-size: 18px;
  color: #f4ede8;
`;

export const ServicesMeta = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 8px;
`;

export const ServicesMetaText = styled.Text`
  color: #999591;
  margin-left: 8px;
  margin-right: 8px;
  font-family: ${({theme}) => theme.FONTS.TEXT};
`;
export const ServicesText = styled.Text`
  color: #999591;
  /* margin-left: 8px; */
  margin-right: 8px;
  font-family: ${({theme}) => theme.FONTS.TEXT};
`;
export const ServicesListTitle = styled.Text`
  font-family: ${({theme}) => theme.FONTS.MEDIUM};
  font-size: 24px;
  color: #f4ede8;
  margin-bottom: 24px;
`;