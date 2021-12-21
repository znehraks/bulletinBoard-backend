import React from "react";
import styled from "styled-components";
import MyProfile_img from "../styles/images/myprofile.png";
import MyPost_img from "../styles/images/pencil.png";
import { LOGIN, PROFILE } from "./Enum";
import PropTypes from "prop-types";

const MainLeftContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  background: ${(props) => props.theme.ContainerColor};
  margin: 0 0.2vw;
  height: 100%;
`;

const MainLeftButton = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  font-size: 1.2vw;
  border: 1px solid rgba(0, 0, 0, 0.5);
  margin: 2.5vw 0;
  padding: 0.6vw;
  cursor: pointer;
  :nth-child(2) {
    margin: 0;
  }
  :hover {
    background: ${(props) => props.theme.lightHeaderColor};
    color: #fff;
  }
`;
const ButtonImg = styled.img`
  width: 2vw;
`;
export const LeftContainer = ({
  mode,
  isLoggedIn,
  setPrevMode,
  setMode,
  getUserFunc,
}) => (
  <MainLeftContainer>
    <MainLeftButton
      onClick={() => {
        if (isLoggedIn) {
          setPrevMode(mode);
          setMode(PROFILE);
          getUserFunc();
        } else {
          setMode(LOGIN);
        }
      }}
    >
      <ButtonImg src={MyProfile_img} />내 프로필 보기
    </MainLeftButton>
    <MainLeftButton
      onClick={() => {
        if (isLoggedIn) {
          setPrevMode(mode);
          setMode(PROFILE);
          getUserFunc();
        } else {
          setMode(LOGIN);
        }
      }}
    >
      <ButtonImg src={MyPost_img} />내 게시글 보기
    </MainLeftButton>
  </MainLeftContainer>
);

LeftContainer.propTypes = {
  mode: PropTypes.string.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  setPrevMode: PropTypes.func.isRequired,
  setMode: PropTypes.func.isRequired,
  getUserFunc: PropTypes.func.isRequired,
};
