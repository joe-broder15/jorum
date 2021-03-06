import React, { useState, useEffect } from "react";
import GetApiRequest from "../../hooks/GetApiRequest";
import Thread from "./Thread";
import { Link, useParams } from "react-router-dom";
import { Container, Row, Col, Spinner, Card, ListGroup } from "react-bootstrap";

export default function ThreadList(props) {
  const topicId = props.topicId;
  // get posts using our GET api hook
  const { data, error, isLoaded } = GetApiRequest(
    "/topic/" + topicId + "/thread"
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
    <ListGroup>
      {data.length == 0 ? (
        <h4>There are no threads for this topic</h4>
      ) : (
        data.map((item) => <Thread data={item} />)
      )}
    </ListGroup>
  );
}
