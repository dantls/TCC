import { DateData } from ".";

export function generateMarked (date: DateData){

  const key = date.dateString;
  const marked = {
      [key]:{
        customStyles: {
          container: {
            backgroundColor: '#FF9000',
          },
          text: {
            color: 'black',
            fontWeight: 'bold'
          }
        }
      },
  }
return marked

}