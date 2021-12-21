import React from "react";
import { CREATE, DETAIL, EDIT, LOGIN, MAIN, PROFILE, SIGNUP } from "./Enum";
import { CreateMode } from "./mode/CreateMode";
import { DetailMode } from "./mode/DetailMode";
import { EditMode } from "./mode/EditMode";
import { LoginMode } from "./mode/LoginMode";
import { MainMode } from "./mode/MainMode";
import { ProfileMode } from "./mode/ProfileMode";
import { SignupMode } from "./mode/SignupMode";
import PropTypes from "prop-types";
export const RightContainer = ({
  data,
  me,
  page,
  setPage,
  setCurrent,
  mode,
  setMode,
  current,
  isLoggedIn,
  titleInput,
  contentInput,
  deleteFunc,
  prevMode,
  editFunc,
  createFunc,
  userData,
  setPrevMode,
  nameInput,
  idInput,
  passwordInput,
  signupFunc,
  loginFunc,
}) => {
  return (
    <>
      {mode === MAIN && (
        <MainMode
          isLoggedIn={isLoggedIn}
          me={me}
          setMode={setMode}
          titleInput={titleInput}
          contentInput={contentInput}
          setPage={setPage}
          page={page}
          data={data}
          setCurrent={setCurrent}
        />
      )}
      {mode === DETAIL && (
        <DetailMode
          setCurrent={setCurrent}
          setMode={setMode}
          prevMode={prevMode}
          current={current}
          isLoggedIn={isLoggedIn}
          titleInput={titleInput}
          contentInput={contentInput}
          deleteFunc={deleteFunc}
        />
      )}
      {mode === EDIT && current.code !== -1 && (
        <EditMode
          titleInput={titleInput}
          contentInput={contentInput}
          isLoggedIn={isLoggedIn}
          setMode={setMode}
          editFunc={editFunc}
          current={current}
        />
      )}
      {mode === CREATE && (
        <CreateMode
          titleInput={titleInput}
          contentInput={contentInput}
          isLoggedIn={isLoggedIn}
          setMode={setMode}
          createFunc={createFunc}
          setPage={setPage}
          me={me}
        />
      )}
      {mode === PROFILE && userData.length !== 0 && (
        <ProfileMode
          userData={userData}
          setCurrent={setCurrent}
          setPrevMode={setPrevMode}
          me={me}
          mode={mode}
          isLoggedIn={isLoggedIn}
          setMode={setMode}
        />
      )}
      {mode === SIGNUP && (
        <SignupMode
          nameInput={nameInput}
          idInput={idInput}
          passwordInput={passwordInput}
          signupFunc={signupFunc}
          setMode={setMode}
        />
      )}
      {mode === LOGIN && (
        <LoginMode
          idInput={idInput}
          passwordInput={passwordInput}
          loginFunc={loginFunc}
          setMode={setMode}
        />
      )}
    </>
  );
};

RightContainer.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  me: PropTypes.object.isRequired,
  page: PropTypes.number.isRequired,
  setPage: PropTypes.func.isRequired,
  setCurrent: PropTypes.func.isRequired,
  mode: PropTypes.string.isRequired,
  setMode: PropTypes.func.isRequired,
  current: PropTypes.object.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  titleInput: PropTypes.object.isRequired,
  contentInput: PropTypes.object.isRequired,
  deleteFunc: PropTypes.func.isRequired,
  prevMode: PropTypes.string.isRequired,
  editFunc: PropTypes.func.isRequired,
  createFunc: PropTypes.func.isRequired,
  userData: PropTypes.arrayOf(PropTypes.object).isRequired,
  setPrevMode: PropTypes.func.isRequired,
  nameInput: PropTypes.object.isRequired,
  idInput: PropTypes.object.isRequired,
  passwordInput: PropTypes.object.isRequired,
  signupFunc: PropTypes.func.isRequired,
  loginFunc: PropTypes.func.isRequired,
};
