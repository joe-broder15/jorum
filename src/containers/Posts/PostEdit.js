import React, { useState, useEffect, useRef } from "react";
import axiosInstance from "../../utils/axiosApi";
import { useHistory } from "react-router-dom";
import AuthContext from "../../contexts/AuthContext";
import GetApiRequest from "../../hooks/GetApiRequest";
import { useParams } from "react-router-dom";
import {
  Container,
  Row,
  Card,
  Col,
  Form,
  Button,
  Spinner,
} from "react-bootstrap";
import { ThemeConsumer } from "react-bootstrap/esm/ThemeProvider";
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
import "../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

function PostEditContainer(props) {
  let { topicId, threadId, postId } = useParams();
  let history = useHistory();
  const [confirm, setConfirm] = useState(false);
  const { authState, setAuthState, userState } = React.useContext(AuthContext);

  const [contentState, setContentState] = useState(() =>
    JSON.parse(props.data.content)
  );

  // set initial state when data loads
  useEffect(() => {
    if (
      userState == null ||
      (props.data.user != userState.username && userState.privilege <= 1)
    ) {
      history.push("/");
    }
  }, []);

  // handles edit
  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (confirm == false) {
      alert("please do not leave any fields blank");
      return;
    }

    const editData = () => {
      axiosInstance
        .put("/topic/" + topicId + "/thread/" + threadId + "/post/" + postId, {
          content: contentState,
        })
        .then((response) => {
          // setIsLoaded(true);
          if (response.status == 201) {
            alert("success");
          } else {
            alert("fail");
          }
          history.push("/topic/" + topicId + "/thread/" + threadId);
        })
        .catch((error) => {
          alert(error);
        });
    };
    editData();
  };

  // handles delete
  const handleDelete = () => {
    const deleteData = () => {
      axiosInstance
        .delete("/topic/" + topicId + "/thread/" + threadId + "/post/" + postId)
        .then((response) => {
          // setIsLoaded(true);
          if (response.status == 200) {
            alert("success");
          } else {
            alert("fail");
          }
          history.push("/topic/" + topicId + "/thread/" + threadId);
        })
        .catch((error) => {
          alert(error);
        });
    };
    deleteData();
  };

  return (
    <Container>
      {console.log(contentState)}
      <Row>
        <Col>
          <Row className="justify-content-md-center">
            <Col md="8">
              <h1>Edit Post</h1>
              <Card>
                <Card.Body>
                  <Form onSubmit={(event) => handleSubmit(event)}>
                    <Editor
                      initialContentState={contentState}
                      onContentStateChange={setContentState}
                    />
                    <Form.Check
                      type="checkbox"
                      value={confirm}
                      checked={confirm}
                      onChange={(event) => setConfirm(!confirm)}
                      label={"Confirm"}
                    />
                    <br />
                    <Button type="submit">Submit</Button>
                  </Form>
                  <Button variant="danger" onClick={handleDelete}>
                    Delete
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}

// fetch data and render and editor
export default function PostEdit(props) {
  let { topicId, threadId, postId } = useParams();
  const { data, error, isLoaded } = GetApiRequest(
    "/topic/" + topicId + "/thread/" + threadId + "/post/" + postId
  );
  if (!isLoaded) {
    return (
      <Spinner animation="border" role="status">
        <span className="sr-only"></span>
      </Spinner>
    );
  }
  return <PostEditContainer data={data} />;
}
