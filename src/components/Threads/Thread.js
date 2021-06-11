import React from "react";
import { Link } from "react-router-dom";
import { Card, Badge, Row, Col } from "react-bootstrap";
import UserLink from "../Users/UserLink";
import { data } from "jquery";

export default function Thread(props) {
  return (
    <Card>
      <Link to={"/topic/" + props.data.id}>
        <Card.Body>
          <Card.Title>
            <Row>
              <Col md="9">
                {props.data.name} {props.data.nsfw ? "(NSFW)" : ""}
              </Col>
              <Col sm="3">
                By: <UserLink user={props.data.user} />
              </Col>
            </Row>
          </Card.Title>
        </Card.Body>
      </Link>
    </Card>
  );
}
