import { css } from "@emotion/react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styled from "@emotion/styled";

export const globalStyles = css`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-size: 16px;
    font-family: "SUIT-Regular";
  }

  @media (max-width: 1300px) {
    html {
      font-size: 14px;
    }
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  ul,
  li {
    list-style: none;
  }

  button {
    cursor: pointer;
  }

  @font-face {
    font-family: "SUIT-Bold";
    src: url("/fonts/SUIT-Bold.ttf");
  }

  @font-face {
    font-family: "SUIT-ExtraBold";
    src: url("/fonts/SUIT-ExtraBold.ttf");
  }

  @font-face {
    font-family: "SUIT-ExtraLight";
    src: url("/fonts/SUIT-ExtraLight.ttf");
  }

  @font-face {
    font-family: "SUIT-Heavy";
    src: url("/fonts/SUIT-Heavy.ttf");
  }

  @font-face {
    font-family: "SUIT-Light";
    src: url("/fonts/SUIT-Light.ttf");
  }

  @font-face {
    font-family: "SUIT-Medium";
    src: url("/fonts/SUIT-Medium.ttf");
  }

  @font-face {
    font-family: "SUIT-Regular";
    src: url("/fonts/SUIT-Regular.ttf");
  }

  @font-face {
    font-family: "SUIT-SemiBold";
    src: url("/fonts/SUIT-SemiBold.ttf");
  }

  @font-face {
    font-family: "SUIT-Thin";
    src: url("/fonts/SUIT-Thin.ttf");
  }
`;

export const GlobalWrapper = styled.div`
  width: 100%;
  max-width: 1300px;
`;