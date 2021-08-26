import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      paddingTop: theme.spacing(10),
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
    table: {
      minWidth: 650,
    },
    inputCurrency: {
      marginRight: theme.spacing(2),
    },
    inputsCurrency: {
      margin: theme.spacing(2),
      marginTop: 0,
    },
    totalCurrency: {
      margin: theme.spacing(2),
    },
}));

export default useStyles;