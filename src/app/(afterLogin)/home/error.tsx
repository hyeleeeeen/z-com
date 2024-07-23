"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div>
      <h2>뭔가 잘못됐어!</h2>
      <button onClick={() => reset()}>다시 시도</button>
    </div>
  );
}
