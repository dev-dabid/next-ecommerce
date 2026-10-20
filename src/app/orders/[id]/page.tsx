type OrderDetailsParams = {
  params: {
    id: string;
  };
};

export default async function OrderDetails({ params }: OrderDetailsParams) {
  const { id } = await params;

  return (
    <div>
      <div>{id}</div>
    </div>
  );
}
