import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Api } from "../../api";
import { Footer } from "../../components/screenComponents/Footer";
import { Header } from "../../components/screenComponents/Header";
import useInput from "../../components/hooks/useInput";
import { LeftContainer } from "../../components/screenComponents/LeftContainer";
import { RightContainer } from "../../components/screenComponents/RightContainer";
import { LOGIN, MAIN } from "../../components/screenComponents/Enum";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  background: ${(props) => props.theme.bgColor};
  width: 100vw;
  height: 100vh;
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
const MainRightContainer = styled.div`
  flex: 6;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: ${(props) => props.theme.ContainerColor};
  height: 100%;
`;
const Home = () => {
  const [current, setCurrent] = useState({
    code: -1,
    title: "",
    content: "",
    img_url: "",
    author: "",
    created_at: "",
    is_mine: false,
  });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [data, setData] = useState([]);
  const [me, setMe] = useState({
    code: "",
    user_id: "",
  });
  const [prevMode, setPrevMode] = useState(MAIN);
  const [mode, setMode] = useState(MAIN);
  const [userData, setUserData] = useState([]);
  const [renderToken, setRenderToken] = useState(true);
  const [page, setPage] = useState(1);
  const titleInput = useInput("");
  const contentInput = useInput("");
  const nameInput = useInput("");
  const idInput = useInput("");
  const passwordInput = useInput("");

  if (titleInput.value.length >= 31) {
    titleInput.setValue(titleInput.value.slice(0, 30));
  }
  if (contentInput.value.length >= 1001) {
    contentInput.setValue(contentInput.value.slice(0, 1000));
  }
  //onClick 함수 정리
  //UI 어색한 부분 수정
  //컴포넌트 분리
  //디자인패턴 적용

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
          setCurrent({ code: -1 });
          setMode(prevMode);
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

  const getUserFunc = async () => {
    await Api.getUser()
      .then((res) => {
        if (res.data.success === false) return;
        console.log(res);
        setUserData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getMeFunc = async () => {
    await Api.getMe()
      .then((res) => {
        if (res.data.success === false) return;
        setMe({ code: res.data.code, user_id: res.data.user_id });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const loginFunc = async (user_id, user_password) => {
    await Api.login(user_id, user_password)
      .then((res) => {
        const {
          data: { token },
        } = res;
        if (token) {
          localStorage.setItem("token", token);
          getMeFunc();
          idInput.setValue("");
          passwordInput.setValue("");
          setIsLoggedIn(true);
          setMode(MAIN);
        }
      })
      .catch((err) => console.log(err));
  };
  const signupFunc = async (user_name, user_id, user_password) => {
    await Api.signUp(user_name, user_id, user_password)
      .then((res) => {
        console.log(res);
        alert("회원가입 성공!");
        idInput.setValue(user_id);
        passwordInput.setValue(user_password);
        setMode(LOGIN);
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    getAllFunc();
  }, [renderToken]);

  return (
    <Wrapper>
      <Header
        setMode={setMode}
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
      />
      <MainContainer>
        <LeftContainer
          mode={mode}
          isLoggedIn={isLoggedIn}
          setPrevMode={setPrevMode}
          setMode={setMode}
          getUserFunc={getUserFunc}
        />
        <MainRightContainer>
          {/*Props 지옥 */}
          <RightContainer
            data={data}
            me={me}
            page={page}
            setPage={setPage}
            mode={mode}
            setCurrent={setCurrent}
            setMode={setMode}
            current={current}
            isLoggedIn={isLoggedIn}
            titleInput={titleInput}
            contentInput={contentInput}
            deleteFunc={deleteFunc}
            prevMode={prevMode}
            editFunc={editFunc}
            createFunc={createFunc}
            userData={userData}
            setPrevMode={setPrevMode}
            nameInput={nameInput}
            idInput={idInput}
            passwordInput={passwordInput}
            signupFunc={signupFunc}
            loginFunc={loginFunc}
          />
        </MainRightContainer>
      </MainContainer>
      <Footer />
    </Wrapper>
  );
};

export default Home;
