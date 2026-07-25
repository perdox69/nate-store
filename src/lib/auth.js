function normalizeEmail(email) {
  return email.trim().toLowerCase();
}

function publicMember(account) {
  return {
    id: account.id,
    name: account.name,
    email: account.email
  };
}

export function createMemberAccount({ accounts, name, email, password }) {
  const cleanName = name.trim();
  const cleanEmail = normalizeEmail(email);
  const cleanPassword = password.trim();

  if (!cleanName || !cleanEmail || !cleanPassword) {
    throw new Error('กรุณากรอกข้อมูลให้ครบ');
  }

  if (cleanPassword.length < 6) {
    throw new Error('รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร');
  }

  if (accounts.some((account) => account.email === cleanEmail)) {
    throw new Error('อีเมลนี้สมัครสมาชิกแล้ว');
  }

  const account = {
    id: `MEM-${Date.now()}`,
    name: cleanName,
    email: cleanEmail,
    password: cleanPassword
  };

  return {
    accounts: [...accounts, account],
    member: publicMember(account)
  };
}

export function loginMemberAccount({ accounts, email, password }) {
  const cleanEmail = normalizeEmail(email);
  const cleanPassword = password.trim();
  const account = accounts.find((entry) => entry.email === cleanEmail && entry.password === cleanPassword);

  if (!account) {
    throw new Error('อีเมลหรือรหัสผ่านไม่ถูกต้อง');
  }

  return publicMember(account);
}
