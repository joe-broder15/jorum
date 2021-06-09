import React, { useState, useEffect } from "react";
import GetApiRequest from "../../hooks/GetApiRequest";
import Topic from "../../components/Topics/Topic";
import { Container, Row, Col, Spinner, Card } from "react-bootstrap";

export default function TopicList() {
  // get posts using our GET api hook
  const { data, error, isLoaded } = GetApiRequest("/topic");

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
            <Col md="8">
              <h1>Welcome to Jorum</h1>
              <Card>
                <Card.Header>
                  <Card.Title>Topics</Card.Title>
                </Card.Header>
                <Card.Body>
                  {data.map((item) => (
                    <Row className="justify-content-center">
                      <Col>
                        <Topic data={item} />
                      </Col>
                    </Row>
                  ))}
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}
