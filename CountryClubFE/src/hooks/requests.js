const API_URL = 'http://localhost:8000';

// export async function httpEmailSignUp(credentails) {
//   try {
//     return await fetch(`${API_URL}/auth/signup`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(credentails),
//     });
//   } catch (err){
//     return {
//       ok: false,
//       error: err
//     }
//   }
// }

export async function httpEmailSignUp(credentails) {
  return fetch(`${API_URL}/auth/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentails),
  });
}

export async function httpGet2FA(requestBody) {
  return fetch(`${API_URL}/send-otp`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(requestBody),
  });
}

export async function httpGetAllSportsplans() {
  try {
    const res = await fetch(`${API_URL}/sportsplan`);
    const data = res.json();
    return data;
  } catch (err) {
    return err;
  }
}

export async function httpGetAllPayments() {
  try {
    const res = await fetch(`${API_URL}/payment`);
    const data = res.json();
    return data;
  } catch (err) {
    return err;
  }
}

export async function httpGetAllMembers() {
  try {
    const res = await fetch(`${API_URL}/auth/users`);
    const data = res.json();
    return data;
  } catch (err) {
    return err;
  }
}

export async function httpAddToMySportsplans({ amount, userId, plan }) {
  const convertAmt = Number(amount);
  try {
    const res = await fetch(`${API_URL}/payment`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ sportplanId: plan, userId, price: convertAmt, paymentDate: new Date() }),
    });
    const data = res.json();
    return data;
  } catch (err) {
    return err;
  }
}

export async function httpAddSportsplan({ spn, amount }) {
  const convertAmt = Number(amount);
  try {
    const res = await fetch(`${API_URL}/sportsplan`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: spn, price: convertAmt }),
    });
    const data = res.json();
    return data;
  } catch (err) {
    return err;
  }
}
