import { PrismaClient } from "@prisma/client";

type ServerSideArgs = {
  prisma: PrismaClient;
};
export type GetServerSideProps = (data: ServerSideArgs) => any;
