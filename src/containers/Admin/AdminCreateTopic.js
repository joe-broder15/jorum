import React, { useState, useEffect } from "react";
import axiosInstance from "../../utils/axiosApi";
import { useHistory } from "react-router-dom";
import AuthContext from "../../contexts/AuthContext";
import { Container, Row, Card, Col, Form, Button } from "react-bootstrap";

export default function AdminCreateTopic() {
  let history = useHistory();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [confirm, setConfirm] = useState(false);
  const [nsfw, setNsfw] = useState(false);
  const { authState, setAuthState, userState, setUserState } =
    React.useContext(AuthContext);
  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (name == "" || description == "" || confirm == false) {
      alert("please do not leave any fields blank");
      return;
    }

    const fetchData = () => {
      axiosInstance
        .post("/topic", {
          name: name,
          description: description,
          nsfw: nsfw
        })
        .then((response) => {
          if (response.status == 201) {
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
    if (!authState || userState == null || userState.privilege <= 1) {
      history.push("/");
    }
  });

  return (
    <Container>
      <Row>
        <Col>
          <Row className="justify-content-md-center">
            <Col md="8">
              <h1>Admin Create Topic</h1>
              <Card>
                <Card.Body>
                  <Form onSubmit={(event) => handleSubmit(event)}>
                    <Form.Group>
                      <Form.Label>Topic Name</Form.Label>
                      <Form.Control
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                      />
                    </Form.Group>
                    <br />
                    <Form.Group>
                      <Form.Label>Description</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows="9"
                        value={description}
                        onChange={(event) => setDescription(event.target.value)}
                      />
                    </Form.Group>
                    <br />
                    <Form.Check
                      type="checkbox"
                      value={nsfw}
                      checked={nsfw}
                      onChange={(event) => setNsfw(!nsfw)}
                      label={"NSFW"}
                    />
                    <br />
                    <Form.Check
                      type="checkbox"
                      value={confirm}
                      checked={confirm}
                      onChange={(event) => setConfirm(!confirm)}
                      label={"Confirm"}
                    />

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
