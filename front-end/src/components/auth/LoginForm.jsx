import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import styled from 'styled-components';

const AuthFormContainer = styled.form`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 100%;
`;

const StyledTitle = styled.p`
  font-size: 2.4vh;
  font-weight: bold;
  margin-bottom: 4vh;
`;

const StyledInput = styled.input`
  width: 90%;
  height: 6vh;
  font-size: 2vh;
  border-radius: 6px;
  border: 1px solid #b9b9b9;
  padding: 1vh;
  margin-bottom: 2vh;
  box-sizing: border-box;
`;

const StyledButton = styled.button`
  background-color: black;
  color: white;
  width: 90%;
  height: 6vh;
  font-size: 2vh;
  border-radius: 6px;
  margin-bottom: 2vh;
  box-sizing: border-box;
  border: none;
  &:hover {
    cursor: pointer;
  }
`;

const AuthForm = () => {
  const [userMail, setUserMail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();

    if (!userMail || !password) {
      alert('아이디와 비밀번호를 입력하세요.');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userMail, password }),
      });

      if (response.ok) {
        const data = await response.json();
        sessionStorage.setItem('userMail', userMail);
        navigate('/main');
      } else {
        const errMsg = await response.text();
        alert(errMsg || '로그인 실패: 아이디 또는 비밀번호를 확인하세요.');
      }
    } catch (err) {
      console.error('로그인 오류:', err);
      alert('서버와의 통신 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthFormContainer onSubmit={handleLogin}>
      <StyledTitle>로그인</StyledTitle>
      <StyledInput
        type="email"
        placeholder="Email@domain.com"
        onChange={(e) => setUserMail(e.target.value)}
      />
      <StyledInput
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <StyledButton type="submit" disabled={isLoading}>
        {isLoading ? '로그인 중...' : '로그인'}
      </StyledButton>

    </AuthFormContainer>
  );
};

export default AuthForm;
