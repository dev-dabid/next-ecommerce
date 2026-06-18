import { OrderWithRelations } from "./page";

type OrderHistoryCardProps = {
  order: OrderWithRelations;
};

const OrderHistoryCard = ({ order }: OrderHistoryCardProps) => {
  return (
    <div>
      <div className="flex justify-between">
        <div>hatdog</div>
        <div>hatdog</div>
        <div>hatdog</div>
      </div>
    </div>
  );
};

export default OrderHistoryCard;
