import React, {Component} from 'react';
import { withStyles, makeStyles, createStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TablePagination from '@material-ui/core/TablePagination';
import TableFooter from '@material-ui/core/TableFooter';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import Nivel from './Icons'
import colors from '../Colors'
import {removeAcentos} from '../../functions'
import { withRouter, useHistory } from "react-router-dom";
import axios from '../../bd/client'
import { getToken } from '../auth';

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: colors.blue,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
      cursor:'pointer',
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
  
}))(TableRow);

function createData(id,nome, assunto, nivel, pontos, feito) {
  return { id,nome, assunto, nivel, pontos, feito };
}

const useStyles = makeStyles((theme) => createStyles({
  table: {
  },
  root:{
    width:'100%',
    display:'flex',
    flexDirection:'column',
    justifyContent:'center',
    alignItems: 'center',
    padding:25
  },
  nivel:{
    color:'white',
    fontWeight:'bold',
  },
  nivelfacil:{
    padding:2,
    backgroundColor:'#4CAF50'
  }, 
  nivelmedio:{
    padding:2,
    backgroundColor:'#ff9800'
  },
  niveldificil:{ 
    padding:2,
    backgroundColor: '#F44335'   
  }
}));

class CustomTable extends Component {
  state = {
    rows:[],
    rowsfilter:[],
    page:0,
    form:[],
    rowsPerPage:10
  }
  handleChangePage = (event, newPage) => {
    this.setState({page:newPage})
  };

  componentDidMount = () =>{
    
    axios.get("/tabelas-verdade/"+getToken()).then(response => {
      console.log('entrou aqui')
      this.setState({form:response.data})
  
    })
  }
  handleChangeRowsPerPage = (event) => {
    this.setState({rowsPerPage:event.target.value})
    this.setState({page:0})
  };

  render(){
      const { classes } = this.props;
      var elementsTable = [];
      const data = new Date()
      var rows = [...this.state.form].filter(element => element.nome.toUpperCase().includes(this.props.search.toUpperCase()))
      const count = rows.length
      if (this.state.rowsPerPage > 0) {
        rows = rows.slice(this.state.page * this.state.rowsPerPage, this.state.page * this.state.rowsPerPage + this.state.rowsPerPage)
      }

  
      elementsTable.push(
        rows.map((row, i) => (
          <StyledTableRow key={i} 
            onClick={(event) => this.props.history.push({
            pathname: '/tabela-verdade',
            state: { id: row.id }})}>
            <StyledTableCell align="left" >{row.nome}</StyledTableCell>
            <StyledTableCell  style={{width:'10%'}} align="center">{<Nivel nivel={row.nivel}/>}</StyledTableCell>
            
            <StyledTableCell style={{width:'20%'}} align="center">
              {row.idUsuario?'OK':false}
              </StyledTableCell>
            <StyledTableCell style={{width:'20%'}} align="center">{
              row.nivel == 'Muito Fácil'?10:
              row.nivel == 'Fácil'?25:
              row.nivel == 'Normal'?50:
              row.nivel == 'Difícil'?75:100
              }</StyledTableCell>
            </StyledTableRow>
  
        ))
      )
  
      return (
        <TableContainer>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                {/*Head da tabela */}
                <StyledTableCell align="left">Nome</StyledTableCell>
                <StyledTableCell  style={{width:'10%'}} align="center">Nível</StyledTableCell>
                <StyledTableCell  style={{width:'20%'}} align="center">Feito</StyledTableCell>
                <StyledTableCell  style={{width:'20%'}} align="center">Pontuação</StyledTableCell>
              </TableRow>
            </TableHead>
  
            <TableBody>
              {/*Percorre o array "rows" e adiciona cada elemento na tabela */}
  
              {elementsTable}
  
            </TableBody>
            <TableFooter>
              <TableRow style={{ width: '100%' }}>
                <TablePagination
                  rowsPerPageOptions={[15, 25, 50, { label: 'Todos', value: count }]}
                  labelRowsPerPage='linhas por página: '
                  labelDisplayedRows={({ from, to, count }) => `${from}-${to} de ${count}`}
                  count={count}
                  rowsPerPage={this.state.rowsPerPage}
                  page={this.state.page}
                  SelectProps={{
                    inputProps: { 'aria-label': 'linhas por página' },
                    native: true,
                  }}
                  onChangePage={this.handleChangePage}
                  onChangeRowsPerPage={this.handleChangeRowsPerPage}
  
                />
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      )
    }
  
}  
export default withRouter((withStyles(useStyles)(CustomTable)))
