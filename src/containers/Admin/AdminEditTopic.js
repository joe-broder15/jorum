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
export default function AdminEditTopic(props) {
  let { topicId } = useParams();
  let history = useHistory();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [confirm, setConfirm] = useState(false);
  const [nsfw, setNsfw] = useState(false);
  const { authState, setAuthState, userState } = React.useContext(AuthContext);
  const { data, error, isLoaded } = GetApiRequest("/topic/" + String(topicId));
  const isMounted = useRef(1);

  // component did mount
  useEffect(() => {
    isMounted.current = 1;
    if (!authState || userState == null || userState.privilege <= 1) {
      history.push("/");
    }
    return () => {
      isMounted.current = 0;
    };
  });

  const refreshState = () => {
    if (isLoaded && isMounted) {
      if (data.user != userState.username && userState.privilege <= 1) {
        history.push("/");
      }
      setName(data.name);
      setDescription(data.description);
      setNsfw(data.nsfw);
    }
  };

    // set initial state when data loads
    useEffect(() => {
      refreshState();
    }, [isLoaded]);

    const handleSubmit = (evt) => {
        evt.preventDefault();
        if (name == "" || description == "" || confirm == false) {
          alert("please do not leave any fields blank");
          return;
        }
    
        const editData = () => {
          axiosInstance
            .put("/topic/"+data.id, {
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
        editData();
      };

    // handles delete
    const handleDelete = () => {
        console.log("h");
    //   const deleteData = () => {
    //     axiosInstance
    //       .delete("/post/" + String(data.id))
    //       .then((response) => {
    //         // setIsLoaded(true);
    //         if (response.status == 200) {
    //           alert("success");
    //         } else {
    //           alert("fail");
    //         }
    //         history.push("/");
    //       })
    //       .catch((error) => {
    //         alert(error);
    //       });
    //   };
    //   deleteData();
    };

  // wait for load
  if (!isLoaded) {
    return (
      <Spinner animation="border" role="status">
        <span className="sr-only"></span>
      </Spinner>
    );
  }
  return (
    <Container>
      <Row>
        <Col>
          <Row className="justify-content-md-center">
            <Col md="8">
              <h1>Edit Topic {data.id}</h1>
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
                  <Button variant="warning" onClick={refreshState}>
                    Reset
                  </Button>
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
