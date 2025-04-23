import React, { useMemo, useCallback } from 'react';
import { useNavigate, useParams } from "react-router-dom";

// Shadcn/ui Imports
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

// Lucide Icons Imports
import {
  ChevronLeft,
  MapPin,
  Download,
  CreditCard,
  AlertCircle,
  CalendarDays,
  Tag,
  CheckCircle,
  Clock,
  AlertTriangle,
  ExternalLink
} from "lucide-react";

// --- Data Structure Definition (V1 Specific) ---
interface TransactionV1 {
  id: string;
  merchantName: string;
  amount: number;
  currency: string;
  type: "expense" | "income";
  category: string;
  date: string; // Format: "YYYY-MM-DD"
  time: string;
  status: "completed" | "pending" | "failed";
  latitude?: number;
  longitude?: number;
  address?: string;
  notes?: string;
  cardLastFour?: string;
  cardNetwork?: string;
}

// --- Mock Data (Should be imported from centralized file) ---
// Assuming mockAllTransactionsV1 is imported from '@/data/goalsBudgetsData'
// If not, paste the mock array definition here or import it correctly.
import { mockAllTransactionsV1 } from '@/data/goalsBudgetsData'; // Example import

// --- Helper to find a transaction by ID ---
const findTransactionById = (id: string): TransactionV1 | undefined => {
  // Ensure using the imported data
  return mockAllTransactionsV1.find(tx => tx.id === id);
};


// --- Refined V1 Transaction Detail Component ---
const TransactionDetails = () => {
  // Get transactionId from URL parameters (ensure route is /transactions/:id)
  const { id: transactionId } = useParams<{ id: string }>(); // Correctly extract 'id' and rename
  const navigate = useNavigate();

  // Find the transaction data using the ID
  const transaction = useMemo(() => {
    console.log("Looking for transaction with ID:", transactionId);
    if (!transactionId) return undefined;
    const foundTx = findTransactionById(transactionId);
    console.log("Found transaction data:", foundTx);
    return foundTx;
  }, [transactionId]);

  // --- Formatting Helpers ---
  const formatCurrency = useCallback((amount: number, currency: string) => {
     // Use the shared formatCurrencyV1 from import if available
     // Or keep this local definition if preferred
     const absAmount = Math.abs(amount);
     const sign = amount < 0 ? "-" : (amount > 0 ? "+" : "");
     const symbol = currency === 'EUR' ? '€' : currency === 'SAR' ? ' SAR' : ` ${currency}`;
     const numberFormatter = new Intl.NumberFormat('en-US', { style: 'decimal', minimumFractionDigits: 2, maximumFractionDigits: 2 });
     return currency === 'EUR' ? `${sign}${symbol}${numberFormatter.format(absAmount)}` : `${sign}${numberFormatter.format(absAmount)}${symbol}`;
   }, []);


  const formatDate = useCallback((dateString: string, timeString: string) => {
    // ... (keep existing formatDate logic) ...
     try {
        if (!/^\d{4}-\d{2}-\d{2}$/.test(dateString)) { throw new Error("Invalid date format"); }
        const date = new Date(dateString + 'T00:00:00Z');
        const formattedDate = date.toLocaleDateString('en-GB', { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' });
        let formattedTime : string | null = null;
        if (timeString && timeString !== "N/A") {
            const timeParts = timeString.match(/(\d{1,2}):(\d{2})\s*(AM|PM)?/i);
            if (timeParts) {
                let hour = parseInt(timeParts[1], 10);
                const minute = parseInt(timeParts[2], 10);
                const ampm = timeParts[3]?.toUpperCase();
                if (ampm === 'PM' && hour < 12) hour += 12;
                if (ampm === 'AM' && hour === 12) hour = 0;
                const timeDate = new Date();
                timeDate.setHours(hour, minute, 0, 0);
                formattedTime = timeDate.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
            } else { formattedTime = timeString; }
        }
        return formattedTime ? `${formattedDate}, ${formattedTime}` : formattedDate;
      } catch (e) {
        console.error("Error formatting date:", e, "Input:", dateString, timeString);
        return `${dateString || ''}${timeString ? ', ' + timeString : ''}`;
      }
  }, []);


  // --- Navigation ---
  const goBack = () => {
    navigate(-1);
  };

  const openMapLink = () => {
    if(transaction?.latitude && transaction?.longitude) {
        // Corrected Google Maps URL format
        const url = `https://www.google.com/maps/search/?api=1&query=${transaction.latitude},${transaction.longitude}`;
        window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  // --- Loading / Not Found State ---
   console.log("[Render] Transaction ID from params:", transactionId); // Keep for debug if needed

  if (!transactionId) {
      console.error("Error condition: Transaction ID missing from URL params.");
      return <div className="p-4 text-center text-red-600">Error: Transaction ID missing.</div>;
  }
  if (!transaction) {
     console.warn("Render condition: Transaction data not found for ID:", transactionId);
     // Reuse the structure but show "Not Found"
    return (
       <div className="min-h-screen bg-background flex flex-col items-center pt-safe-top pb-safe-bottom">
        <header className="w-full max-w-md flex-shrink-0 sticky top-0 z-10 border-b border-border bg-background/95 backdrop-blur-sm">
          {/* ... Not Found Header ... */}
           <div className="flex items-center h-16 px-4">
            <Button variant="ghost" size="icon" onClick={goBack} className="mr-2 shrink-0">
              <ChevronLeft className="h-5 w-5" /> <span className="sr-only">Back</span>
            </Button>
            <h1 className="text-lg font-medium flex-1 truncate pr-2">Not Found</h1>
          </div>
        </header>
        <div className="flex-1 w-full max-w-md flex items-center justify-center">
            <p className="text-muted-foreground">Transaction not found.</p>
        </div>
      </div>
    );
  }

  // --- Data Preparation for Rendering ---
  // ... (keep existing data prep: initials, status icon/color) ...
  const merchantInitials = transaction.merchantName.split(' ').slice(0, 2).map(n => n[0]).join('').toUpperCase();
  const StatusIcon = transaction.status === 'completed' ? CheckCircle : transaction.status === 'pending' ? Clock : AlertTriangle;
  const statusColor = transaction.status === 'completed' ? 'text-green-600' : transaction.status === 'pending' ? 'text-yellow-600' : 'text-red-600';
  const statusBgColor = transaction.status === 'completed' ? 'bg-green-500/10 hover:bg-green-500/20' : transaction.status === 'pending' ? 'bg-yellow-500/10 hover:bg-yellow-500/20' : 'bg-red-500/10 hover:bg-red-500/20';

  // --- Main Component Render ---
  return (
    // Adopted Layout: Constrained width, normal flow, light gray bg
    <div className="min-h-screen bg-gray-50 flex flex-col items-center pt-safe-top pb-safe-bottom">

       {/* Header */}
       <header className="w-full max-w-md flex-shrink-0 sticky top-0 z-10 border-b border-border bg-background/95 backdrop-blur-sm">
          <div className="flex items-center h-16 px-4">
           <Button variant="ghost" size="icon" onClick={goBack} className="mr-2 shrink-0">
             <ChevronLeft className="h-5 w-5" /> <span className="sr-only">Back</span>
           </Button>
           <h1 className="text-lg font-medium flex-1 truncate pr-2">Transaction Details</h1>
         </div>
       </header>

       {/* Scrollable Main Content Area */}
       <ScrollArea className="flex-1 w-full max-w-md bg-background shadow-sm">
          <main className="p-4 md:p-6 space-y-5">

            {/* Section 1: Main Info */}
            {/* ... (Keep existing Main Info section) ... */}
              <div className="flex items-center space-x-4 mb-4">
               <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-muted text-xl font-semibold text-muted-foreground border"> {merchantInitials} </div>
               <div className="flex-1 min-w-0">
                 <p className="text-lg font-semibold truncate" title={transaction.merchantName}>{transaction.merchantName}</p>
                 <p className="text-sm text-muted-foreground">{transaction.category}</p>
               </div>
               <div className="text-right shrink-0 ml-2">
                  <p className={`text-xl font-bold ${transaction.type === 'income' ? 'text-emerald-600' : 'text-foreground'}`}> {formatCurrency(transaction.amount, transaction.currency)} </p>
                  <CardContent className="flex flex-col sm:flex-row p-0"> <Button variant="outline" className="w-full justify-start"> <AlertCircle className="mr-2 h-4 w-4" /> Modify </Button> </CardContent>
               </div>
            </div>
            <Separator />


            {/* Section 2: Details Card */}
            {/* ... (Keep existing Details Card section) ... */}
              <Card>
                <CardHeader className="py-4"> <CardTitle className="text-base font-medium">Details</CardTitle> </CardHeader>
                <CardContent className="space-y-3 text-sm pb-4">
                  <div className="flex justify-between items-center"> <span className="text-muted-foreground flex items-center"><CalendarDays className="mr-2 h-4 w-4" />Date & Time</span> <span className="font-medium text-right">{formatDate(transaction.date, transaction.time)}</span> </div>
                  <div className="flex justify-between items-center"> <span className="text-muted-foreground flex items-center"><StatusIcon className={`mr-2 h-4 w-4 ${statusColor}`} />Status</span> <Badge variant="outline" className={`${statusColor} ${statusBgColor} border-none`}> {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)} </Badge> </div>
                  {transaction.cardLastFour && ( <div className="flex justify-between items-center"> <span className="text-muted-foreground flex items-center"><CreditCard className="mr-2 h-4 w-4" />Card Used</span> <span className="font-medium"> {transaction.cardNetwork || ''} ··{transaction.cardLastFour} </span> </div> )}
                </CardContent>
            </Card>


            {/* Section 3: Location Card (Updated) */}
              {transaction.latitude && transaction.longitude && (
              <Card>
                <CardHeader className="py-4 flex flex-row items-center justify-between">
                  <CardTitle className="text-base font-medium flex items-center">
                    <MapPin className="mr-2 h-4 w-4 text-primary" /> Location
                  </CardTitle>
                   <Button
                      variant="link"
                      className="text-primary h-auto p-0 text-sm"
                      onClick={openMapLink} // Use updated function for correct URL
                    >
                      Open in Maps <ExternalLink className="ml-1 h-3 w-3"/>
                    </Button>
                </CardHeader>
                <CardContent className="space-y-2 pb-4">
                    {/* --- REPLACED PLACEHOLDER WITH IMAGE --- */}
                    <div className="aspect-video w-full rounded-lg overflow-hidden border">
                       <img
                         src="/map.png" // Path relative to the public folder
                         alt={`Map location for ${transaction.merchantName}`} // Descriptive alt text
                         className="w-full h-full object-cover" // Style to cover the container
                       />
                    </div>
                    {/* --- END OF REPLACEMENT --- */}
                    {transaction.address && (
                        <p className="text-sm text-muted-foreground pt-1">{transaction.address}</p>
                    )}
                </CardContent>
              </Card>
            )}


            {/* Section 4: Category Card */}
            {/* ... (Keep existing Category Card section) ... */}
              <Card>
                <CardHeader className="py-4"> <CardTitle className="text-base font-medium">Category</CardTitle> <CardDescription className="text-xs">Helps you track your spending.</CardDescription> </CardHeader>
                <CardContent className="pb-4"> <Button variant="outline" size="sm" className="cursor-default"> {transaction.category} </Button> </CardContent>
                <CardContent className="flex flex-col sm:flex-row gap-3 pb-4"> <Button variant="outline" className="w-full justify-start"> <AlertCircle className="mr-2 h-4 w-4" /> Edit category </Button> </CardContent>
             </Card>


            {/* Section 5: Actions Card */}
            {/* ... (Keep existing Actions Card section) ... */}
             <div className="pt-2 pb-4">
                <Card>
                    <CardHeader className="py-4"> <CardTitle className="text-base font-medium">Actions</CardTitle> </CardHeader>
                    <CardContent className="flex flex-col sm:flex-row gap-3 pb-4"> <Button variant="outline" className="w-full justify-start"> <AlertCircle className="mr-2 h-4 w-4" /> Report Issue </Button> </CardContent>
                </Card>
            </div>

          </main>
       </ScrollArea>
    </div>
  );
};

export default TransactionDetails;