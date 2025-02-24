
import { useNavigate } from "react-router-dom";

interface TransactionItemProps {
  merchant: string;
  amount: string;
  date: string;
  id?: string;
}

const TransactionItem = ({ merchant, amount, date, id = "1" }: TransactionItemProps) => {
  const navigate = useNavigate();

  return (
    <div 
      className="flex items-center justify-between py-3 cursor-pointer hover:bg-secondary rounded-lg px-2"
      onClick={() => navigate(`/transactions/${id}`)}
    >
      <div className="flex items-center">
        <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center mr-3">
          {merchant[0]}
        </div>
        <div>
          <p className="font-medium">{merchant}</p>
          <p className="text-sm text-muted-foreground">{date}</p>
        </div>
      </div>
      <span className={`text-[0.95rem] ${amount.startsWith('-') ? 'text-[#222222]' : 'text-[#222222]'}`}>
        {amount}
      </span>
    </div>
  );
};

export default TransactionItem;
