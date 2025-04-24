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
  CreditCard,
  AlertCircle,
  CalendarDays,
  CheckCircle,
  Clock,
  AlertTriangle,
  ExternalLink,
  Package // Default fallback icon
} from "lucide-react";

// --- Data Import ---
import {
    mockAllTransactionsV1,
    TransactionV1,
    formatCurrencyV1,
    // formatDateV1 // Not used directly here if local formatDate is preferred
} from '@/data/goalsBudgetsData'; // Adjust path as needed

// --- Helper to find a transaction by ID ---
const findTransactionById = (id: string): TransactionV1 | undefined => {
  return mockAllTransactionsV1.find(tx => tx.id === id);
};

// --- Refined V1 Transaction Detail Component ---
const TransactionDetails = () => {
  const { id: transactionId } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // Find the transaction data
  const transaction = useMemo(() => {
    if (!transactionId) return undefined;
    return findTransactionById(transactionId);
  }, [transactionId]);

  // --- Formatting Helper ---
  const formatDate = useCallback((dateString?: string, timeString?: string): string => {
     // Added check for undefined/null dateString
     if (!dateString) return 'N/A';
     try {
        // Validate format if needed, or be more flexible
        // if (!/^\d{4}-\d{2}-\d{2}$/.test(dateString)) { return dateString; }

        const date = new Date(dateString + 'T00:00:00Z'); // Parse as UTC
        if (isNaN(date.getTime())) { return dateString; } // Handle invalid date

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
            } else {
                formattedTime = timeString;
            }
        }
        return formattedTime ? `${formattedDate}, ${formattedTime}` : formattedDate;
      } catch (e) {
        console.error("Error formatting date/time:", e, "Input:", dateString, timeString);
        return `${dateString || ''}${timeString ? ', ' + timeString : ''}`;
      }
  }, []);

  // --- Navigation ---
  const goBack = () => navigate(-1);

  const openMapLink = () => {
    if(transaction?.latitude && transaction?.longitude) {
        // Ensure template literals are used correctly
        const url = `https://www.google.com/maps/search/?api=1&query=${transaction.latitude},${transaction.longitude}`;
        // Alternative: Show a marker
        // const url = `https://www.google.com/maps/@?api=1&map_action=map&center=${transaction.latitude},${transaction.longitude}&zoom=15`;
        window.open(url, '_blank', 'noopener,noreferrer');
    } else {
        console.warn("Cannot open map link, latitude or longitude missing for transaction:", transactionId);
    }
  };

  // --- Fallback Icon/Initials Rendering ---
  const renderFallbackIconOrInitials = (tx: TransactionV1) => {
      const CategoryIcon = tx.icon || Package;
      const initials = tx.merchantName?.split(' ').slice(0, 2).map(n => n[0]).join('').toUpperCase() || '?';
      if (CategoryIcon !== Package) {
          return <CategoryIcon className="h-6 w-6 text-muted-foreground" />;
      } else {
          return <span className="text-xl font-semibold text-muted-foreground">{initials}</span>;
      }
  };

  // --- Loading / Not Found State ---
  if (!transactionId) { /* ... Error handling ... */
    return <div className="p-4 text-center text-red-600">Error: Transaction ID missing.</div>;
  }
  if (!transaction) { /* ... Not found handling ... */
    return ( /* ... Not Found JSX ... */
       <div className="min-h-screen bg-background flex flex-col items-center pt-safe-top pb-safe-bottom">
        <header className="w-full max-w-md flex-shrink-0 sticky top-0 z-10 border-b border-border bg-background/95 backdrop-blur-sm">
           <div className="flex items-center h-16 px-4">
            <Button variant="ghost" size="icon" onClick={goBack} className="mr-2 shrink-0"> <ChevronLeft className="h-5 w-5" /> <span className="sr-only">Back</span> </Button>
            <h1 className="text-lg font-medium flex-1 truncate pr-2">Not Found</h1>
          </div>
        </header>
        <div className="flex-1 w-full max-w-md flex items-center justify-center"> <p className="text-muted-foreground">Transaction not found.</p> </div>
      </div>
    );
  }

  // --- Data Preparation for Status ---
  const StatusIcon = transaction.status === 'completed' ? CheckCircle : transaction.status === 'pending' ? Clock : AlertTriangle;
  const statusColor = transaction.status === 'completed' ? 'text-green-600' : transaction.status === 'pending' ? 'text-yellow-600' : 'text-red-600';
  const statusBgColor = transaction.status === 'completed' ? 'bg-green-500/10 hover:bg-green-500/20' : transaction.status === 'pending' ? 'bg-yellow-500/10 hover:bg-yellow-500/20' : 'bg-red-500/10 hover:bg-red-500/20';


  // --- Main Component Render ---
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center pt-safe-top pb-safe-bottom">

       {/* Header */}
       <header className="w-full max-w-md flex-shrink-0 sticky top-0 z-10 border-b border-border bg-background/95 backdrop-blur-sm">
          <div className="flex items-center h-16 px-4">
           <Button variant="ghost" size="icon" onClick={goBack} className="mr-2 shrink-0"> <ChevronLeft className="h-5 w-5" /> <span className="sr-only">Back</span> </Button>
           <h1 className="text-lg font-medium flex-1 truncate pr-2">Transaction Details</h1>
         </div>
       </header>

       {/* Scrollable Main Content Area */}
       <ScrollArea className="flex-1 w-full max-w-md bg-background shadow-sm">
          <main className="p-4 md:p-6 space-y-5">

            {/* Section 1: Main Info */}
            <div className="flex items-center space-x-4 mb-4">
               {/* Logo/Icon Container */}
               <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-muted border overflow-hidden">
                 {transaction.merchantLogoUrl ? ( <img src={transaction.merchantLogoUrl} alt={`${transaction.merchantName} logo`} className="w-full h-full object-contain" onError={(e) => { const t = e.target as HTMLImageElement; t.style.display = 'none'; const f = t.nextElementSibling as HTMLElement; if (f) f.style.display = 'flex'; }} loading="lazy" /> ) : null}
                 {/* Fallback */}
                 <div className={`w-full h-full items-center justify-center ${transaction.merchantLogoUrl ? 'hidden' : 'flex'}`}> {renderFallbackIconOrInitials(transaction)} </div>
               </div>
               {/* Info */}
               <div className="flex-1 min-w-0">
                 <p className="text-lg font-semibold truncate" title={transaction.merchantName}>{transaction.merchantName}</p>
                 <p className="text-sm text-muted-foreground">{transaction.category}</p>
               </div>
               {/* Amount */}
               <div className="text-right shrink-0 ml-2">
                  {/* Adjusted text color class slightly */}
                  <p className={`text-xl font-bold ${transaction.type === 'income' ? 'text-emerald-600' : 'text-foreground'}`}>
                    {formatCurrencyV1(transaction.amount, transaction.currency)}
                  </p>
               </div>
            </div>
            <Separator />

            {/* Section 2: Details Card */}
            <Card>
                <CardHeader className="py-4"> <CardTitle className="text-base font-medium">Details</CardTitle> </CardHeader>
                <CardContent className="space-y-3 text-sm pb-4">
                  <div className="flex justify-between items-center"> <span className="text-muted-foreground flex items-center"><CalendarDays className="mr-2 h-4 w-4" />Date & Time</span> <span className="font-medium text-right">{formatDate(transaction.date, transaction.time)}</span> </div>
                  <div className="flex justify-between items-center"> <span className="text-muted-foreground flex items-center"><StatusIcon className={`mr-2 h-4 w-4 ${statusColor}`} />Status</span> <Badge variant="outline" className={`${statusColor} ${statusBgColor} border-none capitalize`}> {transaction.status} </Badge> </div>
                  {transaction.cardLastFour && ( <div className="flex justify-between items-center"> <span className="text-muted-foreground flex items-center"><CreditCard className="mr-2 h-4 w-4" />Card Used</span> <span className="font-medium"> {transaction.cardNetwork || ''} ··{transaction.cardLastFour} </span> </div> )}
                  {transaction.notes && ( <div className="pt-1"> <span className="text-muted-foreground block mb-1">Notes</span> <p className="font-medium bg-muted/50 p-2 rounded text-foreground">{transaction.notes}</p> </div> )}
                </CardContent>
            </Card>

            {/* Section 3: Location Card - Only show if lat/long exist */}
            {transaction.latitude && transaction.longitude && (
              <Card>
                <CardHeader className="py-4 flex flex-row items-center justify-between">
                  <CardTitle className="text-base font-medium flex items-center"> <MapPin className="mr-2 h-4 w-4 text-primary" /> Location </CardTitle>
                   <Button variant="link" className="text-primary h-auto p-0 text-sm" onClick={openMapLink}> Open in Maps <ExternalLink className="ml-1 h-3 w-3"/> </Button>
                </CardHeader>
                <CardContent className="space-y-2 pb-4">
                    {/* === START: Modified Map Placeholder === */}
                    <div className="aspect-video w-full rounded-lg overflow-hidden border">
                       {/* Replace MapPin icon with your static image */}
                       <img
                          // Adjust src path if your image is located elsewhere
                          src="/maps/riyadh-monochrome.png"
                          alt="Map showing Riyadh area"
                          className="w-full h-full object-cover" // Use object-cover to fill the area
                          loading="lazy" // Lazy load the map image
                        />
                       {/* Removed the MapPin icon: <MapPin className="h-10 w-10 text-gray-400"/> */}
                    </div>
                    {/* === END: Modified Map Placeholder === */}
                    {transaction.address && (
                        <p className="text-sm text-muted-foreground pt-1">{transaction.address}</p>
                    )}
                </CardContent>
              </Card>
            )}

            {/* Section 4: Category Card */}
            <Card>
                <CardHeader className="py-4">
                    <CardTitle className="text-base font-medium">Category</CardTitle>
                    <CardDescription className="text-xs pt-1">Helps you track your spending.</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col sm:flex-row gap-3 pb-4">
                    <Badge variant="outline" className="text-sm py-1 px-3 cursor-default">{transaction.category}</Badge>
                    <Button variant="outline" size="sm" className="w-full sm:w-auto justify-start"> <AlertCircle className="mr-2 h-4 w-4" /> Edit category </Button>
                 </CardContent>
             </Card>

            {/* Section 5: Actions Card */}
             <div className="pt-2 pb-4">
                <Card>
                    <CardHeader className="py-4"> <CardTitle className="text-base font-medium">Actions</CardTitle> </CardHeader>
                    <CardContent className="flex flex-col sm:flex-row gap-3 pb-4">
                        <Button variant="outline" className="w-full justify-start"> <AlertCircle className="mr-2 h-4 w-4" /> Report Issue </Button>
                    </CardContent>
                </Card>
            </div>

          </main>
       </ScrollArea>
    </div>
  );
};

export default TransactionDetails;