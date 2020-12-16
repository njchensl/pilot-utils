import React from 'react';
import UtilityMenu from "./UtilityMenu";
import Utilities, {getRelativePathFromUtilityInfo} from "../shared/Utilities";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Component} from "react/cjs/react.production.min";
import DishDetail from "./DishDetail";
import Header from "./Header";
import Footer from "./Footer";
import {Switch, Route, Redirect} from "react-router-dom";
import Home from "./Home";
import {Jumbotron} from "reactstrap";
import ContactForm from "./ContactForm";

function NotFound() {
    return (<div>
        <Jumbotron>
            <div className="container">
                <div className="row row-header">
                    <div className="col-12 col-sm-6">
                        <h1>Not Found</h1>
                    </div>
                </div>
            </div>
        </Jumbotron>
    </div>);
}


export default class Main extends Component {
    constructor(props) {
        super(props);

        this.state = {
            dishes: Utilities,
            // selectedDish: null
        };
    }
    //
    // onDishSelect(dishId) {
    //     this.setState({
    //         selectedDish: dishId
    //     });
    // }

    render() {
        const HomePage = () => {
            return (
                <Home />
            )
        };
        //
        // const DishWithId = ({match}) => {
        //     return (
        //         <DishDetail dish={this.state.dishes.filter((dish) => {return dish.id === parseInt(match.params.dishId, 10)})[0]} />
        //     );
        // };

        const utilPaths = Utilities.map((item) => {
            return (
                <Route path={`/utilities/${getRelativePathFromUtilityInfo(item)}`} component={item.component} />
            );
        });

        return (
            <div>
                <Header/>
                <Switch>
                    <Redirect exact from="/" to="/home" />
                    <Route exact path="/home" component={HomePage} />
                    <Route exact path="/utilities" component={UtilityMenu} />
                    {/*<Route path="/menu/:dishId" component={DishWithId} />*/}
                    <Route path="/contact" component={ContactForm} />
                    {utilPaths}
                    <Route exact path="/notfound" component={NotFound} />
                    <Redirect to="/notfound" />
                </Switch>
                {/*<Menu dishes={this.state.dishes} onClick={(dishId) => this.onDishSelect(dishId)}/>*/}
                {/*<div className="container" >*/}
                {/*    <DishDetail dish={this.state.dishes.filter((dish) => dish.id === this.state.selectedDish)}/>*/}
                {/*</div>*/}
                <Footer/>
            </div>
        );
    }
}
