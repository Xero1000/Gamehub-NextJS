import prisma from "@/prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import authOptions from "../../auth/authOptions";

interface Props {
    params: { id: number }
}

export async function DELETE(request: NextRequest, { params: { id } }: Props) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const userEmail = session.user?.email;
  if (!userEmail) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  const user = await prisma.user.findUnique({
    where: { email: userEmail },
  });

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  let wishlist = await prisma.wishlist.findUnique({
    where: { userId: user.id },
  });

  // Attempt to remove the game from the user's wishlist
  const deleteOperation = await prisma.wishlistGames.deleteMany({
    where: {
      wishlistId: wishlist?.id,
      gameId: String(id),
    },
  });

  if (deleteOperation.count === 0) {
    return NextResponse.json(
      { error: "No game found in wishlist or wrong ID" },
      { status: 404 }
    );
  }

  return NextResponse.json(
    { message: "Game removed from wishlist successfully" },
    { status: 200 }
  );
}
