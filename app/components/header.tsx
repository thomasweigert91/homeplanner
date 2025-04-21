import { FC } from "react";

type HeaderProps = {
  route: string;
};

export const Header: FC<HeaderProps> = ({ route }) => {
  return (
    <header className="flex items-center justify-between p-4 mb-4 bg-white/20 backdrop-blur-sm rounded-lg shadow-md mx-4 mt-4">
      <h1 className="text-xl font-bold text-blue-900">{route}</h1>
    </header>
  );
};
