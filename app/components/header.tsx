import { FC } from "react";

type HeaderProps = {
  route: string;
};

export const Header: FC<HeaderProps> = ({ route }) => {
  return (
    <header className="flex items-center justify-between p-4 bg-gray-800 text-white">
      <h1 className="text-xl font-bold">{route}</h1>
    </header>
  );
};
