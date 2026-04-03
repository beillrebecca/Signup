document.addEventListener("DOMContentLoaded", () => {
  const signupBtn = document.getElementById("signupBtn");

  signupBtn?.addEventListener("click", () => {
    const contact = document.getElementById("contact").value.trim();
    const password = document.getElementById("password").value.trim();
    const passwordConfirm = document.getElementById("passwordConfirm").value.trim();

    // 入力チェック
    if (!contact || !password || !passwordConfirm) {
      alert("全て入力してください");
      return;
    }

    if (password !== passwordConfirm) {
      alert("パスワードが一致しません");
      return;
    }

    // Firebase登録
    firebase.auth().createUserWithEmailAndPassword(contact, password)
      .then((userCredential) => {
        userCredential.user.sendEmailVerification()
          .then(() => {
            alert("確認メールを送信しました！");
            location.href = "../Verify/";
          });
      })
      .catch((error) => {
        console.error(error);
        alert(error.message);
      });
  });
});