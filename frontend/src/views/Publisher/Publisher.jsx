import React, { Component } from 'react';
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Table from "components/Table/Table.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import  * as DataService from "service/dataService.jsx";

const styles = {
  cardCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
      color: "rgba(255,255,255,.62)",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0"
    },
    "& a,& a:hover,& a:focus": {
      color: "#FFFFFF"
    }
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: "#777",
      fontSize: "65%",
      fontWeight: "400",
      lineHeight: "1"
    }
  }
};


const accounts = [
  {"name":"Kelly Blue Book", "privateKey":"5K7mtrinTFrVTduSxizUc5hjXJEtTjVTsqSHeBHes1Viep86FP5", "publicKey":"EOS6kYgMTCh1iqpq9XGNQbEi8Q6k5GujefN9DSs55dcjVyFAq7B6b"},
  {"name":"Jessica Jones", "privateKey":"5KLqT1UFxVnKRWkjvhFur4sECrPhciuUqsYRihc1p9rxhXQMZBg", "publicKey":"EOS78RuuHNgtmDv9jwAzhxZ9LmC6F295snyQ9eUDQ5YtVHJ1udE6p"},
];
// Index component
class Index extends Component {

  constructor(props) {
    super(props)
    this.state = {
      noteTable: [] // to store the table rows from smart contract
    };
    // this.handleFormEvent = this.handleFormEvent.bind(this);
  }
  componentDidMount() {
    DataService.getTable((result) => {
      console.log("result",result.rows)
      this.setState({ noteTable: result.rows })
    }, (err) => {
      console.log(err)
    });
  }

  render() { 
    const { classes } = this.props;
    function getDataTable() {
      if(dataTable)
      var data = this.state.noteTable;
      console.log(data);
      
      for(let i = 0; i < data.length; i++) {
        dataTable.push([])
        Object.keys(data[i]).forEach(function(key) {
          console.log('Key : ' + key + ', Value : ' + data[key])
          dataTable[i].push( data[key]) 
        })
        console.log("dataTable[i]",dataTable[i])
      }
      return dataTable;
    //var dataTable: [] 
    }
    

    console.log("table_",dataTable)
    // const columns = [{
    //   Header: 'User Identity',
    //   accessor: 'fingerprint' // String-based value accessors!
    // }, {
    //   Header: 'Category',
    //   accessor: 'intentCategory',
    //   Cell: props => <span className='number'>{props.value}</span> // Custom cell components!
    // }, {
    //   Header: 'Type of Vehicle',
    //   accessor: "intentSubCategory"
    // }, {
    //   Header: 'Detail',
    //   accessor: "intentDetail"
    // }]
    return (
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Simple Table</h4>
              <p className={classes.cardCategoryWhite}>
                Here is a subtitle for this table
              </p>
            </CardHeader>
            <CardBody>
              <Table
                tableHeaderColor="primary"
                tableHead={["No.", "User Identity", "Category", "Type of Vehicle","dfdsfd","fdsgfdhgf","safdgg"]}
                tableData={getDataTable()}
              />
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    );
  }
}
function Publisher(props) {
  // const { classes } = props;
  // //var dataTable: [] 

  // var table_ = []
  // var dataTable = []
  // DataService.getTable((result) => {
  //   dataTable = result.rows
  //   console.log("result",dataTable)
  //   var title = ""
  //   dataTable.map((row, i) =>{
  //     console.log("ropw",row);
  //     // table_[i]=
  //     table_.push([]);
  //     Object.keys(row).forEach((key) => {
  //       table_[i].push(row[key]);
  //     });
  //     console.log(table_[i])
  //     title= row.publisher
  //   });
  //   // this.setState({ noteTable: result.rows })
  // }, (err) => {
  //   console.log(err)
  // });


  // console.log("table_",table_)
  // // const columns = [{
  // //   Header: 'User Identity',
  // //   accessor: 'fingerprint' // String-based value accessors!
  // // }, {
  // //   Header: 'Category',
  // //   accessor: 'intentCategory',
  // //   Cell: props => <span className='number'>{props.value}</span> // Custom cell components!
  // // }, {
  // //   Header: 'Type of Vehicle',
  // //   accessor: "intentSubCategory"
  // // }, {
  // //   Header: 'Detail',
  // //   accessor: "intentDetail"
  // // }]
  // return (
  //   <GridContainer>
  //     <GridItem xs={12} sm={12} md={12}>
  //       <Card>
  //         <CardHeader color="primary">
  //           <h4 className={classes.cardTitleWhite}>Simple Table</h4>
  //           <p className={classes.cardCategoryWhite}>
  //             Here is a subtitle for this table
  //           </p>
  //         </CardHeader>
  //         <CardBody>
  //           <Table
  //             tableHeaderColor="primary"
  //             tableHead={["No.", "User Identity", "Category", "Type of Vehicle","dfdsfd","fdsgfdhgf","safdgg"]}
  //             tableData={table_}
  //           />
  //         </CardBody>
  //       </Card>
  //     </GridItem>
  //   </GridContainer>
  // );
}

export default withStyles(styles)(Index);
