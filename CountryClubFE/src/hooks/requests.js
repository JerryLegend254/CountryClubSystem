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

export async function httpGetAllSportsplans() {
  return fetch(`${API_URL}/sportsplan`)
}