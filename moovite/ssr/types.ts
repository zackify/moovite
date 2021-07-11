import { PrismaClient } from "@prisma/client";

type ServerSideArgs = {
  prisma: PrismaClient;
};
export type GetServerSideProps = (data: ServerSideArgs) => any;

export type Page = {
  path: string;
  props: any;
  component: any;
};
