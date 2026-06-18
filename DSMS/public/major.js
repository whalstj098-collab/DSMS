document.addEventListener("DOMContentLoaded", () => {
  // 전공 선택 dropdown
  const select = document.getElementById("major-select");

  if (!select) return;

  /*사용자 목록 서버에서 가져오기*/
  async function loadUsers() {
    const response = await fetch("/users");
    const users = await response.json();

    const list = document.getElementById("mentor-list");

    // 기존 목록 초기화
    list.innerHTML = "";

    const selectedMajor = select.value;

    // 사용자 반복 출력
    users.forEach((user) => {
      // 전공 정보 없는 경우 제외
      if (!user.major) return;

      // 필터 조건
      if (selectedMajor === "전체" || user.major === selectedMajor) {
        list.innerHTML += `
          <div class="mentor-card">

            <h3>${user.name}</h3>

            <p>전공: ${user.major}</p>

            <p>학년: ${user.grade}</p>

            <p>${user.intro}</p>

          </div>
        `;
      }
    });
  }

  // 전공 변경 시 다시 로딩
  select.addEventListener("change", loadUsers);

  // 최초 실행
  loadUsers();
});
