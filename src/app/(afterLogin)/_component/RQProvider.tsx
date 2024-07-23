"use client";

// 최상위 컴포넌트에서 QueryClientProvider 범위 설정 (모든 하위컴포넌트에서 사용가능하게끔 함)

import React, { useState } from "react";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

type Props = {
  children: React.ReactNode;
};

function RQProvider({ children }: Props) {
  const [client] = useState(
    new QueryClient({
      defaultOptions: {
        // react-query 전역설정
        queries: {
          refetchOnWindowFocus: false,
          retryOnMount: true,
          refetchOnReconnect: false, 
          retry: false,
        },
      },
    })
  );
  return (
    <QueryClientProvider client={client}>
      {children}
      {/* 하위에 있는 자식 컴포넌트에게 데이터공유 */}
      <ReactQueryDevtools
        initialIsOpen={process.env.NEXT_PUBLIC_MODE === "local"} // 개발모드에서만 가능하게 설정
      />
    </QueryClientProvider>
  );
}

export default RQProvider;