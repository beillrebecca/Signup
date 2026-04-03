// =========================
// 🔹 新規登録処理（Signup）
// =========================
document.addEventListener("DOMContentLoaded", () => {
  const signupBtn = document.getElementById("signupBtn");

  if(signupBtn){
    signupBtn.addEventListener("click", () => {
      const contact = document.getElementById("contact").value.trim();
      const user = document.getElementById("newUsername").value.trim();
      const pass = document.getElementById("newPassword").value.trim();

      if(contact && user && pass){
        // オブジェクトにまとめて保存
        const newUser = {
          contact: contact,
          username: user,
          password: pass
        };

        // localStorageにJSON文字列で保存
        localStorage.setItem("loginUserData", JSON.stringify(newUser));

        alert("登録完了！ログインしてください");
        location.href = "../Login/"; // Loginページへのリンク
      } else {
        alert("全て入力してください");
      }
    });
  }
});
