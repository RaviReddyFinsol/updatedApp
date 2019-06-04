import React,{Component} from "react";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import Typography from '@material-ui/core/Typography';
import { Link } from "react-router-dom";

class ViewProduct extends Component {
    render(){
        const primaryProduct = (this.props.quantityDetails[0]);
        return(
            <Card>
        <h5>
             {`offer ${primaryProduct.offer}`}
            </h5> 
           <img src={this.props.imagePath} alt={""} /> 
          <CardContent>
          <Typography variant="h6" color="textPrimary" component="p" noWrap={true} align="left">
          {this.props.productName}
          </Typography>
            <Typography variant="body2" color="textPrimary" component="p" align="left">
            {primaryProduct.quantity}
            </Typography>
            <Typography variant="body2" color="textPrimary" component="p" align="left">
            {primaryProduct.sellingPrice}
            </Typography>
            <Typography variant="overline" color="textSecondary" component="p" align="left">
                <strike>

            {primaryProduct.mrp}
                </strike>
            </Typography>
          </CardContent>
        {this.props.isEditable === true ? (
          <CardActions>
            <Button size="small" color="primary">
              <Link
                to={{
                  pathname: `/catogery/${this.props.token}/ViewProduct/edit/${
                    this.props.id
                  }`
                }}
              >
                <EditIcon />
              </Link>
            </Button>
            <Button size="small" color="primary">
              <DeleteIcon />
            </Button>
          </CardActions>
        ) : (
          <p>{" "}</p>
        )}
      </Card>
        );
    }
}

export default ViewProduct;