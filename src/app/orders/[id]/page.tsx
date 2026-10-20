type OrderDetailsParams = {
  params: {
    id: string;
  };
};

export default async function OrderDetails({ params }: OrderDetailsParams) {
  const { id } = await params;

  return (
    <div>
      <div className="max-w-300 mx-auto">
        <div>
          <div>{id}</div>
        </div>
        <div></div>
      </div>
    </div>
  );
}
