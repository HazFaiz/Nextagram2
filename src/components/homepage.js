import React from 'react';
import { Container, Col, Row, Card, CardImg, CardBody, CardTitle } from 'reactstrap';
import UserImages from "./UserImages"

const Homepage = ({ users }) => {
    return (users.map(user => {
        return (
            <Row key={user.id} className="justify-content-center">

                <Card className="w-75">
                    <CardBody>
                        <Row>
                            <Col xs="4">
                                <CardTitle> {user.username}</CardTitle>
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