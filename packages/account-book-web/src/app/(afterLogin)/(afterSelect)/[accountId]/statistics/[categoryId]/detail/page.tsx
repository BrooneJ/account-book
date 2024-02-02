export default function Page({ params }: { params: { categoryId: string } }) {
  const { categoryId } = params;

  return <div className="h-full">{categoryId}</div>;
}
