document.addEventListener("DOMContentLoaded", () => {
  const signupBtn = document.getElementById("signupBtn");
  const sendPhoneCodeBtn = document.getElementById("sendPhoneCodeBtn");

  let confirmationResult = null; // SMSコード確認用

  // 🔹 電話番号に確認コード送信
  sendPhoneCodeBtn?.addEventListener("click", () => {
    const phoneNumber = document.getElementById("contactPhone").value.trim();
    if (!phoneNumber) {
      alert("電話番号を入力してください");
      return;
    }

    // reCAPTCHA
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container', {
      'size': 'invisible'
    });

    firebase.auth().signInWithPhoneNumber(phoneNumber, window.recaptchaVerifier)
      .then((result) => {
        confirmationResult = result;
        alert("確認コードをSMSで送信しました");
      })
      .catch((error) => {
        console.error(error);
        alert("SMS送信エラー：" + error.message);
      });
  });

  // 🔹 登録ボタン
  signupBtn?.addEventListener("click", () => {
    const email = document.getElementById("contactEmail").value.trim();
    const phoneCode = document.getElementById("phoneCode").value.trim();
    const username = document.getElementById("newUsername").value.trim();
    const password = document.getElementById("newPassword").value.trim();

    if (!email || !username || !password || !phoneCode) {
      alert("全ての項目を入力してください");
      return;
    }

    // SMS確認コード検証
    confirmationResult.confirm(phoneCode)
      .then((phoneUser) => {
        // 電話番号認証成功
        // 🔹 メールアドレスでの登録
        firebase.auth().createUserWithEmailAndPassword(email, password)
          .then((userCredential) => {
            const user = userCredential.user;
            user.updateProfile({ displayName: username });
            user.sendEmailVerification()
              .then(() => {
                alert("登録完了！メールと電話番号の確認が完了しました。");
                location.href = "../Login/";
              });
          })
          .catch((error) => {
            console.error(error);
            alert("メール登録エラー：" + error.message);
          });
      })
      .catch((error) => {
        console.error(error);
        alert("電話番号確認コードが間違っています：" + error.message);
      });
  });
});