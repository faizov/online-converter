import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import { TCurrency } from '../../types'

interface ICryptoTable {
  items: TCurrency[];
  classes: any;
}

const CryptoTable: React.FC<ICryptoTable> = ({items, classes}) => {
  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            <TableCell>Название</TableCell>
            <TableCell>Полное название</TableCell>
            <TableCell>Цена</TableCell>
            <TableCell>Оборот за 24 часа</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {items.map((item) => (
            <TableRow key={item.name}>
              {console.log(`item.imageUrl`, item.imageUrl)}
              <TableCell component="th" scope="row">
                <img src={item.imageUrl} alt={item.name} width="30"/>
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
  );
};

export default CryptoTable;