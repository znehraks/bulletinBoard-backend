import React from "react";
import {
  ButtonBox,
  ButtonContainer,
  AuthContainer,
  AuthInputContainer,
  AuthInputTitle,
  AuthInput,
} from "../../styles/styledComponents";
import { LOGIN } from "../Enum";
import PropTypes from "prop-types";
export const SignupMode = ({
  nameInput,
  idInput,
  passwordInput,
  signupFunc,
  setMode,
}) => {
  return (
    <AuthContainer>
      <AuthInputContainer>
        <AuthInputTitle>이름:</AuthInputTitle>
        <AuthInput type="text" placeholder="이름 입력" {...nameInput} />
      </AuthInputContainer>
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
            signupFunc(nameInput.value, idInput.value, passwordInput.value);
          }}
        >
          완료
        </ButtonContainer>
        <ButtonContainer
          onClick={() => {
            setMode(LOGIN);
          }}
        >
          로그인하기
        </ButtonContainer>
      </ButtonBox>
    </AuthContainer>
  );
};

SignupMode.propTypes = {
  nameInput: PropTypes.object.isRequired,
  idInput: PropTypes.object.isRequired,
  passwordInput: PropTypes.object.isRequired,
  signupFunc: PropTypes.func.isRequired,
  setMode: PropTypes.func.isRequired,
};
