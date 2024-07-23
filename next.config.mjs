/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/upload/:slug",
        destination: `${process.env.NEXT_PUBLIC_BASE_URL}/upload/:slug`, // 서버주소로 바꿔주기
      },
    ];
  },
};

export default nextConfig;
