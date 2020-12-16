import {Component} from "react";
import CrosswindCalculator from "../components/utilities/CrosswindCalculator";
import {Jumbotron} from "reactstrap";

export class UtilityInfo {
    id: number;
    name: string;
    component: Component;
}

export function getRelativePathFromUtilityInfo(info: UtilityInfo) {
    return info.name.toLowerCase().replaceAll(" ", "_");
}

export function ErrorBanner(props) {
    return (
        <Jumbotron className="jumbotron-error">
            <div className="container">
                <div className="row">
                    <h5>{props.text}</h5>
                </div>
            </div>
        </Jumbotron>
    );
}

export function WeightedTitleBar(props) {
    const textComponent = props.weight == 0 ? (<h1>{props.text}</h1>) : (<h4>{props.text}</h4>);

    return (
        <>
            <Jumbotron className={`jumbotron-weight-${props.weight}`}>
                <div className="container">
                    <div className="row">
                        {textComponent}
                    </div>
                </div>
            </Jumbotron>
            <div className={`mb-${props.marginBottom}`} />
        </>
    );
}

const Utilities: Array<UtilityInfo> =
    [
        {
            "id": 0,
            "name": "Crosswind Calculator",
            "component": CrosswindCalculator
        }
    ];

export default Utilities;
