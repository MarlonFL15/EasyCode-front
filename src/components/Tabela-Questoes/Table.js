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

const useStyles = makeStyles((theme: Theme) => createStyles({
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
    rowsPerPage:10
  }
  handleChangePage = (event, newPage) => {
    this.setState({page:newPage})
  };

  componentDidMount = () =>{
    axios.get("/perguntas").then(response => {
      console.log('entrou aqui')
      this.setState({rows:response.data})
  
    })
  }
  handleChangeRowsPerPage = (event) => {
    this.setState({rowsPerPage:event.target.value})
    this.setState({page:0})
  };

  render(){
    const {classes} = this.props;
    const rowsfilter = this.state.rows.filter(element => removeAcentos(element.titulo).toUpperCase().includes(removeAcentos(this.props.search).toUpperCase()))
    return (
        <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="customized table">
            <TableHead>
            <TableRow>
                <StyledTableCell>Nome</StyledTableCell>
                <StyledTableCell align="center">Assunto</StyledTableCell>
                <StyledTableCell style={{width:'5%'}} align="center">Nível</StyledTableCell>
                <StyledTableCell align="center">Pontuação</StyledTableCell>
                <StyledTableCell style={{width:'5%'}} align="center">Feito</StyledTableCell>
            </TableRow>
            </TableHead>
            <TableBody>
            {rowsfilter.slice(this.state.page * this.state.rowsPerPage, this.state.page * this.state.rowsPerPage + this.state.rowsPerPage).map((row) => (
                <StyledTableRow key={row.name} onClick={(event) => this.props.history.push({
                  pathname: '/questao',
                  state: { id: row.id }})}>
                <StyledTableCell component="th" scope="row">
                    {row.titulo}
                </StyledTableCell>
                <StyledTableCell align="center">{row.assunto}</StyledTableCell>
                <StyledTableCell  style={{width:'5%'}} align="center">{<Nivel nivel={row.nivel}/>}</StyledTableCell>
                <StyledTableCell align="center">{row.pontos}</StyledTableCell>
            <StyledTableCell style={{width:'5%'}} align="center">{}</StyledTableCell>
                </StyledTableRow>
            ))}
            </TableBody>
            <TableFooter>

            
            </TableFooter>
        </Table>
        <TablePagination
              rowsPerPageOptions={[10, 25, 100]}
              component="div"
              labelRowsPerPage = 'linhas por página: '
              labelDisplayedRows={({ from, to, count }) => `${from}-${to} de ${count}`}
              count={this.state.rowsfilter.length}
              rowsPerPage={this.state.rowsPerPage}
              page={this.state.page}
              onChangePage={this.state.handleChangePage}
              onChangeRowsPerPage={this.state.handleChangeRowsPerPage}
            />
        </TableContainer>
       
    )
  }
}
export default withRouter((withStyles(useStyles)(CustomTable)))
