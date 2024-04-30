import { getServerSession } from "next-auth"; 
import { NextRequest, NextResponse } from "next/server"; 
import authOptions from "../auth/authOptions"; 
import prisma from "@/prisma/client"; 

export async function GET(request: NextRequest) {
  // Retrieve the current session information
  const session = await getServerSession(authOptions);

  // Return 401 Unauthorized if no session is found
  if (!session)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  // Retrieve user email from session
  const userEmail = session.user?.email;

  // Return 404 if email is not found
  if (!userEmail) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  // Query the database for a user by email
  const user = await prisma.user.findUnique({
    where: {
      email: userEmail,
    },
  });

  // Return 404 if user is not found
  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  // Retrieve the user's wishlist and include associated games
  const wishlist = await prisma.wishlist.findUnique({
    where: {
      userId: user.id,
    },
    include: {
      games: {
        include: {
          game: true, // Eager load game data associated with WishlistGames
        },
      },
    },
  });

  // Return 400 if no wishlist is found
  if (!wishlist) {
    return NextResponse.json({ error: "Wishlist not found" }, { status: 400 });
  }

  // Extract game details from the join table entities
  const gameDetails = wishlist.games.map((item) => item.game); 
  return NextResponse.json(gameDetails);
}

export async function POST(request: NextRequest) {
  // Retrieve the current session information
  const session = await getServerSession(authOptions);

  // Return 401 Unauthorized if no session is found
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Parse the request body as JSON
  const body = await request.json();
  
  // Retrieve user email from session
  const userEmail = session.user?.email;

  // Retrieve user email from session
  if (!userEmail) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }
  
  // Query the database for a user by email
  const user = await prisma.user.findUnique({
    where: { email: userEmail },
  });
  
  // Return 404 if email is not found
  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }
  
  const gameId = String(body.id);

  // Retrieve the user's wishlist
  let wishlist = await prisma.wishlist.findUnique({
    where: { userId: user.id },
  });

  // Create a new wishlist if none exists
  if (!wishlist) {
    wishlist = await prisma.wishlist.create({
      data: {
        userId: user.id,
      },
    });
  }

  // Update or create the game in the database
  const game = await prisma.game.upsert({
    where: { id: gameId },
    update: {
      name: body.name,
      background_image: body.background_image || null,
      metacritic: body.metacritic || null,
      rating_top: body.rating_top || null,
      slug: body.slug
    },
    create: {
      id: gameId,
      name: body.name,
      background_image: body.background_image || null, 
      metacritic: body.metacritic || null, 
      rating_top: body.rating_top || null,
      slug: body.slug
    },
  });

  // Check if the game is already in the wishlist
  const existingGame = await prisma.wishlistGames.findUnique({
    where: {
      wishlistId_gameId: {
        wishlistId: wishlist.id,
        gameId: game.id,
      },
    },
  });

  // Return 400 if game is already in the wishlist
  if (existingGame) {
    return NextResponse.json(
      { error: "Game already in wishlist" },
      { status: 400 }
    );
  }

  // Add the game to the wishlist
  await prisma.wishlistGames.create({
    data: {
      wishlistId: wishlist.id,
      gameId: game.id,
    },
  });

  return NextResponse.json(
    { message: "Game added to wishlist successfully" },
    { status: 200 }
  );
}

