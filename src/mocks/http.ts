// import { createMiddleware } from '@mswjs/http-middleware';
// import express from 'express';
// import cors from 'cors';
// import { handlers } from './handlers';

// // 서버에서 API 요청 모킹 처리해주는 파일
// // next서버 호환 이슈로 노드서버사용

// const app = express();
// const port = 9090; // 서버 port

// app.use(cors({ origin: 'http://localhost:3000', optionsSuccessStatus: 200, credentials:true }));
// app.use(express.json());
// app.use(createMiddleware(...handlers));

// app.listen(port, () => console.log(`Mock server is running on port: ${port}`))