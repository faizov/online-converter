import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';

import useStyles from './styles'

import { CryptoTable, Converter } from './components/'

function App() {
  const classes = useStyles();

  return (
    <Container maxWidth="lg">
      <div className={classes.root}>
        <Grid container spacing={3}>
          <Grid item xs={8}>
            <CryptoTable classes={classes} />
          </Grid>
          <Grid item xs={4} container>
            <Converter classes={classes} />
          </Grid>
        </Grid>
      </div>
    </Container>
  );
}

export default App;
