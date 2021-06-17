import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Editor } from "react-draft-wysiwyg";
import {
  EditorState,
  ContentState,
  convertFromHTML,
  CompositeDecorator,
  convertToRaw,
  convertFromRaw,
  getDefaultKeyBinding,
} from "draft-js";
import { Container, Row, Card, Col, Form, Button } from "react-bootstrap";
import "../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import UserLink from "../../components/Users/UserLink";
import AuthContext from "../../contexts/AuthContext";

export default function Post(props) {
  let { topicId, threadId } = useParams();

  const { authState, setAuthState, userState, setUserState } =
    React.useContext(AuthContext);

  const [contentState, setContentState] = useState(() =>
    JSON.parse(props.data.content)
  );

  return (
    <Card>
      <Card.Header>
        <Card.Title>
          <Row>
            <Col className="mr-auto">
              <i>
                Post by <UserLink user={props.data.user} /> @{" "}
                {props.data.created_date.slice(0, 10)}
              </i>
            </Col>
            <Col sm="auto">
              {userState != null &&
              authState &&
              (userState.username == props.data.user ||
                userState.privilege > 1) ? (
                <Link
                  to={
                    "/topic/" +
                    topicId +
                    "/thread/" +
                    threadId +
                    "/post/" +
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
      </Card.Header>
      <Card.Body>
        <Editor
          toolbarHidden
          initialContentState={contentState}
          onContentStateChange={setContentState}
          readOnly={true}
        />
      </Card.Body>
    </Card>
  );
}
