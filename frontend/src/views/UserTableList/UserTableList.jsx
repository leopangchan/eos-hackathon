import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Table from "components/Table/Table.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import * as DataService from "service/dataService.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import Button from "components/CustomButtons/Button.jsx";

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

function loadTableData() {
  let formatted = []
  return new Promise((resolve, reject) => {
    DataService.getTable((data) => {
      data.map((row, index) => {
        formatted.push([]);
        row.forEach((value) => {
          formatted[index].push(value);
        });
      });
      resolve(formatted);
    });
  });

  /*
  return new Promise((resolve, reject)=>{
    setTimeout(() => {
      console.log("wait!");
      resolve([
       [" Rice", "Niger", "Oud-Turnhout", "$36,738"],
       ["Minerva Hooper", "Curaçao", "Sinaai-Waas", "$23,789"],
       ["Sage Rodriguez", "Netherlands", "Baileux", "$56,142"],
       ["Philip Chaney", "Korea, South", "Overland Park", "$38,735"],
       ["Doris Greene", "Malawi", "Feldkirchen in Kärnten", "$63,542"],
       ["Mason Porter", "Chile", "Gloucester", "$78,615"]
     ])
   }, 500);
  });
  */
}

class TableList extends React.Component {
  state = { tableData: [] };

  async componentDidMount() {
    const tableData = await loadTableData();
    this.setState({ tableData });
  }

  render() {
    //console.log(this.props); 
    const { classes } = this.props;
    return (
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>User Activities</h4>
              <p className={classes.cardCategoryWhite}>
                Activities
              </p>
            </CardHeader>
            <CardBody>
              <Table
                tableHeaderColor="primary"
                tableHead={["Date", "Category", "Model", "Detail", "Delete"]}
                tableData={this.state.tableData}
              />
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    );
  }
}

export default withStyles(styles)(TableList);
