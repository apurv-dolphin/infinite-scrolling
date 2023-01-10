import React, { useEffect, useState } from "react";
import { Card, Col, Container, Row, Spinner } from "react-bootstrap";

export default function PostPage() {
  const [post, setPost] = useState([]);
  const [page, setPage] = useState(1);
  const [loding, setLoading] = useState(true);

  const getApiCall = async () => {
    const res = await fetch(
      `https://jsonplaceholder.typicode.com/posts?_limit=12&_page=${page}`
    );
    const data = await res.json();
    setPost((prev) => [...prev, ...data]);
    setLoading(false)
  };

  const handleInfinitScroll = async () => {
    try {
      if (
        window.innerHeight + document.documentElement.scrollTop + 1 >=
        document.documentElement.scrollHeight
      ) {
        setLoading(true);
        setPage((p) => p + 1);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getApiCall();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  useEffect(() => {
    window.addEventListener("scroll", handleInfinitScroll);
    return () => window.removeEventListener("scroll", handleInfinitScroll);
  }, []);

  return (
    <>
      <Container>
        <Row>
          {post.map((newPost, index) => (
            <Col className="col-md-4 my-3" key={index}>
              <Card style={{ width: "22rem", height: "25rem" }}>
                <div className="postId">{index + 1}</div>
                <Card.Body>
                  <Card.Title>
                    <p>Title:- </p>
                    <p>{newPost.title}</p>
                  </Card.Title>
                  <hr />
                  <Card.Text>{newPost.body}</Card.Text>
                  <hr />
                  <Card.Link href="#">Another Link</Card.Link>
                </Card.Body>
              </Card>
            </Col>
          ))}
          {loding && (
            <>
              <Spinner animation="grow" variant="success" />
            </>
          )}
        </Row>
      </Container>
    </>
  );
}
