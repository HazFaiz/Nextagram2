import React from 'react';
import { Col, Row, Card, CardImg, CardBody } from 'reactstrap';
import UserImages from "../containers/UserImages"
import { Link } from "react-router-dom";

const Homepage = ({ users }) => {
    return (users.map(user => {
        return (
            <Row key={user.id} style={{ margin: "10px" }} className="justify-content-center">

                <Card className="w-75">
                    <CardBody>
                        <Row>
                            <Col xs="4">
                                <Link to={`/user/${user.id}`}> {user.username}</Link>
                                <CardImg src={user.profileImage} />
                            </Col>
                            <Col xs="8" style={{ border: '1px dashed black', }}>
                                <UserImages userId={user.id} />
                            </Col>
                        </Row>
                    </CardBody>

                </Card>
            </Row>
        )
    }))
}



export default Homepage;


/* <Row key={user.id} className="justify-content-center">
    <Card className="w-75">
        <CardBody >
            <CardTitle > {user.username}</CardTitle>
            <CardImg className="w-50" src={user.profileImage} />
        </CardBody>
    </Card>
</Row> */