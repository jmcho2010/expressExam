// static
// 정적인 파일들
// (html, css, js, 미디어)
// css, js등의 파일들을 잘 인식할수 있도록 반드시필요한 미들웨어

// 아래의 경우는 기본경로로 왔을때 express가 public 폴더안에 있는
// 해당 경로의 파일을 찾아감.
// app.use('/', express.static(path.join(__dirname, 'public')));