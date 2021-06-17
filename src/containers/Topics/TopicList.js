import React, { useState, useEffect, Fragment } from "react";
import GetApiRequest from "../../hooks/GetApiRequest";
import Topic from "../../components/Topics/Topic";
import { Container, Row, Col, Spinner, Card, ListGroup } from "react-bootstrap";

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
              <Card>
                <Card.Header>
                  <Card.Title>Topics</Card.Title>
                </Card.Header>

                <Card.Body>
                  <Card.Text>
                    <h5>
                      Welcome to my forum! Log in or register to make threads
                      and post in the following topics.
                    </h5>
                  </Card.Text>
                  <ListGroup>
                    {data.map((item) => (
                      <Topic data={item} />
                    ))}
                  </ListGroup>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}
