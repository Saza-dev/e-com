import { getCurrentUser } from "@/actions/getCurrentUser";
import { NextResponse } from "next/server";
import prisma from "@/libs/prismadb"; // Ensure you're importing the Prisma client correctly

export async function DELETE(
  request: Request,
  context: { params: { id: string } }
) {
  const { params } = context; // Extract `params` from `context`

  const currentUser = await getCurrentUser();

  if (!currentUser) return NextResponse.error();

  if (currentUser.role !== "ADMIN") {
    return NextResponse.error();
  }

  try {
    const product = await prisma?.product.delete({
      where: { id: params.id },
    });

    return NextResponse.json(product);
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete product" }, { status: 500 });
  }
}
