import {Component} from "react";
import {Button, Col, Form, FormGroup, Input, Label} from "reactstrap";
import {ErrorBanner, WeightedTitleBar} from "../shared/Utilities";

const ContactType = {
    Tel: "Tel",
    Email: "Email"
}

export class RegistrationFormState {
    firstName: string = "";
    lastName: string = "";
    phone: string = "";
    email: string = "";
    agree: boolean = false;
    showAgreeBanner = false;
}

export default class ContactForm extends Component {
    constructor(props) {
        super(props);

        const state = new RegistrationFormState();
        state.showAgreeBanner = false;
        this.state = state;
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleInputChange(event) {
        const target = event.target;
        let newState: RegistrationFormState = this.state;
        newState[target.name] = target.type === "checkbox" ? target.checked : target.value;
        this.setState(newState);
    }

    handleSubmit(event) {
        if (this.state.agree === true) {
            alert(JSON.stringify(this.state));
            this.setState(new RegistrationFormState());
        } else {
            let state = this.state;
            state.showAgreeBanner = true;
            this.setState(state);
        }
        event.preventDefault();
    }

    render() {
        return (
            <>
                <WeightedTitleBar text="Contact" weight={0} marginBottom={5}/>
                <div className="container">
                    <div className="row row-content">
                        <div className="col-12 col-md-9">
                            {this.state.showAgreeBanner ? (<ErrorBanner text="You must agree to the terms and conditions" />) : (<></>)}
                            <Form onSubmit={this.handleSubmit} onChange={this.handleInputChange}>
                                <FormGroup row>
                                    <Label htmlFor="firstName" md={2}>First Name</Label>
                                    <Col md={10}>
                                        <Input type="text" id="firstName" name="firstName" placeholder="First Name" value={this.state.firstName} />
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Label htmlFor="lastName" md={2}>Last Name</Label>
                                    <Col md={10}>
                                        <Input type="text" id="lastName" name="lastName" placeholder="Last Name" value={this.state.lastName} />
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Label htmlFor="phone" md={2}>Phone Number</Label>
                                    <Col md={10}>
                                        <Input type="tel" id="phone" name="phone" placeholder="Phone Number" value={this.state.phone} />
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Label htmlFor="email" md={2}>Email</Label>
                                    <Col md={10}>
                                        <Input type="email" id="email" name="email" placeholder="Email" value={this.state.email} />
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Col md={{size: 8, offset: 2}}>
                                        <FormGroup check>
                                            <Label check>
                                                <Input type="checkbox" name="agree" checke={this.state.agree} /> {" "}
                                                <strong>I have read and agree to the terms and conditions.</strong>
                                            </Label>
                                        </FormGroup>
                                    </Col>
                                    {/*<Col md={{size: 3, offset: 1}}>*/}
                                    {/*    <Input type="select" name="contactType" value={this.state.contactType}>*/}
                                    {/*        <option>{ContactType.Tel}</option>*/}
                                    {/*        <option>{ContactType.Email}</option>*/}
                                    {/*    </Input>*/}

                                    {/*</Col>*/}
                                </FormGroup>
                                <FormGroup row>
                                    <Col md={{size: 10, offset: 2}}>
                                        <Button type="submit" color="primary">
                                            Submit
                                        </Button>
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
