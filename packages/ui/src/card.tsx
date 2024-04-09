"use client"

export function Card({
  title,
  children
}: {
  title: string;
  children?: React.ReactNode;
}): JSX.Element {
  return (
    <div className="border rounded-2xl bg-white p-4">
      <h1 className="text-xl border-b pb-2 font-bold">
        {title}
      </h1>
      <div>{children}</div>
    </div>
  );
}
