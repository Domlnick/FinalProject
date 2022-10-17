import './css/App.css';
import './css/User.css';
import './css/Searching.css'
import { UploadArea, Ad_banner } from './Routes/Main.js';
import Result from './Routes/Result.js';
import { Header } from './Components/Header.js';
import { Routes, Route } from "react-router-dom";
import { Login, Register, FindId, FindPw, ResetPw, ShowId } from './Routes/User.js';
import Searching from './Routes/Searching';

// 주석 용도 내용 전달
// 기능 설명
// 10/12 해야 할 일
// 1. 회원가입 / 로그인 / 아이디찾기 / 비밀번호 찾기 / 비밀번호재설정 페이지
// 1.1 input value backend로 보내기 구현
// 1.2 input value - length == 0 이면 버튼 비활성화
// 2 회원가입 / 비밀번호 재설정 페이지 - pw & repw 일치 여부
// 2.1 pw - pattern을 통해 특수문자, 알파벳 대문자 포함여부 확인
// 2.2 강력 / 안전 / 위험 UI 설계
// 3. OAuth2
// 

function App() {
  return (
    <div className="App">

      <Routes>
        <Route path="/" element={
          <>
            <Header />
            <UploadArea />
            <Ad_banner />
          </>
        } />

        <Route path="/searching" element={
          <>
            <Searching />
          </>
        } />
        <Route path="/result" element={
          <>
            <Header />
            <Result />
          </>
        } />

        <Route path="/login" element={
          <>
            <Login />
          </>
        } />

        <Route path="/register" element={
          <>
            <Register />
          </>
        } />

        <Route path="/findid" element={
          <>
            <FindId />
          </>
        } />

        <Route path="/findpw" element={
          <>
            <FindPw />
          </>
        } />
        <Route path="/resetpw" element={
          <>
            <ResetPw />
          </>
        } />

        <Route path="/showid" element={
          <>
            <ShowId />
          </>
        } />
      </Routes>

    </div>
  );
}

export default App;

