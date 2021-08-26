import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';

// table
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import { currencies } from './data'

import axios from 'axios';

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

type TCurrency = {
  name: string;
  fullName: string;
  imageUrl: string;
  price: number;
  volume24Hour: number;
}

function App() {
  const classes = useStyles();
  const [data, setData] = useState<TCurrency[]>([]);

  useEffect(() => {
    axios.get('https://min-api.cryptocompare.com/data/top/totalvolfull?limit=10&tsym=USD')
    .then(({ data }) => {
      const dataCurrency: TCurrency[] = data.Data.map((currency: any) => {
        const obj: TCurrency = {
          name: currency.CoinInfo.Name,
          fullName: currency.CoinInfo.FullName,
          imageUrl: `https://www.cryptocompare.com/${currency.CoinInfo.ImageUrl}`,
          price: currency.RAW.USD.PRICE.toLocaleString('USD', { style: 'currency', currency: 'USD' }),
          volume24Hour: currency.RAW.USD.VOLUME24HOUR.toLocaleString('USD', { style: 'currency', currency: 'USD' })
        }
        return obj;
      })

      setData(dataCurrency)
    })
  }, [classes])
  console.log(`data`, data)
  const [currency, setCurrency] = useState('EUR');
  const [currencyAccepted, setCurrencyAccepted] = useState('EUR');

  const handleChangeCurrency = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCurrency(event.target.value);
  };

  const handleChangeAccepted = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCurrencyAccepted(event.target.value);
  };

  return (
    <Container maxWidth="lg">
      <div className={classes.root}>
        <Grid container spacing={3}>
          <Grid item xs={8}>
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell></TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>FullName</TableCell>
                  <TableCell>Price</TableCell>
                  <TableCell>Volume 24 hour</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((item) => (
                  <TableRow key={item.name}>
                    {console.log(`item.imageUrl`, item.imageUrl)}
                    <TableCell component="th" scope="row">
                      <img src={item.imageUrl} alt={item.name} width="50"/>
                    </TableCell>
                    <TableCell>
                      {item.name}
                    </TableCell>
                    <TableCell>{item.fullName}</TableCell>
                    <TableCell>{item.price}</TableCell>
                    <TableCell>{item.volume24Hour}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          </Grid>
          <Grid item xs={4} container>
            <Paper className={classes.paper}>
              <div className={classes.inputsCurrency}>
                <Grid justifyContent="space-between" alignItems="center">
                  <TextField
                    className={classes.inputCurrency}
                    id="outlined-basic" 
                    variant="outlined" 
                  />

                  <TextField
                    id="select-currency"
                    select
                    value={currency}
                    onChange={handleChangeCurrency}
                    variant="outlined"
                  >
                    {currencies.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
              </div>

              <div className={classes.totalCurrency}>
                <Grid container justifyContent="space-between" alignItems="center">
                  <Typography variant="h5" component="h2">
                    h1. Heading
                  </Typography>

                  <TextField
                    id="select-currency-accepted"
                    select
                    value={currencyAccepted}
                    onChange={handleChangeAccepted}
                    variant="outlined"
                  >
                    {currencies.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
              </div>
            </Paper>
          </Grid>
        </Grid>
      </div>
    </Container>
  );
}

export default App;
