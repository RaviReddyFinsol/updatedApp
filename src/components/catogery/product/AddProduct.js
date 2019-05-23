import React,{Component} from "react";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import axios from 'axios';
import ProductOptions from './ProductOptions';
import ProductImage from './ProductImage';

class AddProduct extends Component
{
    constructor(props) {
        super(props);
        this.state = {
            productName: "",
            subGroup:"",
            childGroup: "",
            dietType: "",
            details: "",
            ingridients: "",
            healthBenifits: "",
            validity: "",
            offerName: "",
            manufactureDetails:"",
            sellerDetails : "",
            brand : "",
        }
    }

    componentDidMount() {
        console.log("add rem : ");
    }

    addRemedyStep = () => {
        if (this.props.stepCounter <= 10)
            this.props.addStep(this.props.stepCounter);
    }

    inputChanged = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    }

    saveRemedy = (event) => {
        event.preventDefault();
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        };
        let formData = new FormData();
        // formData.append("remedyName", this.state.remedyName);
        // formData.append("remedyType", this.state.remedyType);
        // formData.append("remedyForGender", this.state.remedyForGender);
        // formData.append("age", this.state.age);
        // formData.append("bodyPart", this.state.bodyPart);
        // formData.append("timeToUse", this.state.timeToUse);
        // formData.append("videoLink", this.state.videoLink);
        // formData.append("ingridients", this.state.remedyType);
        for (let step of this.props.steps) {
            //formData.append(`${step.stepName}_desc`, step.description);
            formData.append(`image`, step.filePath);
        }
        for (let ff of formData.entries()) {
            console.log(ff[0], ff[1]);
        }

        axios.post("http://localhost:9003/upload",formData,config)
        .then((response) => {
            alert("The file is successfully uploaded");
        }).catch((error) => {
    });

    }
    render(){
        return(
            <form onSubmit={this.saveRemedy}>
                <TextField label="productName" />
                <Select value={this.state.subGroup} onChange={this.inputChanged} name="subGroup">
                    <MenuItem value={""}></MenuItem>
                </Select> 
                <Select value={this.state.childGroup} onChange={this.inputChanged} name="childGroup">
                    <MenuItem value={""}></MenuItem>
                </Select> 
                <Select value={this.state.dietType} onChange={this.inputChanged} name="dietType">
                    <MenuItem value={""}></MenuItem>
                    <MenuItem value={"veg"}>V</MenuItem>
                    <MenuItem value={"non-veg"}>NV</MenuItem>
                </Select> 
                <br/><Button>Add</Button> {"prices"}<br/>
                <TextField label="Details" name="details" onChange={this.inputChanged} value={this.state.details} />
                <TextField label="Ingredients" name="ingridients" onChange={this.inputChanged} value={this.state.ingridients} />
                <TextField label="Validity" name="validity" onChange={this.inputChanged} value={this.state.validity} />                
                <TextField label="Offer" name="offerName" onChange={this.inputChanged} value={this.state.offerName} />
                <TextField label="Manufacture Details" name="manufactureDetails" onChange={this.inputChanged} value={this.state.manufactureDetails} />
                <TextField label="Brand" name="brand" onChange={this.inputChanged} value={this.state.brand} />
                <TextField label="Seller Details" name="sellerDetails" onChange={this.inputChanged} value={this.state.sellerDetails} />
                <br/><Button>Add</Button> {" Image"}
                <br />
                <Button type="submit" >Save</Button>
            </form>
        )
    }
}

export default AddProduct;