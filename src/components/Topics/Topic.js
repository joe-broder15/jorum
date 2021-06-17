import React from "react";
import { Link } from "react-router-dom";
import { Card, Badge, ListGroup, ListGroupItem } from "react-bootstrap";
import UserLink from "../Users/UserLink";
import { data } from "jquery";

export default function Topic(props) {
  return (
    <ListGroup.Item>
      <Link to={"/topic/" + props.data.id} style={{ textDecoration: "none" }}>
        <h4 >
          {props.data.name} {props.data.nsfw ? (<i>{"(NSFW)"}</i>) : ""}
        </h4>
        <h6 style={{color:"gray"}}>
          <i>{props.data.description}</i>
        </h6>
      </Link>
    </ListGroup.Item>
  );
}
