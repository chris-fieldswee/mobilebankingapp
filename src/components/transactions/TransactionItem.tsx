
interface TransactionItemProps {
  merchant: string;
  amount: string;
  date: string;
}

const TransactionItem = ({ merchant, amount, date }: TransactionItemProps) => (
  <div className="flex items-center justify-between py-3">
    <div className="flex items-center">
      <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center mr-3">
        {merchant[0]}
      </div>
      <div>
        <p className="font-medium">{merchant}</p>
        <p className="text-sm text-muted-foreground">{date}</p>
      </div>
    </div>
    <span className={amount.startsWith('-') ? 'text-destructive' : 'text-green-600'}>
      {amount}
    </span>
  </div>
);

export default TransactionItem;
