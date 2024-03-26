"use client"
import { useBalance } from "@repo/store/useBalance"
// const client = new PrismaClient();

export default function Page(): JSX.Element {
  const balance = useBalance();
  return (
    <div className=" bg-slate-400">
      heyooo {balance}
    </div>
  );
}
