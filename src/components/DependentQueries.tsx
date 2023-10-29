import { Fragment } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchUserByEmail = (email: string) => {
  return axios.get(`http://localhost:4000/users/${email}`);
};

const fetchCourseByChannelId = (channelId: number) => {
  return axios.get(`http://localhost:4000/channels/${channelId}`);
};

export default function DependentQueries() {
  const { data: user } = useQuery({
    queryKey: ["super-heroes"],
    queryFn: () => fetchUserByEmail("aswassaw227@gmail.com"),
  });
  const channelId = user?.data.channelId;

  const { data: course } = useQuery({
    queryKey: ["courses"],
    queryFn: () => fetchCourseByChannelId(channelId),
    enabled: !!channelId,
  });

  console.log(user);
  console.log(course);

  return (
    <Fragment>
      <h1>HAHAHAA</h1>
    </Fragment>
  );
}
