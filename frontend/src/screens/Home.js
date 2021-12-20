import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Api } from "../api";
import useInput from "../components/hooks/useInput";
import Logo_img from "../components/styles/images/DesignC_logo_03_white.png";
import Profile_img from "../components/styles/images/logo.jpg";
import MyProfile_img from "../components/styles/images/myprofile.png";
import MyPost_img from "../components/styles/images/pencil.png";
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  background: ${(props) => props.theme.bgColor};
  width: 100vw;
  height: 100vh;
`;
const Nav = styled.div`
  width: 100%;
  height: 10%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  background: ${(props) => props.theme.headerColor};
  font-size: 1.1vw;
  font-weight: 600;
  :first-child {
    flex: 3;
  }
  :not(:first-child) {
    flex: 1;
  }
`;
const Menu = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  font-weight: 600;
  color: white;
`;
const LogoutBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;
const LogoutButton = styled.span`
  cursor: pointer;
`;
const ProfileImg = styled.img`
  width: 3vw;
  height: 3vw;
  border-radius: 50%;
  margin-right: 1vw;
  cursor: pointer;
`;
const LogoImg = styled.img`
  width: 10vw;
  cursor: pointer;
`;
const MainContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 80%;
  width: 100%;
  background: ${(props) => props.theme.lightHeaderColor};
  position: relative;
`;
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
    background: ${(props) => props.theme.pointColor};
    color: #fff;
  }
`;
const ButtonImg = styled.img`
  width: 2vw;
`;
const MainRightContainer = styled.div`
  flex: 6;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: ${(props) => props.theme.ContainerColor};
  height: 100%;
`;
const MainRightContainerTitle = styled.span`
  width: 80%;
  height: 10%;
  text-align: center;
  font-size: 1.8vw;
`;
const BoardWrapper = styled.div`
  width: 80%;
  height: 80%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;
const BoardRow = styled.div`
  width: 95%;
  height: 10%;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  cursor: ${(props) => (props.isTitle ? "inherit" : "pointer")};
  border-top: 1px solid rgba(0, 0, 0, 0.5);
  :last-child {
    border-bottom: 1px solid rgba(0, 0, 0, 0.5);
  }
  :hover {
    background-color: ${(props) =>
      props.isTitle ? "inherit" : props.theme.pointColor};
    color: ${(props) => (props.isTitle ? "inherit" : "#fff")};
  }
`;
const BoardCell = styled.div`
  width: 100%;
  height: 3vw;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2vw;
  font-weight: 600;
  border-right: 1px solid rgba(0, 0, 0, 0.5);
  :first-child {
    border-left: 1px solid rgba(0, 0, 0, 0.5);
    flex: 1;
  }
  :nth-child(2) {
    flex: 3;
  }
  :nth-child(3) {
    flex: 2;
  }
  :last-child {
    flex: 2;
  }
`;
const CurrentTitleContainer = styled.div`
  width: 80%;
  height: 10%;
  font-size: 1.2vw;
  border: 1px solid rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  background-color: #fff;
`;
const CurrentTitleContainerEdit = styled.input`
  width: 80%;
  height: 10%;
  font-size: 1.2vw;
  border: 1px solid rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;
const CurrentContentContainer = styled.div`
  width: 80%;
  height: 70%;
  font-size: 0.9vw;
  border: 1px solid rgba(0, 0, 0, 0.5);
  border-top: none;
  display: flex;
  align-items: flex-start;
  background-color: #fff;
`;
const CurrentContentContainerEdit = styled.textarea`
  width: 80%;
  height: 70%;
  font-size: 1vw;
  resize: none;
  border: 1px solid rgba(0, 0, 0, 0.5);
  border-top: none;
  display: flex;
  align-items: flex-start;
`;
const ButtonBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;
const ButtonContainer = styled.div`
  font-size: 1.2vw;
  border: 1px solid rgba(0, 0, 0, 0.5);
  padding: 0.4vw;
  margin: 1vw 1vw 0 1vw;
  background-color: ${(props) =>
    props.type === "complete" && props.theme.lightHeaderColor};
  color: ${(props) => props.type === "complete" && "#fff"};
  cursor: pointer;
  :hover {
    background-color: ${(props) =>
      props.type === "complete"
        ? props.theme.lightHeaderColor
        : props.theme.pointColor};
    color: ${(props) => (props.type === "complete" ? "#000" : "#fff")};
  }
`;

const WordCount = styled.span`
  font-size: 1vw;
  font-weight: 600;
  position: absolute;
  bottom: ${(props) => props.bottom};
  right: ${(props) => props.right};
`;
const AddPostButton = styled.div`
  position: absolute;
  width: 3vw;
  height: 3vw;
  bottom: 5vw;
  border-radius: 50%;
  font-size: 2vw;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  right: 4vw;
  color: #000;
  border: 1px solid rgba(0, 0, 0, 0.5);
  background-color: ${(props) => props.theme.lightHeaderColor};
  color: white;
  padding-bottom: 0.4vw;
  :hover {
    background-color: ${(props) => props.theme.pointColor};
    color: #fff;
  }
  cursor: pointer;
`;

const GoToBackButton = styled.div`
  position: absolute;
  width: 5vw;
  height: 5vw;
  top: 5vw;
  border-radius: 50%;
  font-size: 1vw;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  right: 7vw;
  color: #000;
  border: 1px solid rgba(0, 0, 0, 0.5);
  :hover {
    background-color: ${(props) => props.theme.pointColor};
    color: #fff;
  }
  cursor: pointer;
`;

const Footer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
  height: 10%;
  background: ${(props) => props.theme.lightHeaderColor};
`;
const FooterLeft = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: #333;
  margin: 0 0.2vw;
  height: 100%;
  background: ${(props) => props.theme.headerColor};
`;
const FooterRight = styled.div`
  flex: 6;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: #555;
  height: 100%;
  background: ${(props) => props.theme.headerColor};
`;
const Home = () => {
  const MAIN = "main";
  const EDIT = "edit";
  const CREATE = "create";
  const CURRENT = "current";
  const isLoggedIn = true;

  const [current, setCurrent] = useState({
    code: -1,
    title: "",
    content: "",
    img_url: "",
    author: "",
    created_at: "",
  });
  const [data, setData] = useState("");
  const [mode, setMode] = useState(MAIN);
  const titleInput = useInput("");
  const contentInput = useInput("");
  useEffect(() => {
    Api.getAll().then((res) => {
      setData(res.data);
    });
  }, []);
  return (
    <Wrapper>
      <Nav>
        <Menu>
          <LogoImg src={Logo_img} alt={"로고"} />
        </Menu>
        <Menu>
          {!isLoggedIn ? (
            "로그인"
          ) : (
            <LogoutBox>
              <ProfileImg src={Profile_img} alt={"프로필이미지"} />
              <LogoutButton>로그아웃</LogoutButton>
            </LogoutBox>
          )}
        </Menu>
      </Nav>
      <MainContainer>
        <MainLeftContainer>
          <MainLeftButton>
            <ButtonImg src={MyProfile_img} />내 프로필 보기
          </MainLeftButton>
          <MainLeftButton>
            <ButtonImg src={MyPost_img} />내 게시글 보기
          </MainLeftButton>
        </MainLeftContainer>
        <MainRightContainer>
          {current.code === -1 && mode === MAIN ? (
            <>
              <AddPostButton onClick={() => setMode(CREATE)}>+</AddPostButton>
              <MainRightContainerTitle>게시판 리스트</MainRightContainerTitle>
              <BoardWrapper>
                <BoardRow isTitle={true}>
                  <BoardCell>글 번호</BoardCell>
                  <BoardCell>글 제목</BoardCell>
                  <BoardCell>작성자</BoardCell>
                  <BoardCell>작성 시간</BoardCell>
                </BoardRow>
                {data &&
                  data.map((row) => (
                    <BoardRow
                      onClick={() => {
                        setCurrent({
                          code: row.board_code,
                          title: row.board_title,
                          content: row.board_content,
                          img_url: row.board_img_url,
                          author: row.board_author,
                          created_at: row.created_at,
                        });
                      }}
                      key={row.board_code}
                    >
                      <BoardCell>{row.board_code}</BoardCell>
                      <BoardCell>{row.board_title}</BoardCell>
                      <BoardCell>{row.board_author}</BoardCell>
                      <BoardCell>{row.created_at.split("T")[0]}</BoardCell>
                    </BoardRow>
                  ))}
              </BoardWrapper>
            </>
          ) : (
            <>
              {mode === MAIN && (
                <>
                  <GoToBackButton onClick={() => setCurrent({ code: -1 })}>
                    뒤로가기
                  </GoToBackButton>
                  <MainRightContainerTitle>
                    {current.author}의 게시글
                  </MainRightContainerTitle>
                  <BoardWrapper>
                    <CurrentTitleContainer>
                      제목: {current.title}
                    </CurrentTitleContainer>
                    <CurrentContentContainer>
                      {current.content}
                    </CurrentContentContainer>
                    <ButtonBox>
                      {isLoggedIn && (
                        <ButtonContainer
                          onClick={() => {
                            setMode(EDIT);
                            titleInput.setValue(current.title);
                            contentInput.setValue(current.content);
                          }}
                        >
                          수정하기
                        </ButtonContainer>
                      )}
                      <ButtonContainer>삭제하기</ButtonContainer>
                    </ButtonBox>
                  </BoardWrapper>
                </>
              )}
            </>
          )}
          {mode === EDIT && (
            <>
              <GoToBackButton onClick={() => setCurrent({ code: -1 })}>
                뒤로가기
              </GoToBackButton>
              <MainRightContainerTitle>내 글 수정하기</MainRightContainerTitle>
              <BoardWrapper>
                <CurrentTitleContainerEdit type="text" {...titleInput} />
                <WordCount bottom={"30vw"} right={"16vw"}>
                  {titleInput.value.length} / 30
                </WordCount>
                <CurrentContentContainerEdit
                  type="textarea"
                  {...contentInput}
                />
                <WordCount bottom={"9vw"} right={"16vw"}>
                  {contentInput.value.length} / 150
                </WordCount>
                <ButtonBox>
                  {isLoggedIn && (
                    <ButtonContainer onClick={() => setMode(MAIN)}>
                      수정취소
                    </ButtonContainer>
                  )}
                  <ButtonContainer type={"complete"}>수정완료</ButtonContainer>
                </ButtonBox>
              </BoardWrapper>
            </>
          )}
          {mode === CREATE && (
            <>
              <GoToBackButton onClick={() => setCurrent({ code: -1 })}>
                뒤로가기
              </GoToBackButton>
              <MainRightContainerTitle>글 작성</MainRightContainerTitle>
              <BoardWrapper>
                <CurrentTitleContainer>제목:</CurrentTitleContainer>
                <CurrentContentContainer></CurrentContentContainer>
                <ButtonBox>
                  {isLoggedIn && (
                    <ButtonContainer
                      onClick={() => {
                        setMode(EDIT);
                        titleInput.setValue(current.title);
                        contentInput.setValue(current.content);
                      }}
                    >
                      수정하기
                    </ButtonContainer>
                  )}
                  <ButtonContainer>삭제하기</ButtonContainer>
                </ButtonBox>
              </BoardWrapper>
            </>
          )}
        </MainRightContainer>
      </MainContainer>
      <Footer>
        <FooterLeft>만든이: 유정민</FooterLeft>
        <FooterRight>개발자 링크: github</FooterRight>
      </Footer>
    </Wrapper>
  );
};

export default Home;
