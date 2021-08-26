import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';

import { TCurrency } from './types'
import useStyles from './styles'

import { CryptoTable, Converter } from './components/'



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

  return (
    <Container maxWidth="lg">
      <div className={classes.root}>
        <Grid container spacing={3}>
          <Grid item xs={8}>
            <CryptoTable items={data} classes={classes} />
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
