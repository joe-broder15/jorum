import React, { useState, useEffect } from "react";
import GetApiRequest from "../../hooks/GetApiRequest";
import Post from "./Post";
import { Container, Row, Col, Spinner } from "react-bootstrap";
import { useParams, Link } from "react-router-dom";

export default function PostList() {
  // get posts using our GET api hook
  let { topicId, threadId } = useParams();
  const { data, error, isLoaded } = GetApiRequest(
    "/topic/" + topicId + "/thread/" + threadId + "/post"
  );

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
      <Row className="justify-content-md-center">
        <Col>
          {data.map((item) => (
            <Row className="justify-content-center">
              <Col>
                <Post data={item} />
              </Col>
            </Row>
          ))}
        </Col>
      </Row>
    </Container>
  );
}
