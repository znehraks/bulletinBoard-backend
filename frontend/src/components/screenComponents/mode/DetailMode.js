import React, { useState } from "react";
import {
  MainRightContainerTitle,
  BoardWrapper,
  CurrentTitleContainer,
  CurrentContentContainer,
  ButtonBox,
  ButtonContainer,
  GoToBackButton,
} from "../../styles/styledComponents";
import { EDIT } from "../Enum";
import PropTypes from "prop-types";
import styled from "styled-components";

const PopupOverlay = styled.div`
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  opacity: 0.3;
  display: ${(props) => (props.display ? "block" : "none")};
  position: absolute;
  top: 0;
  left: 0;
  z-index: 999;
`;
const PopupWrapper = styled.div`
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  display: ${(props) => (props.display ? "block" : "none")};
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const PopupMessageBox = styled.div`
  width: 30%;
  height: 20%;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  padding-top: 0.4vw;
  font-size: 1.2vw;
  color: #000;
`;

export const DetailMode = ({
  setCurrent,
  setMode,
  prevMode,
  current,
  isLoggedIn,
  titleInput,
  contentInput,
  deleteFunc,
}) => {
  const [display, setDisplay] = useState(false);
  return (
    <>
      {display ? (
        <>
          <PopupOverlay display={display} />
          <PopupWrapper display={display}>
            <PopupMessageBox>
              정말 삭제하시겠습니까?
              <ButtonBox>
                <ButtonContainer
                  bgColor={"#c34b47"}
                  onClick={() => {
                    deleteFunc(current.code);
                    setDisplay(false);
                  }}
                >
                  삭제하기
                </ButtonContainer>
                <ButtonContainer onClick={() => setDisplay(false)}>
                  취소하기
                </ButtonContainer>
              </ButtonBox>
            </PopupMessageBox>
          </PopupWrapper>
        </>
      ) : (
        <>
          <GoToBackButton
            onClick={() => {
              setCurrent({ code: -1 });
              setMode(prevMode);
            }}
          >
            뒤로가기
          </GoToBackButton>
          <MainRightContainerTitle>
            {current.author}의 게시글
          </MainRightContainerTitle>
          <BoardWrapper>
            <CurrentTitleContainer>{current.title}</CurrentTitleContainer>
            <CurrentContentContainer>{current.content}</CurrentContentContainer>
            {isLoggedIn && current.is_mine && (
              <ButtonBox>
                <ButtonContainer
                  onClick={() => {
                    setMode(EDIT);
                    titleInput.setValue(current.title);
                    contentInput.setValue(current.content);
                  }}
                >
                  수정하기
                </ButtonContainer>
                <ButtonContainer
                  onClick={() => {
                    setDisplay("block");
                  }}
                >
                  삭제하기
                </ButtonContainer>
              </ButtonBox>
            )}
          </BoardWrapper>
        </>
      )}
    </>
  );
};

DetailMode.propTypes = {
  setCurrent: PropTypes.func.isRequired,
  setMode: PropTypes.func.isRequired,
  prevMode: PropTypes.string.isRequired,
  current: PropTypes.object.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  titleInput: PropTypes.object.isRequired,
  contentInput: PropTypes.object.isRequired,
  deleteFunc: PropTypes.func.isRequired,
};
