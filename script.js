document.addEventListener("DOMContentLoaded", () => {
  const signupBtn = document.getElementById("signupBtn");
  const contactInput = document.getElementById("contact");
  const passwordInput = document.getElementById("password");
  const passwordConfirmInput = document.getElementById("passwordConfirm");

  const auth = firebase.auth();

  // reCAPTCHA 初期化（電話番号用）
  window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container', {
    size: 'invisible'
  });

  signupBtn?.addEventListener("click", () => {
    const contact = contactInput.value.trim();
    const password = passwordInput.value.trim();
    const passwordConfirm = passwordConfirmInput.value.trim();

    if (!contact || !password || !passwordConfirm) {
      alert("全ての項目を入力してください");
      return;
    }

    if (password !== passwordConfirm) {
      alert("パスワードが一致しません");
      return;
    }

    // メールアドレス登録
    if (contact.includes("@")) {
  auth.createUserWithEmailAndPassword(contact, password)
    .then(userCredential => {
      const user = userCredential.user;

      // 🔥 これ追加
      sessionStorage.setItem("verificationType", "email");

      return user.sendEmailVerification();
    })
    .then(() => {
      alert("登録完了！確認メールを送信しました。");
      window.location.href = "/Verify/index.html";
    })
    .catch(error => {
      console.error("エラー内容:", error);
      alert("エラー: " + error.message);
    });
  return;
}

    // 電話番号登録
    const appVerifier = window.recaptchaVerifier;
    auth.signInWithPhoneNumber(contact, appVerifier)
  .then(confirmationResult => {
    window.confirmationResult = confirmationResult;

    // 🔥 追加
    sessionStorage.setItem("phoneNumber", contact);
    sessionStorage.setItem("verificationType", "phone");

    alert("SMSで確認コードを送信しました。verifyページで入力してください。");
    window.location.href = "/Verify/index.html";
  })
      .catch(error => {
        console.error(error);
        alert("電話番号登録エラー: " + error.message);
      });
  });
});