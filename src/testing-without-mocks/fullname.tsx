import { useCallback, useEffect, useState } from "react";
import {
  fetchUserData as fetchUserDataImpl,
  createNull as createNullFetchUserData,
} from "./fetch-user-data";

export const Fullname = ({
  userId,
  fetchUserData = fetchUserDataImpl,
}: {
  userId: string;
  fetchUserData?: typeof fetchUserDataImpl;
}) => {
  const [fullname, setFullname] = useState<string>("default");

  const fetchUserDataAndSetFullname = useCallback(async () => {
    try {
      const data = await fetchUserData(userId);
      console.log("data in Fullname", data);
      setFullname(data.fullname);
    } catch (err) {
      console.log(err);
      setFullname("error getting user data");
    }
  }, [fetchUserData, userId]);

  useEffect(() => {
    fetchUserDataAndSetFullname();
  }, [fetchUserDataAndSetFullname]);

  return <em>{fullname}</em>;
};

export const createNull = (fullname: string) => {
  return (props) => {
    const nullFetchUserData = createNullFetchUserData({
      id: props.userId,
      fullname,
    });
    return <Fullname {...props} fetchUserData={nullFetchUserData} />;
  };
};
