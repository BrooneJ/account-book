export default async function Page({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <>
      <div>{children}</div>
      {modal}
    </>
  );
}
