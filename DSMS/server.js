const jwt = require("jsonwebtoken"); // JSON Web Token을 사용하기 위해 jsonwebtoken 모듈을 가져옴
const express = require("express"); // Express 프레임워크를 사용하기 위해 express 모듈을 가져옴
const fs = require("fs"); // 파일 시스템 모듈을 사용하기 위해 fs 모듈을 가져옴

const app = express(); // Express 애플리케이션을 생성하여 app 변수에 할당

app.use(express.json()); // JSON 데이터 받기

app.use(express.static("public")); // public 폴더 사용

// 회원가입
app.post("/signup", (req, res) => {
  const { name, email, password } = req.body; // 요청 본문에서 name, email, password를 추출하여 변수에 할당

  const users = JSON.parse(fs.readFileSync("users.json", "utf8")); // "users.json" 파일을 읽어서 JSON 형식으로 파싱하여 users 변수에 할당

  users.push({
    // users 배열에 새로운 사용자를 추가
    name,
    email,
    password,
  });

  fs.writeFileSync("users.json", JSON.stringify(users, null, 2)); // users 배열을 JSON 문자열로 변환하고 "users.json" 파일에 저장

  res.json({
    // 회원가입 성공 응답을 JSON 형식으로 반환
    success: true,
    message: "회원가입 완료",
  });
});
// 로그인
app.post("/login", (req, res) => {
  const { email, password } = req.body; // 요청 본문에서 email과 password를 추출하여 변수에 할당

  const users = JSON.parse(fs.readFileSync("users.json", "utf8")); // "users.json" 파일을 읽어서 JSON 형식으로 파싱하여 users 변수에 할당

  const user = users.find((u) => u.email === email && u.password === password); // users 배열에서 email과 password가 일치하는 사용자를 찾아서 user 변수에 할당

  if (user) {
    const token = jwt.sign(
      // JWT 토큰을 생성하기 위해 jwt.sign 함수를 호출
      {
        email: user.email,
        name: user.name,
      },
      "dsms-secret-key", // JWT를 서명하기 위한 비밀 키
      {
        expiresIn: "1h", // JWT 토큰의 유효 기간을 1시간으로 설정
      },
    ); // JWT 토큰을 생성하여 token 변수에 할당, payload에는 email과 name을 포함 및 1시간 동안 유효하도록 설정

    res.json({
      success: true,
      token: token,
      name: user.name,
    }); // 로그인 성공 시 JWT 토큰을 응답으로 반환
  } else {
    res.json({
      success: false,
      message: "이메일 또는 비밀번호가 틀렸습니다.",
    });
  }
});
// 질문 등록
app.post("/message", (req, res) => {
  const { user, major, message } = req.body; // 요청 본문에서 user, major와 message를 추출하여 변수에 할당

  const messages = JSON.parse(fs.readFileSync("messages.json", "utf8")); // "messages.json" 파일을 읽어서 JSON 형식으로 파싱하여 messages 변수에 할당
  messages.push({
    // messages 배열에 새로운 메시지를 추가
    user,
    major,
    message,
    time: new Date().toLocaleString("ko-KR"),
    reply: "",
  }); // messages 배열에 새로운 메시지를 추가, time에는 현재 시간을 한국 시간 형식으로 저장, reply는 빈 문자열로 초기화

  fs.writeFileSync("messages.json", JSON.stringify(messages, null, 2)); // messages 배열을 JSON 문자열로 변환하고 "messages.json" 파일에 저장

  res.json({
    message: "질문이 등록되었습니다.",
  });
});
app.get("/messages", (req, res) => {
  const messages = JSON.parse(fs.readFileSync("messages.json", "utf8")); // "messages.json" 파일을 읽어서 JSON 형식으로 파싱하여 messages 변수에 할당

  res.json(messages); // messages 배열을 JSON 형식으로 응답으로 반환
});

// 멘토 답변 등록
app.post("/reply", (req, res) => {
  // "/reply" 엔드포인트로 POST 요청이 들어오면 이 함수가 실행
  const { index, reply } = req.body; // 요청 본문에서 index와 reply를 추출하여 변수에 할당

  const messages = JSON.parse(fs.readFileSync("messages.json", "utf8")); // "messages.json" 파일을 읽어서 JSON 형식으로 파싱하여 messages 변수에 할당

  messages[index].reply = reply; // messages 배열에서 index에 해당하는 메시지의 reply 필드에 멘토 답변을 저장

  fs.writeFileSync("messages.json", JSON.stringify(messages, null, 2)); // messages 배열을 JSON 문자열로 변환하고 "messages.json" 파일에 저장

  res.json({
    success: true, // 멘토 답변 등록 성공 응답을 JSON 형식으로 반환
    message: "답변이 등록되었습니다.",
  });
});

//서버 실행
app.listen(3000, () => {
  console.log("DSMS 서버 실행 중");
});
