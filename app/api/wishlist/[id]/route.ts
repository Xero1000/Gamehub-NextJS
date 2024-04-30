import prisma from "@/prisma/client"; // Importing Prisma client to interact with the database
import { getServerSession } from "next-auth"; // Function to get the current session information
import { NextRequest, NextResponse } from "next/server"; // Importing types for handling server requests and responses
import authOptions from "../../auth/authOptions"; // Options for NextAuth authentication

interface Props {
    params: { id: number }
}

export async function DELETE(request: NextRequest, { params: { id } }: Props) {
  
  // Getting current session information
  const session = await getServerSession(authOptions);

  // Return 401 Unauthorized if session is not found
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Retrieve user email from session
  const userEmail = session.user?.email;

  // Return 404 if user email is not found
  if (!userEmail) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  // Querying database to find user by email
  const user = await prisma.user.findUnique({
    where: { email: userEmail },
  });

  // Return 404 if user is not found
  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  // Query database to find wishlist by user ID
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

  // Return 404 if no matching game is found to delete
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
