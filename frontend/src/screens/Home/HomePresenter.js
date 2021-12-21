import React from "react";
import styled from "styled-components";
import { Footer } from "../../components/screenComponents/Footer";
import { Header } from "../../components/screenComponents/Header";
import { LeftContainer } from "../../components/screenComponents/LeftContainer";
import { RightContainer } from "../../components/screenComponents/RightContainer";

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
export const HomePresenter = ({
  isLoggedIn,
  current,
  setCurrent,
  setIsLoggedIn,
  prevMode,
  setPrevMode,
  setMode,
  setPage,
  idInput,
  passwordInput,
  data,
  me,
  mode,
  userData,
  page,
  nameInput,
  createFunc,
  editFunc,
  deleteFunc,
  getUserFunc,
  loginFunc,
  signupFunc,
  titleInput,
  contentInput,
}) => {
  return (
    <Wrapper>
      <Header setMode={setMode} />
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
            titleInput={titleInput}
            contentInput={contentInput}
          />
        </MainRightContainer>
      </MainContainer>
      <Footer />
    </Wrapper>
  );
};
