import React from "react";
import { Link } from "react-router-dom";
import {
  Card,
  Badge,
  Row,
  Col,
  Button,
  ListGroup,
  ListGroupItem,
} from "react-bootstrap";
import UserLink from "../../components/Users/UserLink";
import { data } from "jquery";
import AuthContext from "../../contexts/AuthContext";

export default function Thread(props) {
  const { authState, setAuthState, userState } = React.useContext(AuthContext);
  return (
    <ListGroup.Item>
      <Card.Title>
        <Row >
          <Col className="mr-auto">
            <Link
              to={"/topic/" + props.data.topic + "/thread/" + props.data.id}
              style={{ textDecoration: "none" }}
            >
              <h3>
                {props.data.name} {props.data.nsfw ? "(NSFW)" : ""}
              </h3>
            </Link>
          </Col>
          <Col md={"auto"}>
            <Row>
              <i>
                Created by <UserLink user={props.data.user} />
              </i>
            </Row>
            <Row>
              <i>Created on {props.data.created_date.slice(0,10)}</i>
            </Row>
          </Col>
          <Col md={1}>
            {" "}
            {authState == true &&
            userState != null &&
            (userState.username == props.data.user || userState.privilege > 1)? (
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
          </Col>
        </Row>
      </Card.Title>
    </ListGroup.Item>
  );
}
