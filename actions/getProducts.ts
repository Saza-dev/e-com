import prisma from "@/libs/prismadb";

export interface IproductParams {
  category?: string | null;
  searchTerm?: string | null;
}

export default async function getProducts(params: IproductParams) {
  try {
    const { category, searchTerm } = await params;
    let searchString = searchTerm;

    if (!searchTerm) {
      searchString = "";
    }

    const query: any = {};

    if (category) {
      query.category = category;
    }

    const products = await prisma.product.findMany({
      where: {
        ...query,
        OR: [
          {
            name: {
              contains: searchString,
              mode: "insensitive",
            },
          },
          {
            description: {
              contains: searchString,
              mode: "insensitive",
            },
          },
        ],
      },
      include: {
        reviews: {
          include: {
            user: true,
          },
          orderBy: {
            createdDate: "desc",
          },
        },
      },
    });

    return products
  } catch (error: any) {
    throw new Error(error);
  }
}
