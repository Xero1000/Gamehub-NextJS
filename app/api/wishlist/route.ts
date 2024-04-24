import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import authOptions from "../auth/authOptions";
import prisma from "@/prisma/client";

export async function GET(request: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const userEmail = session.user?.email;
  if (!userEmail) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  const user = await prisma.user.findUnique({
    where: {
      email: userEmail,
    },
  });

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

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

  if (!wishlist) {
    return NextResponse.json({ error: "Wishlist not found" }, { status: 400 });
  }

  // Map over the results to extract the game details from the join table entities
  const gameDetails = wishlist.games.map((item) => item.game);
  return NextResponse.json(gameDetails);
}

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  
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
  
  const gameId = String(body.id);

  let wishlist = await prisma.wishlist.findUnique({
    where: { userId: user.id },
  });

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

  const existingGame = await prisma.wishlistGames.findUnique({
    where: {
      wishlistId_gameId: {
        wishlistId: wishlist.id,
        gameId: game.id,
      },
    },
  });

  if (existingGame) {
    return NextResponse.json(
      { error: "Game already in wishlist" },
      { status: 400 }
    );
  }

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

