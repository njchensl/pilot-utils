import {Component} from "react/cjs/react.production.min";
import {Button, Col, Form, FormGroup, Input, Jumbotron, Label} from "reactstrap";
import {RegistrationFormState} from "../ContactForm";
import {generateInputField, generateInputFieldFull, Vector2} from "../../shared/UtilFunctions";
import {ErrorBanner} from "../../shared/Utilities";

class CrosswindCalculatorState {
    fieldsAreValid: boolean;
    windHeading: number;
    windSpeed: number;
    ias: number;
    targetTrack: number;
    heading: number;
}


export function aviationAngleToMathAngle(theta: number): number {
    return 450 - theta;
}

export function mathAngleToAviationAngle(theta: number): number {
    return 450 - theta;
}

export function degreeToRadian(deg: number): number {
    return Math.PI * deg / 180;
}

export function readianToDegree(rad: number): number {
    return rad / Math.PI * 180;
}

export function headingIsValid(hdg: number): boolean {
    return hdg <= 360 && hdg >= 0;
}

export default class CrosswindCalculator extends Component {
    constructor(props) {
        super(props);

        let state = new CrosswindCalculatorState();
        state.fieldsAreValid = true;
        this.state = state;
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleInputChange(event) {
        const target = event.target;
        let newState: CrosswindCalculatorState = this.state;
        newState[target.name] = target.type === "checkbox" ? target.checked : Number(target.value);
        this.setState(newState);
    }

    fieldsAreValid(): boolean {
        return headingIsValid(this.state.windHeading) && headingIsValid(this.state.targetTrack) && this.state.ias >= 0 && this.state.windSpeed >= 0;
    }

    handleSubmit(event) {
        let state = this.state;
        // alert(JSON.stringify(state));
        state.fieldsAreValid = this.fieldsAreValid();
        state.windHeading += 180;
        if (state.fieldsAreValid) {
            // do calculations
            let windMathAngle = degreeToRadian(aviationAngleToMathAngle(state.windHeading));
            let trackMathAngle = degreeToRadian(aviationAngleToMathAngle(state.targetTrack));
            let windVec = new Vector2(Math.cos(windMathAngle), Math.sin(windMathAngle)).normalized().multiply(state.windSpeed);
            let unitTrackVec = new Vector2(Math.cos(trackMathAngle), Math.sin(trackMathAngle)).normalized();
            let ias = state.ias;
            let angle = trackMathAngle;
            let resultantTrack = unitTrackVec;
            let resultantHeading = null;
            for (let i = 0; i < 500; i++) {
                let heading = new Vector2(Math.cos(angle), Math.sin(angle)).normalized().multiply(state.ias);
                resultantHeading = heading;
                let trackVec = heading.add(windVec);
                resultantTrack = trackVec
                // console.log(JSON.stringify(trackVec.normalized()));
                let angleDiff = trackVec.normalized().magnitudeCross(unitTrackVec);
                //console.log(JSON.stringify(angleDiff));
                if (angleDiff > 0) {
                    // need to rotate counterclockwise
                    angle += Math.abs(angleDiff) * 0.1;
                } else {
                    angle -= Math.abs(angleDiff) * 0.1;
                }

            }
            // console.log("Target track" + JSON.stringify(unitTrackVec));
            // console.log("Resultant track" + JSON.stringify(resultantTrack));
            // console.log("Resultant heading" + JSON.stringify(resultantHeading));
            // console.log("Wind vector" + JSON.stringify(windVec));
            let angleDeg = mathAngleToAviationAngle(readianToDegree(angle));
            // normalize
            while (angleDeg > 360) {
                angleDeg -= 360;
            }
            while (angleDeg < 0) {
                angleDeg += 360;
            }
            state.heading = angleDeg;
        }
        state.windHeading -= 180;
        this.setState(state);
        event.preventDefault();
    }

    render() {
        return (
            <>
                <div className="container">
                    <div className="row row-content">
                        <div className="col-12 mt-md-5 mb-md-3">
                            <h3>Crosswind Heading Calculator</h3>
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
                                {/*    <Label htmlFor="ias" md={2}>TAS</Label>*/}
                                {/*    <Col md={10}>*/}
                                {/*        <Input type="ias" id="ias" name="ias" placeholder="TAS" value={this.state.ias}/>*/}
                                {/*    </Col>*/}
                                {/*</FormGroup>*/}
                                {/*<FormGroup row>*/}
                                {/*    <Label htmlFor="targetTrack" md={2}>Course</Label>*/}
                                {/*    <Col md={10}>*/}
                                {/*        <Input type="targetTrack" id="targetTrack" name="targetTrack"*/}
                                {/*               placeholder="Course" value={this.state.targetTrack}/>*/}
                                {/*    </Col>*/}
                                {/*</FormGroup>*/}
                                {generateInputFieldFull("number", "Course", "Course", "targetTrack", this.state)}
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
                                    <Label htmlFor="heading" md={2}>Target Heading</Label>
                                    <Col md={10}>
                                        <Input type="heading" id="heading" name="heading"
                                               placeholder="DO NOT TYPE INTO THIS FIELD" value={this.state.heading}/>
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
