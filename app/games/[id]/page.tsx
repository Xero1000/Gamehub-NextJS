import React from "react";

interface Props {
  params: { id: number };
}

const GameDetailPage = ({ params: { id } }: Props) => {
  return <div>GameDetailPage</div>;
};

export default GameDetailPage;
