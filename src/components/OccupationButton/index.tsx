import React from 'react';
import { Text } from 'react-native';
import { styles } from './styles';

import { RectButton, RectButtonProps } from 'react-native-gesture-handler'


interface OccupationProps extends RectButtonProps{
  title: string;
  active?: boolean;
} 

export function OccupationButton({ 
  title,
  active = false,
  ...rest
}: OccupationProps) {

  return(
     <RectButton
      style={[
        styles.container,
        active && styles.containerActive,
        
      ]}
      {...rest}
     >
       <Text style={[
         styles.title,
         active && styles.titleActive,
       ]}>
         {title}
       </Text>
    </RectButton>
  )
}