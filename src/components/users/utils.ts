const emailCheck = (email: string): boolean => {
  const emailExp = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+/i;
  return emailExp.test(email) ? true : false;
};

const passwordCheck = (password: string): boolean => {
  const passwordExp = /^(?=.*\d)(?=.*[A-Za-z])(?=.*[!@#$%^*()\-_=+\\\|\[\]{};:\'",.<>\/?])*.{8,}$/;
  return passwordExp.test(password) ? true : false;
};

const passwordMatch = (password: string, checkpw: string): boolean => {
  return password === checkpw ? true : false;
};

const usernameCheck = (username: string): boolean => {
  const usernameExp = /^[A-Za-z0-9]{6,12}$/;
  return usernameExp.test(username) ? true : false;
};

export const checkInput = (
  email: string,
  password: string,
  checkpw: string,
  username: string,
): boolean | void => {
  if (emailCheck(email)) {
    if (passwordCheck(password)) {
      if (passwordMatch(password, checkpw)) {
        if (usernameCheck(username)) {
          return true;
        }
        return alert(
          `닉네임을 확인해주세요.\n6~12자리의 영문, 숫자 조합이어야 합니다.`,
        );
      }
      return alert(`동일한 비밀번호를 입력해주세요.`);
    }
    return alert(
      `비밀번호를 확인해주세요.\n8자 이상의 영문, 숫자 또는 특수문자 조합이어야 합니다.`,
    );
  }
  return alert('이메일을 확인해주세요.');
};
