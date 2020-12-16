import {Jumbotron} from "reactstrap";
import {WeightedTitleBar} from "../shared/Utilities";

export default function Home() {
    return (
        <div>
            <WeightedTitleBar text="Home" weight={0} marginBottom={0}/>
            <WeightedTitleBar text="Welcome to Private Pilot Utilities" weight={1} marginBottom={3}/>
            <div className="container">
                <Jumbotron>
                    <div className="row">
                        <h5>Support me</h5>
                    </div>
                    <div className="row">
                        <div className="container">
                            <div className="text-center">
                                <form action="https://www.paypal.com/donate" method="post" target="_top">
                                    <input type="hidden" name="cmd" value="_donations" />
                                    <input type="hidden" name="business" value="NVF72B88WM8GL" />
                                    <input type="hidden" name="currency_code" value="USD" />
                                    <input type="image" src="https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif" border="0" name="submit" title="PayPal - The safer, easier way to pay online!" alt="Donate with PayPal button" />
                                    <img alt="" border="0" src="https://www.paypal.com/en_CA/i/scr/pixel.gif" width="1" height="1" />
                                </form>
                            </div>
                        </div>
                    </div>
                </Jumbotron>
            </div>
        </div>
    );
}
