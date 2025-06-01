import React from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from '@/components/ui/table';

const TransactionInitiate = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const transactionData = [
    { label: 'Transaction ID', value: searchParams.get('tx') || '-' },
    { label: 'Amount', value: searchParams.get('amount') || '-' },
    { label: 'Currency', value: searchParams.get('currency') || '-' },
    { label: 'Description', value: decodeURIComponent(searchParams.get('description') || '-') },
    { label: 'Receiver Name', value: decodeURIComponent(searchParams.get('receiverName') || '-') },
    { label: 'Receiver Account', value: searchParams.get('receiverAccount') || '-' },
    { label: 'Invoice Number', value: decodeURIComponent(searchParams.get('invoiceNumber') || '-') },
    { label: 'Due Date', value: searchParams.get('dueDate') || '-' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center pt-safe-top pb-safe-bottom">
      <header className="w-full max-w-md sticky top-0 z-10 border-b border-border bg-background/95 backdrop-blur-sm">
        <div className="max-w-md mx-auto px-4 h-14 flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-5 w-5" />
            <span className="sr-only">Back</span>
          </Button>
          <h1 className="font-semibold text-lg">Transaction Review</h1>
        </div>
      </header>

      <div className="flex-1 w-full max-w-md p-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-xl text-center">Review your transaction</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableBody>
                {transactionData.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium text-sm text-muted-foreground">
                      {item.label}
                    </TableCell>
                    <TableCell className="text-right text-sm">
                      {item.value}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            
            <div className="flex gap-3 mt-6">
              <Button variant="outline" className="flex-1" onClick={() => navigate(-1)}>
                Cancel
              </Button>
              <Button className="flex-1">
                Confirm Payment
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TransactionInitiate;