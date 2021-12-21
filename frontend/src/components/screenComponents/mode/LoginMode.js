import React from "react";
import {
  ButtonBox,
  ButtonContainer,
  AuthContainer,
  AuthInputContainer,
  AuthInputTitle,
  AuthInput,
} from "../../styles/styledComponents";
import { SIGNUP } from "../Enum";
import PropTypes from "prop-types";

export const LoginMode = ({ idInput, passwordInput, loginFunc, setMode }) => {
  return (
    <AuthContainer>
      <AuthInputContainer>
        <AuthInputTitle>아이디:</AuthInputTitle>
        <AuthInput type="text" placeholder="아이디 입력" {...idInput} />
      </AuthInputContainer>
      <AuthInputContainer>
        <AuthInputTitle>비밀번호:</AuthInputTitle>
        <AuthInput
          type="password"
          placeholder="비밀번호 입력"
          {...passwordInput}
        />
      </AuthInputContainer>
      <ButtonBox>
        <ButtonContainer
          onClick={() => {
            loginFunc(idInput.value, passwordInput.value);
          }}
        >
          로그인
        </ButtonContainer>
        <ButtonContainer
          onClick={() => {
            setMode(SIGNUP);
          }}
        >
          회원가입
        </ButtonContainer>
      </ButtonBox>
    </AuthContainer>
  );
};

LoginMode.propTypes = {
  idInput: PropTypes.object.isRequired,
  passwordInput: PropTypes.object.isRequired,
  loginFunc: PropTypes.func.isRequired,
  setMode: PropTypes.func.isRequired,
};
