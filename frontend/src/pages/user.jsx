import React, { Component } from 'react';
import ReactTable from "react-table";
import 'react-table/react-table.css'

// material-ui dependencies
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

// set up styling classes using material-ui "withStyles"
const styles = theme => ({
  card: {
    margin: 40,
  },
  paper: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 4,
    paddingBottom: theme.spacing.unit * 2,
  },
  formButton: {
    marginTop: theme.spacing.unit,
    width: "100%",
  },
  pre: {
    background: "#ccc",
    padding: 10,
    marginBottom: 0,
  },
});

// User component
export class User extends Component {
  render() {
    //const { noteTable } = this.state;
    const { classes } = this.props;
    const data = [{
      name: 'Tanner Linsley',
      age: 26,
      friend: {
        name: 'Jason Maurer',
        age: 23,
      }
    }]

    const columns = [{
      Header: 'Date',
      accessor: 'date' // String-based value accessors!
    }, {
      Header: 'Category',
      accessor: 'cate',
      Cell: props => <span className='number'>{props.value}</span> // Custom cell components!
    }, {
      Header: 'Model',
      accessor: "model"
    }, {
      Header: 'Detail',
      accessor: "detail"
    }]

    return (
      <div>
        <Paper className={classes.paper}>
          <ReactTable
            data={data}
            columns={columns}
          />
          <label htmlFor="contained-button-file">
            <Button variant="contained" color="primary" className={classes.button}>
              Update
            </Button>
            <Button variant="contained" color="primary" className={classes.button}>
              Delete
            </Button>
          </label>
        </Paper>
      </div>
    );
  }
}

export default withStyles(styles)(User);
