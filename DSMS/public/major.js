const select = document.getElementById("major-select"); // 전공 선택 드롭다운 요소를 가져와서 select 변수에 저장

// 로그인된 사용자 이름 표시
const userName = localStorage.getItem("name"); // localStorage에 저장된 사용자 이름을 가져옴

const userNameElement = document.getElementById("user-name"); // user-name이라는 id를 가진 요소를 가져옴

// user-name 요소가 존재할 때만 이름 표시
if (userNameElement) {
  userNameElement.textContent = userName || "게스트";
}

// 사용자 목록 불러오기
async function loadUsers() {
  const response = await fetch("/users"); // 서버에 사용자 목록 요청

  const users = await response.json(); // JSON 데이터를 users 변수에 저장

  const list = document.getElementById("mentor-list"); // 멘토 목록을 표시할 영역 가져오기

  list.innerHTML = ""; // 기존 목록 제거

  const selectedMajor = select.value; // 현재 선택된 전공 가져오기

  users.forEach((user) => {
    // 전공 정보가 없는 사용자는 건너뜀
    if (!user.major) {
      return;
    }

    // 전체 선택이거나 전공이 일치하는 경우만 출력
    if (selectedMajor === "전체" || user.major === selectedMajor) {
      list.innerHTML += `
    <div class="mentor-card">

      <h3>${user.name}</h3>

      <p>전공: ${user.major}</p>

      <p>학년: ${user.grade}</p>

      <p>${user.intro}</p>

    </div>`;
    }
  });
}

// 사용자가 전공을 변경하면 목록 다시 불러오기
select.addEventListener("change", loadUsers);

// 페이지가 처음 열릴 때 사용자 목록 표시
loadUsers();
