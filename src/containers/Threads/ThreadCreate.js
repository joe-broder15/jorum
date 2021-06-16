import React, { useState, useEffect } from "react";
import axiosInstance from "../../utils/axiosApi";
import { useHistory, useParams } from "react-router-dom";
import AuthContext from "../../contexts/AuthContext";
import { Editor } from "react-draft-wysiwyg";
import { 
  EditorState,
  ContentState,
  convertFromHTML,
  CompositeDecorator,
  convertToRaw,
  convertFromRaw,
  getDefaultKeyBinding, } from "draft-js";
import { Container, Row, Card, Col, Form, Button } from "react-bootstrap";
import "../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

export default function ThreadCreate(props) {
  let { topicId } = useParams();
  let history = useHistory();

  // thread
  const [threadName, setThreadName] = useState("");
  const [threadNsfw, setThreadNsfw] = useState(false);

  //   original post
  const [postContent, setPostContent] = useState("");
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  //   confirm
  const [confirm, setConfirm] = useState(false);
  const { authState, setAuthState, userState, setUserState } =
    React.useContext(AuthContext);
  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (threadName == "" || postContent == {} || confirm == false) {
      alert("please do not leave any fields blank");
      return;
    }

    const fetchData = () => {
      axiosInstance
        .post("/topic/" + topicId + "/thread", {
          postContent: convertToRaw(editorState.getCurrentContent()),
          threadName: threadName,
          threadNsfw: threadNsfw,
        })
        .then((response) => {
          if (response.status == 200) {
            alert("success");
          } else {
            alert("fail");
          }
          history.push("/");
        })
        .catch((error) => {
          alert(error);
        });
    };
    fetchData();
  };

  // redirect if not authenticated
  useEffect(() => {
    if (authState == false) {
      history.push("/");
    }
  });

  useEffect(() => {
    console.log(convertToRaw(editorState.getCurrentContent()));
  }, [editorState]);

  return (
    <Container>
      <Row>
        <Col>
          <Row className="justify-content-md-center">
            <Col md="8">
              <Card>
                <Card.Header>
                  <Card.Title>Create Thread</Card.Title>
                </Card.Header>
                <Card.Body>
                  <Form onSubmit={(event) => handleSubmit(event)}>
                    <h3>Thread</h3>
                    <Form.Group>
                      <Form.Label>Thread Name</Form.Label>
                      <Form.Control
                        value={threadName}
                        onChange={(event) => setThreadName(event.target.value)}
                      />
                    </Form.Group>
                    <br />
                    <Form.Check
                      type="checkbox"
                      value={threadNsfw}
                      checked={threadNsfw}
                      onChange={(event) => setThreadNsfw(!threadNsfw)}
                      label={"NSFW"}
                    />
                    <br />
                    <h3>First Post</h3>
                    <Form.Group>
                      <Form.Label>Content</Form.Label>
                      <div
                        style={{
                          padding: "2px",
                          minHeight: "400px",
                        }}
                      >
                        <Editor
                          editorState={editorState}
                          onEditorStateChange={setEditorState}
                        />
                      </div>
                      
                    </Form.Group>
                    <br />

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
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}
