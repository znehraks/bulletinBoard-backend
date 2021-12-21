import React, { useEffect, useState } from "react";
import useInput from "../../components/hooks/useInput";
import { Api } from "../../api";
import { LOGIN, MAIN } from "../../components/screenComponents/Enum";
import { HomePresenter } from "./HomePresenter";

const HomeContainer = () => {
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
    <HomePresenter
      isLoggedIn={isLoggedIn}
      current={current}
      setCurrent={setCurrent}
      setIsLoggedIn={setIsLoggedIn}
      setData={setData}
      setMe={setMe}
      prevMode={prevMode}
      setPrevMode={setPrevMode}
      setMode={setMode}
      setUserData={setUserData}
      setRenderToken={setRenderToken}
      setPage={setPage}
      idInput={idInput}
      passwordInput={passwordInput}
      data={data}
      me={me}
      mode={mode}
      userData={userData}
      page={page}
      nameInput={nameInput}
      createFunc={createFunc}
      editFunc={editFunc}
      deleteFunc={deleteFunc}
      getUserFunc={getUserFunc}
      loginFunc={loginFunc}
      signupFunc={signupFunc}
    />
  );
};

export default HomeContainer;
