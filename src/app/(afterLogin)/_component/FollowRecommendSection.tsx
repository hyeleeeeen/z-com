"use client"

import { User } from "@/model/User";
import {getFollowRecommends} from "@/app/(afterLogin)/_lib/getFollowRecommends";
import { useQuery } from "@tanstack/react-query";
import FollowRecommend from "./FollowRecommend";

export default function FollowRecommends() {

    const { data } = useQuery<User[]>({
        queryKey: ["users","followRecommends"],
        queryFn: getFollowRecommends,
        staleTime: 60 * 1000,
        gcTime: 300 * 1000,
      });

return data?.map((user) => <FollowRecommend key={user.id} user={user}/>)
}