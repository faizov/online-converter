import React, { useState } from 'react'
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';

import { currencies } from '../../data'

type IConverter = {
    classes: any;
  }

export const Converter: React.FC<IConverter> = ({ classes }) => {
    const [currency, setCurrency] = useState('EUR');
    const [currencyAccepted, setCurrencyAccepted] = useState('EUR');
  
    const handleChangeCurrency = (event: React.ChangeEvent<HTMLInputElement>) => {
      setCurrency(event.target.value);
    };
  
    const handleChangeAccepted = (event: React.ChangeEvent<HTMLInputElement>) => {
      setCurrencyAccepted(event.target.value);
    };

    return (
        <Paper className={classes.paper}>
            <div className={classes.inputsCurrency}>
                <Grid justifyContent="space-between" alignItems="center">
                    <TextField
                        className={classes.inputCurrency}
                        id="outlined-basic" 
                        variant="outlined"
                        placeholder="Скока денек"
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
                    <Typography variant="h4" component="h2">
                        34,3
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
    )
}

export default Converter;