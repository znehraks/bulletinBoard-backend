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
    background: ${(props) => props.theme.lightHeaderColor};
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
  margin-top: 1vw;
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
      props.isTitle ? "inherit" : props.theme.lightHeaderColor};
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
  margin: ${(props) => (props.margin ? props.margin : "1vw 1vw 0 1vw")};
  background-color: inherit;
  color: #000;
  cursor: pointer;
  :hover {
    background-color: ${(props) => props.theme.lightHeaderColor};
    color: #fff;
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
  background-color: inherit;
  color: black;
  padding-bottom: 0.4vw;
  :hover {
    background-color: ${(props) => props.theme.lightHeaderColor};
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
    background-color: ${(props) => props.theme.lightHeaderColor};
    color: #fff;
  }
  cursor: pointer;
`;
const PageSpan = styled.span`
  font-size: 1.2vw;
  margin-bottom: 1vw;
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
  const [renderToken, setRenderToken] = useState(true);
  const [page, setPage] = useState(1);
  const titleInput = useInput("");
  const contentInput = useInput("");

  if (titleInput.value.length >= 31) {
    titleInput.setValue(titleInput.value.slice(0, 30));
  }
  if (contentInput.value.length >= 1001) {
    contentInput.setValue(contentInput.value.slice(0, 1000));
  }
  const getAllFunc = async () => {
    await Api.getAll()
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const createFunc = async (
    user_code,
    board_author,
    board_title,
    board_content
  ) => {
    await Api.createPost(user_code, board_author, board_title, board_content)
      .then((res) => {
        console.log(res);
        if (res.data.affectedRows === 1) setRenderToken(!renderToken);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const editFunc = async (board_code, board_title, board_content) => {
    await Api.editPost(board_code, board_title, board_content)
      .then((res) => {
        console.log(res);
        if (res.data.affectedRows === 1) {
          setCurrent({
            ...current,
            title: board_title,
            content: board_content,
          });
          setRenderToken(!renderToken);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteFunc = async (board_code) => {
    await Api.deletePost(board_code)
      .then((res) => {
        console.log(res);
        if (res.data.affectedRows === 1) {
          setCurrent({ code: -1 });
          setRenderToken(!renderToken);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getAllFunc();
  }, [renderToken]);

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
              <AddPostButton
                onClick={() => {
                  setMode(CREATE);
                  titleInput.setValue("");
                  contentInput.setValue("");
                }}
              >
                +
              </AddPostButton>
              <MainRightContainerTitle>게시판 리스트</MainRightContainerTitle>
              <BoardWrapper>
                <BoardRow isTitle={true}>
                  <BoardCell>글 번호</BoardCell>
                  <BoardCell>글 제목</BoardCell>
                  <BoardCell>작성자</BoardCell>
                  <BoardCell>작성 시간</BoardCell>
                </BoardRow>
                {data &&
                  data.map((row, index) => {
                    if (index < page * 8 && index >= (page - 1) * 8) {
                      return (
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
                      );
                    } else {
                      return null;
                    }
                  })}
              </BoardWrapper>
              <ButtonBox>
                <ButtonContainer
                  margin={"0vw 2vw 1vw 2vw"}
                  onClick={() =>
                    page > 1
                      ? setPage(page - 1)
                      : alert("첫 번째 페이지 입니다.")
                  }
                >
                  이전
                </ButtonContainer>
                <PageSpan>{page}</PageSpan>
                <ButtonContainer
                  margin={"0vw 2vw 1vw 2vw"}
                  onClick={() =>
                    page < Math.ceil(data.length / 8)
                      ? setPage(page + 1)
                      : alert("마지막 페이지 입니다.")
                  }
                >
                  다음
                </ButtonContainer>
              </ButtonBox>
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
                      {current.title}
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
                      <ButtonContainer onClick={() => deleteFunc(current.code)}>
                        삭제하기
                      </ButtonContainer>
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
                <CurrentTitleContainerEdit
                  type="text"
                  placeholder="제목을 입력하세요"
                  {...titleInput}
                />
                <WordCount bottom={"29vw"} right={"16vw"}>
                  {titleInput.value.length} / 30
                </WordCount>
                <CurrentContentContainerEdit
                  type="textarea"
                  placeholder="내용을 입력하세요"
                  {...contentInput}
                />
                <WordCount bottom={"9vw"} right={"16vw"}>
                  {contentInput.value.length} / 1000
                </WordCount>
                <ButtonBox>
                  {isLoggedIn && (
                    <ButtonContainer onClick={() => setMode(MAIN)}>
                      수정취소
                    </ButtonContainer>
                  )}
                  <ButtonContainer
                    type={"complete"}
                    onClick={() => {
                      editFunc(
                        current.code,
                        titleInput.value,
                        contentInput.value
                      );
                      setMode(MAIN);
                    }}
                  >
                    수정완료
                  </ButtonContainer>
                </ButtonBox>
              </BoardWrapper>
            </>
          )}
          {mode === CREATE && (
            <>
              <MainRightContainerTitle>글 작성</MainRightContainerTitle>
              <BoardWrapper>
                <CurrentTitleContainerEdit
                  type="text"
                  placeholder="제목을 입력하세요"
                  {...titleInput}
                ></CurrentTitleContainerEdit>
                <CurrentContentContainerEdit
                  placeholder="내용을 입력하세요"
                  {...contentInput}
                ></CurrentContentContainerEdit>
                <ButtonBox>
                  {isLoggedIn && (
                    <ButtonContainer onClick={() => setMode(MAIN)}>
                      취소하기
                    </ButtonContainer>
                  )}
                  <ButtonContainer
                    onClick={() => {
                      createFunc(
                        1,
                        "test",
                        titleInput.value,
                        contentInput.value
                      );
                      setMode(MAIN);
                    }}
                  >
                    완료하기
                  </ButtonContainer>
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
