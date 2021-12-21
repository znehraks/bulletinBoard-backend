import React, { useContext } from "react";
import {
  MainRightContainerTitle,
  BoardWrapper,
  CurrentTitleContainerEdit,
  CurrentContentContainerEdit,
  ButtonBox,
  ButtonContainer,
  WordCount,
} from "../../styles/styledComponents";
import { MAIN } from "../Enum";
import PropTypes from "prop-types";
import isLoggedInContext from "../Context";

export const CreateMode = ({
  titleInput,
  contentInput,
  isLoggedIn,
  setMode,
  createFunc,
  setPage,
}) => {
  const { me } = useContext(isLoggedInContext);
  return (
    <>
      <MainRightContainerTitle>글 작성</MainRightContainerTitle>
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
          placeholder="내용을 입력하세요"
          {...contentInput}
        />
        <WordCount bottom={"8vw"} right={"16vw"}>
          {contentInput.value.length} / 1000
        </WordCount>
        <ButtonBox>
          {isLoggedIn && (
            <ButtonContainer onClick={() => setMode(MAIN)}>
              취소하기
            </ButtonContainer>
          )}
          <ButtonContainer
            onClick={() => {
              createFunc(
                me.code,
                me.user_id,
                titleInput.value,
                contentInput.value
              );
              setPage(1);
              setMode(MAIN);
            }}
          >
            완료하기
          </ButtonContainer>
        </ButtonBox>
      </BoardWrapper>
    </>
  );
};

CreateMode.propTypes = {
  titleInput: PropTypes.object.isRequired,
  contentInput: PropTypes.object.isRequired,
  isLoggedIn: PropTypes.func.isRequired,
  setMode: PropTypes.func.isRequired,
  createFunc: PropTypes.func.isRequired,
  setPage: PropTypes.func.isRequired,
  me: PropTypes.object.isRequired,
};
