"use client";

import { Hashtag } from "@/model/Hashtag";
import { useQuery } from "@tanstack/react-query";
import { getTrends } from "../../_lib/getTrends";
import Trend from "../../_component/Trend";

export default function TrendSection() {
  const { data } = useQuery<Hashtag[]>({
    queryKey: ["trends"],
    queryFn: getTrends, // fetch 함수
    staleTime: 60 * 1000,
    gcTime: 300 * 1000,
  });
  console.log(data);
  return data?.map((trend) => <Trend key={trend.tagId} trend={trend} />);
}
