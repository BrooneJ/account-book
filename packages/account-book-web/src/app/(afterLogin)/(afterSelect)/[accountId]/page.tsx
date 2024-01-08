export default function Page({ params }: { params: { accountId: string } }) {
  const accountId = params.accountId;
  return <div>currentId: {accountId}</div>;
}
