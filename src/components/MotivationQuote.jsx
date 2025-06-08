import React, { useState, useEffect } from "react";
import styled from "styled-components";
import "animate.css/animate.min.css";

const Video = styled.video`
  position: fixed;
  top: 0;
  left: 0;
  min-width: 100vw;
  min-height: 100vh;
  object-fit: cover;
  z-index: -1;
  opacity: 0.7;
`;
const Container = styled.div`
  position: fixed;
  top: 16px;
  right: 16px;
  z-index: 1000;
`;
const QuoteText = styled.p`
  font-size: 1.5em;
  color: #333;
  margin: 20px;
  text-align: center;
  font-family: cursive, sans-serif;
`;

const QuoteAuthor = styled.p`
  font-size: 1em;
  color: #555;
  margin-top: 10px;
  text-align: center;
  font-family: fantasy, papyrus;
`;

const QuoteContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 1.2em;
  margin: 0 20px 0 20px;
  color: #333;
  min-height: 100vh;
`;

const QuoteContainerError = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: red;
  font-size: 1.2em;
  margin: 20px;
`;

const QuoteContainerLoading = styled.p`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 1.2em;
  margin: 20px;
  color: #333;
`;

const BackgroundVideo = () => (
  <Video autoPlay loop muted>
    <source src="/chuva.mp4" type="video/mp4" />
  </Video>
);

const HeaderContainer = () => (
  <Container>
    <a
      href="https://github.com/uedsonsouza"
      target="_blank"
      rel="noopener noreferrer"
    >
      <img
        src="https://img.shields.io/badge/Gaiek-000000?style=flat&logo=github&logoColor=white"
        alt="GitHub Profile"
      />
    </a>
  </Container>
);

const MotivationQuote = () => {
  const [quote, setQuote] = useState({ text: "", author: "" });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchQuote = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          "https://api.realinspire.live/v1/quotes/random"
        );
        if (!response.ok) {
          throw new Error("Http error! Status: " + response.status);
        }
        const data = await response.json();
        const randomIndex = Math.floor(Math.random() * data.length);
        setQuote({
          text: data[randomIndex].content,
          author: data[randomIndex].author,
        });
      } catch (err) {
        console.error("Error fetching quote:", err);
        setError("Error fetching quote. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchQuote();
  }, []);
  if (loading) {
    return (
      <QuoteContainerLoading>
        <BackgroundVideo />
      </QuoteContainerLoading>
    );
  }
  if (error) {
    return <QuoteContainerError>{error}</QuoteContainerError>;
  }

  return (
    <>
      <BackgroundVideo />
      <HeaderContainer />
      <QuoteContainer>
        <QuoteText>{quote.text}</QuoteText>
        <QuoteAuthor>{quote.author}</QuoteAuthor>
      </QuoteContainer>
    </>
  );
};

export default MotivationQuote;
