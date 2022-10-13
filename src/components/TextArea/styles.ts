import { StyleSheet } from 'react-native';
import theme  from '../../theme/';

export const styles = StyleSheet.create({
  container: {
    // width: '100%',
    height: 95,
    marginHorizontal: 20,
    marginBottom: 20,
    backgroundColor: theme.COLORS.BACKGROUND,
    color: theme.COLORS.TITLE,
    borderRadius: 8,
    // fontFamily: theme.fonts.text400,
    fontSize: 13,
    // marginRight: 4,
    borderWidth: 1,
    borderColor: '#232129',
    paddingHorizontal: 16,
    paddingTop: 16,
    textAlignVertical: 'top'
  }
});