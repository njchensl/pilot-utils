import React, {Component} from "react";
import {
    Card,
    CardImg,
    CardBody,
    CardImgOverlay,
    CardText,
    CardTitle,
    Breadcrumb,
    BreadcrumbItem,
    Jumbotron
} from 'reactstrap';
import {Link} from "react-router-dom";
import Utilities, {getRelativePathFromUtilityInfo, WeightedTitleBar} from "../shared/Utilities";

export default function UtilityMenu(props) {
    // const menu = props.dishes.map((dish) => {
    //     return (
    //         <div key={dish.id} className="col-12 col-md-5 mt-1">
    //             <Card>
    //                 <Link to={`/menu/${dish.id}`}>
    //                     <CardImg width="100%" src={dish.image} alt={dish.name}/>
    //                     <CardImgOverlay>
    //                         <CardTitle>
    //                             {dish.name}
    //                         </CardTitle>
    //                     </CardImgOverlay>
    //                 </Link>
    //             </Card>
    //         </div>
    //     );
    // });
    //
    // return (
    //     <div className="container">
    //         <div className="row">
    //             <Breadcrumb>
    //                 <BreadcrumbItem>
    //                     <Link to="/home">Home</Link>
    //                 </BreadcrumbItem>
    //                 <BreadcrumbItem active>
    //                     Menu
    //                 </BreadcrumbItem>
    //             </Breadcrumb>
    //             <div className="col-12">
    //                 <h3>Menu</h3>
    //             </div>
    //         </div>
    //         <div className="row">
    //             {menu}
    //         </div>
    //     </div>
    // );

    const utilMenu: Array<React.Component> = Utilities.map((item) => (
        <div key={item.id}>
            <Card>
                <Link to={`/utilities/${getRelativePathFromUtilityInfo(item)}`}>
                    <CardTitle>
                        {item.name}
                    </CardTitle>
                </Link>
            </Card>
        </div>
    ));


    return (
        <>
            <WeightedTitleBar text="Utility Menu" weight={0} marginBottom={5}/>
            <div className="container">
                <div className="row">
                    {utilMenu}
                </div>
            </div>
        </>
    );
}

