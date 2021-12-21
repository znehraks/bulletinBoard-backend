import React from "react";
import {
  MainRightContainerTitle,
  BoardWrapper,
  CurrentTitleContainerEdit,
  CurrentContentContainerEdit,
  ButtonBox,
  ButtonContainer,
  WordCount,
} from "../../styles/styledComponents";
import { DETAIL, MAIN } from "../Enum";
import PropTypes from "prop-types";
export const EditMode = ({
  titleInput,
  contentInput,
  isLoggedIn,
  setMode,
  editFunc,
  current,
}) => {
  return (
    <>
      <MainRightContainerTitle>내 글 수정하기</MainRightContainerTitle>
      <BoardWrapper>
        <CurrentTitleContainerEdit
          type="text"
          placeholder="제목을 입력하세요"
          {...titleInput}
        />
        <WordCount bottom={"29.5vw"} right={"16vw"}>
          {titleInput.value.length} / 30
        </WordCount>
        <CurrentContentContainerEdit
          type="textarea"
          placeholder="내용을 입력하세요"
          {...contentInput}
        />
        <WordCount bottom={"8vw"} right={"16vw"}>
          {contentInput.value.length} / 1000
        </WordCount>
        <ButtonBox>
          {isLoggedIn && (
            <ButtonContainer onClick={() => setMode(DETAIL)}>
              수정취소
            </ButtonContainer>
          )}
          <ButtonContainer
            type={"complete"}
            onClick={() => {
              editFunc(current.code, titleInput.value, contentInput.value);
              setMode(MAIN);
            }}
          >
            수정완료
          </ButtonContainer>
        </ButtonBox>
      </BoardWrapper>
    </>
  );
};

EditMode.propTypes = {
  titleInput: PropTypes.object.isRequired,
  contentInput: PropTypes.object.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  setMode: PropTypes.func.isRequired,
  editFunc: PropTypes.func.isRequired,
  current: PropTypes.object.isRequired,
};
