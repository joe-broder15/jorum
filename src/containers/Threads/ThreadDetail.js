import React, { useState, useEffect } from "react";
import GetApiRequest from "../../hooks/GetApiRequest";
import Topic from "../../components/Topics/Topic";
import ThreadList from "../Threads/ThreadList";
import { Container, Row, Col, Spinner, Button } from "react-bootstrap";
import { useParams, Link } from "react-router-dom";
import AuthContext from "../../contexts/AuthContext";
import PostList from "../Posts/PostList";

export default function ThreadDetail(props) {
  let { topicId, threadId } = useParams();
  // get posts using our GET api hook
  const { data, error, isLoaded } = GetApiRequest(
    "/topic/" + topicId + "/thread/" + threadId
  );
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
            <Col md="8">
              <h1>{data.name}</h1>
              {authState && userState != null ? (
                <Link
                  to={
                    "/topic/" + topicId + "/thread/" + threadId + "/post/create"
                  }
                >
                  <Button>Make a Post</Button>
                </Link>
              ) : (
                ""
              )}
              <PostList />
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}
