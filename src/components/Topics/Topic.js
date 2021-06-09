import React from "react";
import { Link } from "react-router-dom";
import { Card, Badge } from "react-bootstrap";
import UserLink from "../Users/UserLink";
import { data } from "jquery";

export default function Topic(props) {
  return (
    <Card>
      <Link to={"/topic/" + props.data.id}>
        <Card.Body>
          <Card.Title>
            {props.data.name} {props.data.nsfw ? "(NSFW)" : ""}
          </Card.Title>
          <Card.Text>
            <i>{props.data.description}</i>
          </Card.Text>
        </Card.Body>
      </Link>
    </Card>
  );
}
