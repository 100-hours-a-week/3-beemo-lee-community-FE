// .env 파일이 없으면 운영체제 환경변수 또는 기본값을 사용함.
// 이렇게 함으로써 docker-compose.yml에 .env파일을 불러올 필요가 없고, 하나의 docker-compose.yml로 로컬, 개발, 프로덕션 모든 환경에서 이미지 빌드 가능.
// 러너가 ssh터널링으로 인스턴스로 docker-compose.yml 실행시킬 때,러너가 인스턴스에 환경변수를 주입해주면 됨.
if (fs.existsSync('.env')) {
  require('dotenv').config({ path: '.env' });
}

const port = process.env.PORT || 3000;

const express = require('express')
const app = express()
const path = require('path')

// 정적 파일 서빙
app.use('/css', express.static(path.join(__dirname, 'public/css')));
app.use('/js', express.static(path.join(__dirname, 'public/js')));
app.use('/html', express.static(path.join(__dirname, 'public/html')));

// 페이지 라우팅
app.get('/', (req, res) => {
  res.redirect('/signin');
});

app.get('/signin', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/html/signin.html'));
});

app.get('/signup', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/html/signup.html'));
});

app.get('/home', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/html/home.html'));
});

app.get('/user/profile/edit', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/html/user-profile-edit.html'));
});

app.get('/user/password/edit', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/html/user-password-edit.html'));
});

app.get('/posts/create', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/html/make-post.html'));
});

// health check
app.get('/health', (req, res) => {
  const now = new Date();
  const hh = String(now.getHours()).padStart(2, '0');
  const mm = String(now.getMinutes()).padStart(2, '0');
  const ss = String(now.getSeconds()).padStart(2, '0');
  const timeString = '${hh}:${mm}:${ss}'

  res.status(200).send('OK -${timeString} \ n');
});

app.use((req, res) => {
  res.status(404).send('페이지를 찾을 수 없습니다.');
});

app.listen(port, () => {
  console.log(`node app.js listening on port ${port}`)
})   