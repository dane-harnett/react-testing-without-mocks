import { Fullname as FullnameImpl } from "./fullname";

export const UserProfile = ({
  userId,
  Fullname = FullnameImpl,
}: {
  userId: string;
  Fullname?: typeof FullnameImpl;
}) => {
  return (
    <ul>
      <li>
        <Fullname userId={userId} />
      </li>
    </ul>
  );
};
