import {aviationAngleToMathAngle, degreeToRadian, headingIsValid} from "./CrosswindCalculator";
import {generateInputField, generateInputFieldFull, Vector2} from "../../shared/UtilFunctions";
import {ErrorBanner} from "../../shared/Utilities";
import {Component} from "react";
import {Button, Col, Form, FormGroup, Input, Label} from "reactstrap";

class GroundSpeedCalculatorState {
    fieldsAreValid: boolean;
    heading: number;
    ias: number;
    windHeading: number;
    windSpeed: number;
    groundSpeed: number;
}

export default class GroundSpeedCalculator extends Component {
    constructor(props) {
        super(props);

        let state = new GroundSpeedCalculatorState();
        state.fieldsAreValid = true;
        this.state = state;
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleInputChange(event) {
        const target = event.target;
        let newState: GroundSpeedCalculatorState = this.state;
        newState[target.name] = target.type === "checkbox" ? target.checked : Number(target.value);
        this.setState(newState);
    }

    handleSubmit(event) {
        let state: GroundSpeedCalculatorState = this.state;
        state.fieldsAreValid = this.fieldsAreValid();
        state.windHeading += 180;
        if (state.fieldsAreValid) {
            let windMathAngle = degreeToRadian(aviationAngleToMathAngle(state.windHeading));
            let headingMathAngle = degreeToRadian(aviationAngleToMathAngle(state.heading));
            let windVec = new Vector2(Math.cos(windMathAngle), Math.sin(windMathAngle)).normalized().multiply(state.windSpeed);
            let planeVec = new Vector2(Math.cos(headingMathAngle), Math.sin(headingMathAngle)).normalized().multiply(state.ias);
            let groundSpeedVec = planeVec.add(windVec);
            state.groundSpeed = groundSpeedVec.magnitude();
        }
        state.windHeading -= 180;
        this.setState(state);
        event.preventDefault();
    }

    fieldsAreValid(): boolean {
        return headingIsValid(this.state.windHeading) && headingIsValid(this.state.heading) && this.state.ias >= 0 && this.state.windSpeed >= 0;
    }

    render() {
        return (
            <>
                <div className="container">
                    <div className="row row-content">
                        <div className="col-12 mt-md-5 mb-md-3">
                            <h3>Ground Seed Calculator</h3>
                        </div>
                        <div className="col-12">
                            {
                                this.state.fieldsAreValid ? (<></>) : (
                                    <ErrorBanner text="Please ensure that your inputs are valid" />
                                )
                            }
                        </div>
                        <div className="col-12 col-md-9">
                            <Form onSubmit={this.handleSubmit} onChange={this.handleInputChange}>
                                {/*<FormGroup row>*/}
                                {/*    <Label htmlFor="windHeading" md={2}>Wind Heading</Label>*/}
                                {/*    <Col md={10}>*/}
                                {/*        <Input type="number" id="windHeading" name="windHeading"*/}
                                {/*               placeholder="Wind Heading" value={this.state.windHeading}/>*/}
                                {/*    </Col>*/}
                                {/*</FormGroup>*/}
                                {/*<FormGroup row>*/}
                                {/*    <Label htmlFor="windSpeed" md={2}>Wind Speed</Label>*/}
                                {/*    <Col md={10}>*/}
                                {/*        <Input type="windSpeed" id="windSpeed" name="windSpeed" placeholder="Wind Speed"*/}
                                {/*               value={this.state.windSpeed}/>*/}
                                {/*    </Col>*/}
                                {/*</FormGroup>*/}
                                {/*<FormGroup row>*/}
                                {/*    <Label htmlFor="heading" md={2}>Heading</Label>*/}
                                {/*    <Col md={10}>*/}
                                {/*        <Input type="heading" id="heading" name="heading"*/}
                                {/*               placeholder="Heading" value={this.state.heading}/>*/}
                                {/*    </Col>*/}
                                {/*</FormGroup>*/}
                                {/*<FormGroup row>*/}
                                {/*    <Label htmlFor="ias" md={2}>IAS</Label>*/}
                                {/*    <Col md={10}>*/}
                                {/*        <Input type="ias" id="ias" name="ias" placeholder="IAS" value={this.state.ias}/>*/}
                                {/*    </Col>*/}
                                {/*</FormGroup>*/}
                                {generateInputField("number", "Heading", this.state)}
                                {generateInputFieldFull("number", "TAS", "TAS", "ias", this.state)}
                                {generateInputFieldFull("number", "Wind Direction", "Wind Direction", "windHeading", this.state)}
                                {generateInputField("number", "Wind Speed", this.state)}
                                <FormGroup row>
                                    <Col md={{size: 10, offset: 2}}>
                                        <Button type="submit" color="primary">
                                            Submit
                                        </Button>
                                    </Col>
                                </FormGroup>
                                <FormGroup row className="mt-5">
                                    <Label htmlFor="groundSpeed" md={2}>Ground Speed</Label>
                                    <Col md={10}>
                                        <Input type="groundSpeed" id="groundSpeed" name="groundSpeed"
                                               placeholder="DO NOT TYPE INTO THIS FIELD" value={this.state.groundSpeed}/>
                                    </Col>
                                </FormGroup>
                            </Form>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}