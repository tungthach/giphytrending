import merge from 'merge';
import { lightBaseTheme, colors, spacing } from 'material-ui/styles';

export default merge.recursive(true, lightBaseTheme, {
  spacing,
  fontFamily: 'Roboto, sans-serif',
  palette: {
    primary1Color: colors.teal600,
    primary2Color: colors.lightBlue900,
    canvas2Color: colors.grey50,
    errorColor: colors.red500,
    successColor: colors.green500
  },
  zIndex: {
    dataTableHeader: 10,
    listPageToolbar: 20
  }
});