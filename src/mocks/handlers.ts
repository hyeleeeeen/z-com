// // MSW 서버 설정

// import { http, HttpResponse, StrictResponse } from "msw";
// import { faker } from '@faker-js/faker'

// function generatedDate() { // 지난 일주일 사이의 임의 날짜 생성 함수
//     const lastWeek = new Date(Date.now());
//     lastWeek.setDate(lastWeek.getDate() - 7);
//     return faker.date.between({
//         from: lastWeek,
//         to: Date.now(),
//     });
// }

// const delay = (ms: number) => new Promise((res) => {
//     setTimeout(res, ms);
// })




// const User = [
//     { id: 'mymyWinter', nickname: "겨울이", image: 'https://sports.hankooki.com/news/photo/202306/6832710_1031606_537.jpg' },
//     { id: 'mymyKarina', nickname: "지민이💙", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAx-N4oAQrq55H5_Bd3K1JfLABoNniHKCNpg&s" },
//     { id: "one1young", nickname: "워녕이", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjiFtLqfVocfkdw8KmVbTHxxbVHNYszyZKkKgW8ftbzuInVow4ZSO_FmEQ7w&s" },
//     { id: "your_jin", nickname: "안유유진", image: "https://image.blip.kr/v1/file/2468e5442b85b5162d79f2c75361fcd5" },
//     { id: "happpppy", nickname: "햅삐", image: faker.image.avatar() },
//     { id: "lynee", nickname: "리니", image: faker.image.avatar(), }
// ]

// // 실제 API 모킹 코드
// export const handlers = [
//     http.post("/api/login", () => {
//         console.log("로그인")
//         return (
//             // 응답작성
//             HttpResponse.json( // 보내는 데이터
//                 User[5]
//                 , {
//                     headers: {
//                         'Set-Cookie': 'connect.sid=msw-cookie;HttpOnly;Path=/'
//                     }
//                 })
//         );
//     }),

//     http.post("/api/logout", () => {
//         console.log("로그아웃")
//         return new HttpResponse(null, { // 보낼 데이터가 없을때
//             headers: {
//                 'Set-Cookie': 'connect.sid=;HttpOnly;Path=/;Max-Age=0'
//             }
//         }
//         );
//     }),

//     http.post('/api/users', async ({ request }) => {
//         console.log('회원가입');
//         // return HttpResponse.text(JSON.stringify('user_exists'), {
//         //   status: 403,
//         // })
//         return HttpResponse.text(JSON.stringify('ok'), { // 텍스트를 보낼때
//             headers: {
//                 'Set-Cookie': 'connect.sid=msw-cookie;HttpOnly;Path=/'
//             }
//         })
//     }),

//     http.get('/api/postRecommends', async ({ request }) => {
//         await delay(2000);
        
//         const url = new URL(request.url)
//         const cursor = parseInt(url.searchParams.get('cursor') as string) || 0
//         // 인피니트 스크롤링 설정
      
//         return HttpResponse.json([{ // 추천 게시글
//             postId: cursor + 1,
//             User: User[0],
//             content: `${cursor + 1} 모두모두 반가워 >_<`,
//             Images: [{ imageId: 1, link: faker.image.urlLoremFlickr() }],
//             createdAt: generatedDate(),
//         }, {
//             postId: cursor + 2,
//             User: User[1],
//             content: `${cursor + 2} 모두모두 반가워 >_<`,
//             Images: [{ imageId: 1, link: faker.image.urlLoremFlickr() }, { imageId: 2, link: faker.image.urlLoremFlickr() }, { imageId: 3, link: faker.image.urlLoremFlickr() }],
//             createdAt: generatedDate(),
//         }, {
//             postId: cursor + 3,
//             User: User[2],
//             content: `${cursor + 3} 모두모두 반가워 >_<`,
//             Images: [{ imageId: 1, link: faker.image.urlLoremFlickr() }],
//             createdAt: generatedDate(),
//         }, {
//             postId: cursor + 4,
//             User: User[3],
//             content: `${cursor + 4} 안녕하세요?`,
//             Images: null,
//             createdAt: generatedDate(),
//         }, {
//             postId: cursor + 5,
//             User: User[4],
//             content: `${cursor + 5} 모두모두 반가워 >_<`,
//             Images: [{ imageId: 1, link: faker.image.urlLoremFlickr() }, { imageId: 1, link: faker.image.urlLoremFlickr() }, { imageId: 1, link: faker.image.urlLoremFlickr() }, { imageId: 1, link: faker.image.urlLoremFlickr() }],
//             createdAt: generatedDate(),
//         },])
//     }),
//     http.get('/api/followingPosts', async ({ request }) => {
//         await delay(2000);
//         return HttpResponse.json([{ // 팔로잉 글들
//             postId: 1,
//             User: User[0],
//             content: `${1} 날 팔로잉해줘서 고마워!`,
//             Images: [{ imageId: 1, link: faker.image.urlLoremFlickr() }, { imageId: 2, link: faker.image.urlLoremFlickr() }],
//             createdAt: generatedDate(),
//         }, {
//             postId: 2,
//             User: User[1],
//             content: `${2} 날 팔로잉해줘서 고마워! `,
//             Images: [{ imageId: 1, link: faker.image.urlLoremFlickr() }],
//             createdAt: generatedDate(),
//         }, {
//             postId: 3,
//             User: User[2],
//             content: `${3} 날 팔로잉해줘서 고마워!`,
//             Images: [{ imageId: 1, link: faker.image.urlLoremFlickr() }],
//             createdAt: generatedDate(),
//         }, {
//             postId: 4,
//             User: User[3],
//             content: `${4} 날 팔로잉해줘서 고마워!`,
//             Images: [{ imageId: 1, link: faker.image.urlLoremFlickr() }],
//             createdAt: generatedDate(),
//         }, {
//             postId: 5,
//             User: User[4],
//             content: `${5} 날 팔로잉해줘서 고마워!`,
//             Images: [{ imageId: 1, link: faker.image.urlLoremFlickr() }],
//             createdAt: generatedDate(),
//         },])
//     }),
//     http.get('/api/search/:tag', ({ request, params }) => {
//         const { tag } = params
//         return HttpResponse.json([{ // 검색페이지
//             postId: 1,
//             User: User[0],
//             content: `${1} 검색결과 ${tag}`,
//             Images: [{ imageId: 1, link: faker.image.urlLoremFlickr() }],
//             createdAt: generatedDate(),
//         }, {
//             postId: 2,
//             User: User[1],
//             content: `${2} 검색결과 ${tag} `,
//             Images: [{ imageId: 1, link: faker.image.urlLoremFlickr() }],
//             createdAt: generatedDate(),
//         }, {
//             postId: 3,
//             User: User[2],
//             content: `${3} 검색결과 ${tag}`,
//             Images: [{ imageId: 1, link: faker.image.urlLoremFlickr() }],
//             createdAt: generatedDate(),
//         }, {
//             postId: 4,
//             User: User[3],
//             content: `${4} 검색결과 ${tag}`,
//             Images: [{ imageId: 1, link: faker.image.urlLoremFlickr() }],
//             createdAt: generatedDate(),
//         }, {
//             postId: 5,
//             User: User[4],
//             content: `${5} 검색결과 ${tag}`,
//             Images: [{ imageId: 1, link: faker.image.urlLoremFlickr() }],
//             createdAt: generatedDate(),
//         },])
//     }),
//     http.get('/api/users/:userId/posts', ({ request, params }) => {
//         const { userId } = params;
//         return HttpResponse.json([{ // 특정 사용자가 작성한 게시글들
//             postId: 1,
//             User: User[0],
//             content: `${1} ${userId}님의 게시글 `,
//             Images: [{ imageId: 1, link: faker.image.urlLoremFlickr() },
//             { imageId: 2, link: faker.image.urlLoremFlickr() }, { imageId: 3, link: faker.image.urlLoremFlickr() }],
//             createdAt: generatedDate(),
//         }, {
//             postId: 2,
//             User: User[0],
//             content: `${2} ${userId}님의 게시글  `,
//             Images: null,
//             createdAt: generatedDate(),
//         }, {
//             postId: 3,
//             User: User[0],
//             content: `${3} ${userId}님의 게시글`,
//             Images: [{ imageId: 1, link: faker.image.urlLoremFlickr() }],
//             createdAt: generatedDate(),
//         }, {
//             postId: 4,
//             User: User[0],
//             content: `${4} ${userId}님의 게시글 `,
//             Images: [{ imageId: 1, link: faker.image.urlLoremFlickr() }],
//             createdAt: generatedDate(),
//         }, {
//             postId: 5,
//             User: User[0],
//             content: `${5} ${userId}님의 게시글`,
//             Images: [{ imageId: 1, link: faker.image.urlLoremFlickr() }],
//             createdAt: generatedDate(),
//         },])
//     }),
//     http.get('/api/users/:userId', ({ request, params }): StrictResponse<any> => {
//         const { userId } = params;
//         const found = User.find((v) => v.id === userId);
//         if (found) {
//             return HttpResponse.json(
//                 found,
//             );
//         }
//         return HttpResponse.json({ message: 'no_such_user' }, {
//             status: 404,
//         })
//     }),
//     http.get('/api/posts/:postId', ({ request, params }): StrictResponse<any> => {
//         const { postId } = params;
//         if (parseInt(postId as string) > 10) {
//             return HttpResponse.json({ message: 'no_such_post' }, {
//                 status: 404,
//             })
//         }
//         return HttpResponse.json({ // 특정사용자의 게시글의 상세페이지

//             postId,
//             User: User[2],
//             content: `${postId}의 게시글 `,
//             Images: [{ imageId: 1, link: faker.image.urlLoremFlickr() }],
//             createdAt: generatedDate(),
//         })
//     }),
//     http.get('/api/posts/:postId/comments', ({ request, params }) => {
//         const { postId } = params;
//         return HttpResponse.json([{ // 특정사용자의 게시들에 달린 답글
//             postId: 1,
//             User: User[0],
//             content: `1 게시글 ${postId}의 내용 `,
//             Images: [{ imageId: 1, link: faker.image.urlLoremFlickr() }],
//             createdAt: generatedDate(),
//         }, {
//             postId: 2,
//             User: User[1],
//             content: `2 게시글 ${postId}의 답글들  `,
//             Images: [{ imageId: 1, link: faker.image.urlLoremFlickr() }],
//             createdAt: generatedDate(),
//         }, {
//             postId: 3,
//             User: User[2],
//             content: `3 게시글 ${postId}의 답글들`,
//             Images: [{ imageId: 1, link: faker.image.urlLoremFlickr() }],
//             createdAt: generatedDate(),
//         }, {
//             postId: 4,
//             User: User[3],
//             content: `4 게시글 ${postId}의 답글들글 `,
//             Images: null,
//             createdAt: generatedDate(),
//         }, {
//             postId: 5,
//             User: User[4],
//             content: `5 게시글 ${postId}의 답글들`,
//             Images: [{ imageId: 1, link: faker.image.urlLoremFlickr() }, { imageId: 2, link: faker.image.urlLoremFlickr() }],
//             createdAt: generatedDate(),
//         },])
//     }),

//     http.get('/api/followRecommends', ({ request }) => {
//         return HttpResponse.json(User) // 추천팔로잉 목록
//     }),

//     http.get('/api/trends', ({ request }) => {
//         return HttpResponse.json([ // 현재 트렌드 키워드 목록
//             { tagId: 1, title: '아이브', count: 3214 },
//             { tagId: 2, title: '뉴진스 버블검', count: 3548 },
//             { tagId: 3, title: '장원영', count: 4784 },
//             { tagId: 4, title: '하이브', count: 1286 },
//             { tagId: 5, title: '민희진', count: 5061 },
//         ])
//     }),
// ];
