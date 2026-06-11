const select = document.getElementById("major-select"); // "major-select"라는 ID를 가진 요소를 가져와서 select 변수에 할당

async function loadMentors() {
  const response = await fetch("/mentors"); // "/mentors" 엔드포인트로 GET 요청을 보내서 멘토 목록을 가져옴
  const mentors = await response.json(); // 서버로부터 JSON 형식의 응답을 받아서 mentors 변수에 할당

  const selectedMajor = select.value; // select 요소에서 선택된 전공 값을 가져와서 selectedMajor 변수에 할당

  const list = document.getElementById("mentor-list"); // "mentor-list"라는 ID를 가진 요소를 가져와서 list 변수에 할당

  list.innerHTML = ""; // 멘토 목록을 초기화하여 이전 멘토를 제거

  mentors.forEach((mentor) => {
    if (selectedMajor === "전체" || mentor.major === selectedMajor) {
      list.innerHTML += `
        <div class="mentor-card">

          <h3>${mentor.name}</h3>

          <p>전공: ${mentor.major}</p>

          <p>학년: ${mentor.grade}</p>

          <p>${mentor.intro}</p>

        </div>
      `;
    }
  }); // mentors 배열을 반복하면서 각 멘토가 선택된 전공과 일치하거나 전체가 선택된 경우에만 멘토 정보를 HTML 카드 형식으로 만들어서 list 요소에 추가
}

select.addEventListener("change", loadMentors); // select 요소에 change 이벤트 리스너를 추가 사용자가 전공을 변경하면 loadMentors 함수가 실행되어 멘토 목록이 새로고침됨

loadMentors(); // 페이지가 로드될 때 멘토 목록을 가져와서 표시

// 로그인된 사용자 이름을 표시
const userName = localStorage.getItem("name"); // localStorage에서 "name"이라는 키로 저장된 값을 가져와서 userName 변수에 할당
document.getElementById("user-name").textContent = userName; // "user-name"이라는 ID를 가진 요소의 텍스트 콘텐츠를 userName으로 설정하여 로그인된 사용자 이름을 화면에 표시
