import React from "react";
import { Link } from "react-router-dom";
import { Card, Badge, Row, Col, Button } from "react-bootstrap";
import UserLink from "../../components/Users/UserLink";
import { data } from "jquery";
import AuthContext from "../../contexts/AuthContext";

export default function Thread(props) {
  const { authState, setAuthState, userState } = React.useContext(AuthContext);
  return (
    <Card>
      <Card.Body>
        <Card.Title>
          <Row>
            <Col md="9">
              <Link
                to={"/topic/" + props.data.topic + "/thread/" + props.data.id}
              >
                {props.data.id + ": "} {props.data.name}{" "}
                {props.data.nsfw ? "(NSFW)" : ""}
              </Link>
            </Col>
            <Col sm="3">
              By: <UserLink user={props.data.user} />
            </Col>
          </Row>
          <Row>
            <Col>
              <i>{props.data.created_date}</i>
            </Col>
          </Row>
          {authState == true &&
          userState != null &&
          userState.username == props.data.user ? (
            <Link
              to={
                "/topic/" +
                props.data.topic +
                "/thread/" +
                props.data.id +
                "/edit"
              }
            >
              <Button>Edit</Button>
            </Link>
          ) : (
            ""
          )}
        </Card.Title>
      </Card.Body>
    </Card>
  );
}
