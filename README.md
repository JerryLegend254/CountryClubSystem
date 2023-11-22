# CountryClubSystem
A full-stack reactjs-nodejs application for a country-club management system

To set up the project:
1. Make sure you have yarn installed globally on your system by running:
npm install --global yarn
2. Install backend and frontend dependencies by runnning:
npm run install
3. Build the frontend and start backend server by running:
npm run deploy
4. Add firebase admin sdk on the backend manually in CountryClubBE/src/firebase create a new file called firebase-adm-sdk.json and paste the code below
   {
  "type": "service_account",
  "project_id": "country-club-2974d",
  "private_key_id": "c6ced8854d167420acce77fc5d5865bb0c524497",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQC6ciIdyCLEqj7r\nLm79jQPUyEQ5rpSroCsMeNOsV01jO0umYelJgV2jT5AN0nWcyaUX39Hz6urojmxn\n4484Jwls0O0bQFl+FantJvl4Axs5GwN0ZhNdaaS6LgrxgpSRl4MdVzPIR46226lx\n1O+E5KBgAy8K+gqy0Y+S/3kbnmh6HSWpanUG+hFi7YFQ3qMGpxWJfSkZ6D42xyV5\nVwXZ5VHm7Gok8dmhHfbYvpWQSMSUr5GgKXx6JTM+4No3Gzs5q3WpdJ8vXZlZwdJ4\nAZ2q6iGXaZrgkMf0GePyxkHyCHk284UhRAU0r6BYEpHuSK6UK1k9k4XFDQ7Zx2jQ\nB3QahxKjAgMBAAECggEAWOlWtaccVXbufE7vZQCbZByA1JUZluLRxKfWIaicYgcD\n43trub70fY3Sn5TOu485qLH2uIA9t9s7fSt6wAd1qivT9pvwUX1ZRJvCeeXZVJk6\nQ4buEyzu/k44r8VavjdnslVEf20IdNE58+vcsR4qEL9T7sMg2PewpSQph+852Yk+\nOr4+qIw4NwFXnlVEdfQIDlbzYCgdEIorR2zh4OwiCTYp3HPPFX5CBeDxsxss+Er0\nUOZw3ooEd8mbsBR6GvQkOTfcWMmqt7UxbG4pz/8BMwlxuTAdBM+daLvF0zMFooQ+\n4a7tM4rvoNyXaWiTSbV2s4bAP+z0tl19HXD6ethnEQKBgQDkT6ttQxlq+4TvSR1G\n6vtoVQAxrrO78r2xQUnYUjDpD3W1/ySdASUrKr2xUNxoxHT5nc2s8cCJLYbUxbul\n5Kuo+hHb4OOylgfbTDXHO/LyDm2dSW5njC6GpEW6Ey2Yj2pF8mqV5Dm7moPznu+O\nigMHaRjagXo/UXKnWkAgpWcDiwKBgQDRDq2Uaw2SlFD7me/H9cH05Djuvk8lFdpb\nIfEraxnVX1aA4cryc3Mm2Mc8sjD/DWB9UsxgUAnhjGhaHBwT+Q0CseykF7vzg+Sd\nt8mXXBxjealX3E1e3dnuiLUUvCy1iie8Pz3V4X424jPqM5iu6qwpfQST/tCTTMeA\noqhSqhcwSQKBgDML8Rs73moCFIXfxhD+Jvn7z1BMbFlAe9Mu8tDQB6mEUGBBzLDh\n+ap+Iu2LU8yE6FaLRto9Lzw8lqHqF/uOdicQyn9r990NGHKaxodmSvp96Vo6ednj\nCOAHyKNC+HXc0vkSq2waHCJq+Me2qH8pMmYsxGbOfkO79TOfxSjHcpHjAoGBAIli\n6QXZmJDUsae3UVIKms1SUmvrW13Wz6oGU1SiTNbhkZqfSF0vK+TCn6Suwe5Lnzac\n/DzrPKMiP83AHV+u0zMLNKXeByGQcuSHTI8Q9IMXCAf6eko256qP4tjelU80nMpk\nkUGGsAhnfZCTGesRw9R8GU8dLXswAQfzXUT+DMEpAoGBAJc2afSeBv1JcRVQMR+a\nTOSe4ng7f/Qn9GineRZ4+0U+je3BYMjdoOril6Ja6DX3mbRSRT1HB9HE0NbgOcw2\nzWBspOvKwzpOIb39WyK8RXW1+1DZbTQqdjsNJx0CVs0quMJyof4riRAOAZ3SJKcV\ncwSD2akGgGj7ZRm5S0l1qDtz\n-----END PRIVATE KEY-----\n",
  "client_email": "firebase-adminsdk-431ot@country-club-2974d.iam.gserviceaccount.com",
  "client_id": "110849745338301211057",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-431ot%40country-club-2974d.iam.gserviceaccount.com",
  "universe_domain": "googleapis.com"
}
5. The fullstack application will be running on http://localhost:8000
