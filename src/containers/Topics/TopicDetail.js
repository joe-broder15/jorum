import React, { useState, useEffect } from "react";
import GetApiRequest from "../../hooks/GetApiRequest";
import Topic from "../../components/Topics/Topic";
import ThreadList from "../Threads/ThreadList";
import { Container, Row, Col, Spinner, Button, Card } from "react-bootstrap";
import { useParams, Link } from "react-router-dom";
import AuthContext from "../../contexts/AuthContext";

export default function TopicDetail(props) {
  let { topicId } = useParams();
  // get posts using our GET api hook
  const { data, error, isLoaded } = GetApiRequest("/topic/" + topicId);
  const { authState, setAuthState, userState, setUserState } =
    React.useContext(AuthContext);

  // check errors
  if (error !== null) {
    return <div>Error: {error.message}</div>;
  }
  // wait for load
  if (!isLoaded) {
    return (
      <Spinner animation="border" role="status">
        <span className="sr-only"></span>
      </Spinner>
    );
  }
  // render a Post for each item
  return (
    <Container>
      <Row>
        <Col>
          <Row className="justify-content-md-center">
            <Col md="10">
              <Card>
                <Card.Header>
                  <Row>
                    <Col className="mr-auto">
                      <Card.Title>{data.name}</Card.Title>
                    </Col>
                    <Col sm="auto">
                      {authState && userState != null ? (
                        <Link to={"/topic/" + topicId + "/thread/create"}>
                          <Button>Create a Thread</Button>
                        </Link>
                      ) : (
                        ""
                      )}
                    </Col>
                  </Row>
                </Card.Header>
                <Card.Body>
                  <ThreadList topicId={topicId} />
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}
