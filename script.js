// =========================
// 🔹 Firebase 認証対応 Signup
// =========================
document.addEventListener("DOMContentLoaded", () => {
  const signupBtn = document.getElementById("signupBtn");
  const sendPhoneCodeBtn = document.getElementById("sendPhoneCodeBtn");

  const emailInput = document.getElementById("contactEmail");
  const phoneInput = document.getElementById("contactPhone");
  const phoneCodeInput = document.getElementById("phoneCode");
  const usernameInput = document.getElementById("newUsername");
  const passwordInput = document.getElementById("newPassword");

  // Firebase Auth インスタンス
  const auth = firebase.auth();

  // ===== reCAPTCHA 初期化 =====
  window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container', {
    size: 'invisible', // ページに見せない場合 'invisible'
    callback: (response) => {
      console.log("reCAPTCHA solved");
    }
  });

  // ===== 電話番号確認コード送信 =====
  sendPhoneCodeBtn?.addEventListener("click", () => {
    const phone = phoneInput.value.trim();
    if (!phone) {
      alert("電話番号を入力してください");
      return;
    }

    const appVerifier = window.recaptchaVerifier;
    auth.signInWithPhoneNumber(phone, appVerifier)
      .then(confirmationResult => {
        window.confirmationResult = confirmationResult;
        alert("確認コードをSMSで送信しました");
      })
      .catch(error => {
        console.error(error);
        alert("SMS送信エラー: " + error.message);
      });
  });

  // ===== 登録ボタン =====
  signupBtn?.addEventListener("click", () => {
    const email = emailInput.value.trim();
    const phone = phoneInput.value.trim();
    const phoneCode = phoneCodeInput.value.trim();
    const username = usernameInput.value.trim();
    const password = passwordInput.value.trim();

    if (!username || !password) {
      alert("ユーザーネームとパスワードは必須です");
      return;
    }

    // メールで登録する場合
    if (email) {
      auth.createUserWithEmailAndPassword(email, password)
        .then(userCredential => {
          // メール認証送信
          userCredential.user.sendEmailVerification()
            .then(() => {
              alert("登録完了！確認メールを送信しました。ログインしてください。");
              window.location.href = "../Login/"; // ログインページに遷移
            });
        })
        .catch(error => {
          console.error(error);
          alert("メール登録エラー: " + error.message);
        });
      return;
    }

    // 電話番号で登録する場合
    if (phone) {
      if (!phoneCode) {
        alert("電話番号確認コードを入力してください");
        return;
      }
      window.confirmationResult.confirm(phoneCode)
        .then(result => {
          alert("電話番号認証完了！ログインページに進みます。");
          window.location.href = "../Login/";
        })
        .catch(error => {
          console.error(error);
          alert("確認コードが正しくありません: " + error.message);
        });
      return;
    }

    alert("メールアドレスまたは電話番号のどちらかを入力してください");
  });
});