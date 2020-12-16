import {Card, CardImg, CardTitle} from "reactstrap";


export default function DishDetail(props) {
    let selectedDish = props.dish;
    if (selectedDish != null) {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-12 col-md-5 mt-1">
                        <Card>
                            <CardImg width="10%" height="10%" src={selectedDish.image}/>
                            <CardTitle>
                                {selectedDish.name}
                            </CardTitle>
                        </Card>
                    </div>
                </div>
            </div>
        )
    }
    return (<div/>);
}
