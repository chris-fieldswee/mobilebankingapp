import React from 'react';
// Lucide Icon Imports (Consolidated & Added Coffee, Landmark, Info, Home, FileText, Dumbbell, CreditCard for Upcoming/London)
import {
    ShoppingCart, Utensils, Car, ShoppingBag, ShieldCheck, Landmark, Laptop, Coffee,
    Tv, Music, Dumbbell,
    CreditCard, TrendingUp, Gift, Lightbulb, Package, Plane, Smartphone,
    FileText, AlertCircle, Coins, Home, Briefcase, Send, Settings, Heart, Wallet, Shirt, Info
} from 'lucide-react';

// --- Account Interface ---
export interface AccountV1 {
  id: string;
  name: string;
  accountNumber: string;
  balance: number;
  currency: string;
  logoUrl?: string;
  availableBalance?: number;
  lastUpdated?: string;
  accountType?: "checking" | "savings" | "credit";
  changePercent?: string;
}

// --- Transaction Interface ---
export interface TransactionV1 {
  id: string;
  accountId: string;
  merchantName: string;
  amount: number;
  currency: string; // Can be SAR, GBP, etc.
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
  icon?: React.ElementType;
}

// --- Goal Interface ---
export interface GoalV1 {
  id: string;
  title: string;
  targetAmount: number;
  currentAmount: number;
  currency: string;
  icon?: React.ElementType;
  deadline?: string;
  relatedTransactionIds?: string[];
}

// --- Budget Interface ---
export interface BudgetV1 {
  id: string;
  category: string;
  allocated: number;
  spent: number;
  currency: string;
  period: string;
  icon?: React.ElementType;
}

// --- Subscription Interfaces ---
export interface SubscriptionV1 {
  id: string;
  name: string;
  amount: number;
  currency: string;
  frequency: "Monthly" | "Annually" | string;
  nextPaymentDate: string;
  logoUrl?: string;
  icon?: React.ElementType;
}

export interface PaymentHistoryItem {
  date: string;
  amount: number;
  account: string;
}

export interface SubscriptionDetailV1 extends SubscriptionV1 {
  totalPaidLast12Months?: number;
  paymentHistory?: PaymentHistoryItem[];
}

// --- Upcoming Transaction Interface (NEW & EXPORTED) ---
export interface UpcomingTransaction {
     id: string;
     date: string; // Format like "Apr 28" - requires year context
     description: string;
     amount: number;
     source: "predicted" | "scheduled" | "manual" | "invoice";
     sourceIcon: React.ElementType; // Lucide icon component
};


// --- Mock Data ---

// Centralized Accounts List
export const mockAccountsV1: AccountV1[] = [
  { id: "acc1", name: "SABB Current Account", accountNumber: "****1234", balance: 45000, currency: "SAR", logoUrl: "/bank-logos/1.png", accountType: 'checking', changePercent: "+1.5%" },
  { id: "acc2", name: "Al Rajhi Current Account", accountNumber: "****4321", balance: 12500, currency: "SAR", logoUrl: "/bank-logos/2.png", accountType: 'checking', changePercent: "-0.8%" },
  { id: "acc3", name: "Riyad Bank Current Account", accountNumber: "****1122", balance: 25000, currency: "SAR", logoUrl: "/bank-logos/3.png", accountType: 'checking', changePercent: "+5.2%" },
  { id: "acc4", name: "SNB Savings Account", accountNumber: "****9870", balance: 78000, currency: "SAR", logoUrl: "/bank-logos/4.png", accountType: 'savings', changePercent: "+0.1%" },
  { id: "acc5", name: "SABB Savings Account", accountNumber: "****5678", balance: 900000.00, currency: "SAR", logoUrl: "/bank-logos/1.png", accountType: 'savings', changePercent: "+0.05%" },
];

// Helper to map category to Lucide Icon
const getIconForCategory = (category: string): React.ElementType => {
    switch (category.toLowerCase()) {
        // Existing SAR categories
        case 'groceries': return ShoppingCart;
        case 'shopping': return ShoppingBag;
        case 'food & drink': return Utensils;
        case 'transport': return Car;
        case 'travel': return Plane;
        case 'entertainment': return Briefcase;
        case 'utilities': return Lightbulb;
        case 'health': return Heart;
        case 'services': return Settings;
        case 'transfer': return Send;
        case 'income': return TrendingUp;
        case 'savings': return Wallet;
        case 'clothing': return Shirt;
        // Added for London/Search examples
        case 'refund': return Coins;
        case 'souvenirs': return Gift;
        case 'coffee': return Coffee;
        default: return Package;
    }
};

// Define the raw transaction data first
const rawTransactions = [
  // --- Existing SAR Transactions ---
  { accountId: "acc1", id: "t1", merchantName: "Tamimi Markets", amount: -287.5, currency: "SAR", type: "expense", category: "Groceries", date: "2025-04-21", time: "5:15 PM", status: "completed", latitude: 24.7136, longitude: 46.6753, address: "123 King Fahd Rd, Riyadh 12211, Saudi Arabia", notes: "Weekly grocery shopping", cardLastFour: "4432" },
  // ... (rest of SAR transactions) ...
  { accountId: "acc2", id: "t20", merchantName: "Fuel Station", amount: -164.8, currency: "SAR", type: "expense", category: "Transport", date: "2025-04-22", time: "7:42 PM", status: "completed", latitude: 24.721, longitude: undefined, address: undefined, notes: undefined, cardLastFour: undefined },
  { accountId: "acc4", id: "inc1", merchantName: "Monthly Savings Transfer", amount: 2000, currency: "SAR", type: "income", category: "Savings", date: "2025-04-01", time: "10:00 AM", status: "completed"},
  { accountId: "acc1", id: "inc2", merchantName: "Bonus Received", amount: 5000, currency: "SAR", type: "income", category: "Income", date: "2025-03-15", time: "11:00 AM", status: "completed"},
  { accountId: "acc5", id: "inc3", merchantName: "Monthly Savings Transfer", amount: 2000, currency: "SAR", type: "income", category: "Savings", date: "2025-03-01", time: "10:00 AM", status: "completed"},

  // --- London Transactions (GBP) ---
  { accountId: "acc1", id: "lon_s1", merchantName: "https://ginvet.pl", amount: -389, currency: "GBP", type: "expense", category: "Health", date: "2025-02-10", time: "14:05", status: "completed", notes: "Vet bill (example from screenshot, currency assumed GBP)", cardLastFour: "4432" },
  { accountId: "acc1", id: "lon_s2", merchantName: "Refund from Saint Espresso", amount: 6, currency: "GBP", type: "income", category: "Refund", date: "2025-01-06", time: "10:14", status: "completed", notes: "Coffee refund", cardLastFour: "4432" },
  { accountId: "acc1", id: "lon_s3", merchantName: "Discover Gourmet", amount: -14.05, currency: "GBP", type: "expense", category: "Food & Drink", date: "2025-01-04", time: "16:30", status: "completed", notes: "Lunch", cardLastFour: "4432" },
  { accountId: "acc1", id: "lon1", merchantName: "Pret A Manger", amount: -8.50, currency: "GBP", type: "expense", category: "Food & Drink", date: "2025-04-22", time: "13:15", status: "completed", latitude: 51.5145, longitude: -0.1299, address: "Covent Garden, London", notes: "Lunch sandwich", cardLastFour: "4432" },
  { accountId: "acc1", id: "lon2", merchantName: "TfL Oyster Top-up", amount: -15.00, currency: "GBP", type: "expense", category: "Transport", date: "2025-04-22", time: "09:00", status: "completed", latitude: 51.5074, longitude: -0.1278, address: "Westminster Station", notes: "Tube travel", cardLastFour: "4432" },
  { accountId: "acc1", id: "lon3", merchantName: "Selfridges", amount: -175.00, currency: "GBP", type: "expense", category: "Shopping", date: "2025-04-21", time: "16:45", status: "completed", latitude: 51.5144, longitude: -0.1524, address: "Oxford St, London", notes: "New Shirt", cardLastFour: "4432" },
  { accountId: "acc1", id: "lon4", merchantName: "Nando's", amount: -25.60, currency: "GBP", type: "expense", category: "Food & Drink", date: "2025-04-21", time: "19:30", status: "completed", latitude: 51.5113, longitude: -0.1197, address: "Soho, London", notes: "Dinner", cardLastFour: "4432" },
  { accountId: "acc1", id: "lon5", merchantName: "British Museum Shop", amount: -30.00, currency: "GBP", type: "expense", category: "Souvenirs", date: "2025-04-20", time: "15:00", status: "completed", latitude: 51.5194, longitude: -0.1270, address: "Great Russell St, London", notes: "Gifts", cardLastFour: "4432" },
  { accountId: "acc1", id: "lon6", merchantName: "Costa Coffee", amount: -4.20, currency: "GBP", type: "expense", category: "Coffee", date: "2025-04-20", time: "11:00", status: "completed", latitude: 51.5074, longitude: -0.1278, address: "Trafalgar Square, London", notes: "Morning coffee", cardLastFour: "4432" },

] as const;

// Centralized Transaction List (with mapped icons)
export const mockAllTransactionsV1: TransactionV1[] = rawTransactions.map(tx => ({
    ...tx,
    icon: getIconForCategory(tx.category)
}));


// Mock Goals Data
export const mockGoalsV1: GoalV1[] = [
   { id: "g1", title: "Emergency Fund", targetAmount: 20000, currentAmount: 15750, currency: "SAR", icon: ShieldCheck, deadline: "Dec 2025", relatedTransactionIds: ["inc1", "inc3"] },
   { id: "g2", title: "Hajj Fund", targetAmount: 35000, currentAmount: 12340, currency: "SAR", icon: Landmark, deadline: "July 2026", relatedTransactionIds: ["inc2"] },
   { id: "g3", title: "New Laptop", targetAmount: 7000, currentAmount: 6850, currency: "SAR", icon: Laptop, relatedTransactionIds: ["t6", "t2"] },
];

// Mock Budgets Data
export const mockBudgetsV1: BudgetV1[] = [
  { id: "b1", category: "Groceries", allocated: 1500, spent: 1125.75, currency: "SAR", period: "Monthly", icon: ShoppingCart },
  { id: "b2", category: "Food & Drink", allocated: 800, spent: 785.50, currency: "SAR", period: "Monthly", icon: Utensils },
  { id: "b3", category: "Transport", allocated: 500, spent: 325.80, currency: "SAR", period: "Monthly", icon: Car },
  { id: "b4", category: "Shopping", allocated: 1000, spent: 950.00, currency: "SAR", period: "Monthly", icon: ShoppingBag },
];

// Mock Subscription List Data
export const mockSubscriptionsV1: SubscriptionV1[] = [
  { id: "netflix", name: "Netflix", amount: 69, currency: "SAR", frequency: "Monthly", nextPaymentDate: "2025-05-16", logoUrl: "https://cdn.iconscout.com/icon/free/png-256/free-netflix-3441601-2878008.png?f=webp", icon: Tv },
  { id: "anghami", name: "Anghami Plus", amount: 25, currency: "SAR", frequency: "Monthly", nextPaymentDate: "2025-05-12", logoUrl: "https://play-lh.googleusercontent.com/5-q_aGy1ZVv1TkXJ4zICQMgQ5VZ34OCD05Od4GbqpgpZCRlmYgAqHnQOpZPSDhpBoQ", icon: Music },
  { id: "osn", name: "OSN+", amount: 85, currency: "SAR", frequency: "Monthly", nextPaymentDate: "2025-05-18", logoUrl: "https://play-lh.googleusercontent.com/dxsF8N6-wGVYfSHS8NjJ7HnOFnALQBFGNO9DZZ52FmEuO7pHMAfH8UDWE4TtyYMEAaQ=w240-h480-rw", icon: Tv },
  { id: "fitness", name: "Fitness Time", amount: 400, currency: "SAR", frequency: "Monthly", nextPaymentDate: "2025-05-10", logoUrl: "https://media.licdn.com/dms/image/C560BAQHvO0WTs65Ryw/company-logo_200_200/0/1630664666631/fitnesstimeksa_logo?e=2147483647&v=beta&t=P0-Z54t28J9K6gN3q5rYt7z5X3n0D0s4Q5R0fJ1a0Zg", icon: Dumbbell }
].sort((a, b) => new Date(a.nextPaymentDate).getTime() - new Date(b.nextPaymentDate).getTime());

// Mock Subscription Detail Data
export const mockSubscriptionDetailsV1: Record<string, SubscriptionDetailV1> = {
  netflix: { ...mockSubscriptionsV1.find(s => s.id === 'netflix')!, totalPaidLast12Months: 69*12, paymentHistory: [ { date: "2025-04-16", amount: 69, account: "SABB Current (...1234)" }, { date: "2025-03-16", amount: 69, account: "SABB Current (...1234)" }, { date: "2025-02-16", amount: 69, account: "SABB Current (...1234)" }, /* ... more ... */ ] },
  anghami: { ...mockSubscriptionsV1.find(s => s.id === 'anghami')!, totalPaidLast12Months: 25*12, paymentHistory: [ { date: "2025-04-12", amount: 25, account: "SABB Current (...1234)" }, { date: "2025-03-12", amount: 25, account: "SABB Current (...1234)" }, /* ... more ... */ ] },
  osn: { ...mockSubscriptionsV1.find(s => s.id === 'osn')!, totalPaidLast12Months: 85*12, paymentHistory: [ { date: "2025-04-18", amount: 85, account: "SABB Current (...1234)" }, { date: "2025-03-18", amount: 85, account: "SABB Current (...1234)" }, /* ... more ... */ ] },
  fitness: { ...mockSubscriptionsV1.find(s => s.id === 'fitness')!, totalPaidLast12Months: 400*12, paymentHistory: [ { date: "2025-04-10", amount: 400, account: "SABB Current (...1234)" }, { date: "2025-03-10", amount: 400, account: "SABB Current (...1234)" }, /* ... more ... */ ] }
};

// --- Upcoming Transactions Data (NEW & EXPORTED) ---
// This is the same data used in CashflowTab
export const upcomingTransactionsData: UpcomingTransaction[] = [
     { id: "ut1", date: "Apr 28", description: "Salary Deposit", amount: 60000, source: "predicted", sourceIcon: Info },
     { id: "ut2", date: "May 1", description: "Rent Payment", amount: -5000, source: "scheduled", sourceIcon: Home },
     { id: "ut6", date: "Apr 24", description: "Invoice #123 Due", amount: -1500, source: "invoice", sourceIcon: FileText },
     { id: "ut3", date: "May 10", description: "Gym Membership", amount: -400, source: "predicted", sourceIcon: Dumbbell },
     { id: "ut7", date: "Apr 23", description: "Lunch Meeting", amount: -120, source: "manual", sourceIcon: Utensils },
     { id: "ut4", date: "May 15", description: "Electricity Bill", amount: -500, source: "scheduled", sourceIcon: Lightbulb },
     { id: "ut5", date: "May 20", description: "Credit Card Payment", amount: -6000, source: "predicted", sourceIcon: CreditCard },
];


// --- Helper Functions ---

// Definition for Major Transactions Used in Forecast
const majorTransactions = [
    { date: new Date(2025, 3, 28), description: "Salary Deposit", amount: 60000 },
    { date: new Date(2025, 4, 1), description: "Rent Payment", amount: -5000 },
    { date: new Date(2025, 4, 10), description: "Gym Membership", amount: -400 },
    { date: new Date(2025, 4, 15), description: "Electricity Bill", amount: -500 },
    { date: new Date(2025, 4, 20), description: "Credit Card Payment", amount: -6000 },
    { date: new Date(2025, 4, 25), description: "Tuition Fee - MBSC", amount: -80000 },
    { date: new Date(2025, 4, 28), description: "Salary Deposit", amount: 60000 },
];

// Forecast Data Generation Logic
export const generateForecastData = (startBalance: number, startDate: Date, days: number) => {
  const data = [];
  let currentBalance = startBalance;
  const currency = 'SAR';

  for (let i = 0; i < days; i++) {
    const currentDate = new Date(startDate);
    currentDate.setDate(startDate.getDate() + i);

    const todaysTransactions = majorTransactions.filter(t =>
        t.date >= startDate &&
        t.date.toDateString() === currentDate.toDateString()
    );

    let dailyChange = 0;
    todaysTransactions.forEach(transaction => { dailyChange += transaction.amount; });
    currentBalance += dailyChange;

    data.push({
      date: currentDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      balance: Math.round(currentBalance),
      formattedBalance: new Intl.NumberFormat('en-US', { style: 'currency', currency: currency, maximumFractionDigits: 0 }).format(Math.round(currentBalance)),
      transactions: todaysTransactions.length > 0 ? todaysTransactions : undefined
    });
  }
  return data;
};

// Format Currency (Handles SAR, GBP, EUR)
export const formatCurrencyV1 = (amount: number, currency: string): string => {
    const numberFormatter = new Intl.NumberFormat('en-US', { style: 'decimal', minimumFractionDigits: 2, maximumFractionDigits: 2 });
    let symbol = ` ${currency}`;
    if (currency === 'SAR') symbol = ' SAR';
    else if (currency === 'EUR') symbol = '€';
    else if (currency === 'GBP') symbol = '£';

    const sign = amount < 0 ? "-" : amount > 0 ? "+" : "";
    const formattedAbs = numberFormatter.format(Math.abs(amount));

    return (currency === 'EUR' || currency === 'GBP') ? `${sign}${symbol}${formattedAbs}` : `${sign}${formattedAbs}${symbol}`;
};


// Format Date
export const formatDateV1 = (dateString: string, options?: Intl.DateTimeFormatOptions): string => {
    try {
        if (!/^\d{4}-\d{2}-\d{2}$/.test(dateString)) {
             // console.warn("Invalid date format received by formatDateV1, expected YYYY-MM-DD:", dateString);
             return dateString;
        }
        const defaultOptions: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' };
        const date = new Date(dateString + 'T00:00:00Z');
        if (isNaN(date.getTime())) {
            // console.warn("Invalid date created from string:", dateString);
            return dateString;
        }
        return date.toLocaleDateString('en-GB', { ...defaultOptions, ...options });
    } catch (e) {
        console.error("Error formatting date:", e, dateString);
        return dateString;
    }
};

// Finder Functions
export const findAccountById = (id: string): AccountV1 | undefined => mockAccountsV1.find(acc => acc.id === id);
export const findGoalById = (id: string): GoalV1 | undefined => mockGoalsV1.find(goal => goal.id === id);
export const findBudgetById = (id: string): BudgetV1 | undefined => mockBudgetsV1.find(budget => budget.id === id);
export const findSubscriptionDetailById = (id: string): SubscriptionDetailV1 | undefined => mockSubscriptionDetailsV1[id];
export const findTransactionsByIds = (ids: string[]): TransactionV1[] => !ids || ids.length === 0 ? [] : mockAllTransactionsV1.filter(tx => ids.includes(tx.id));
export const findTransactionsByCategory = (category: string, limit: number = 10): TransactionV1[] => !category ? [] : mockAllTransactionsV1.filter(tx => tx.category.toLowerCase() === category.toLowerCase()).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, limit);
export const findTransactionsByAccountId = (accountId: string): TransactionV1[] => !accountId ? [] : mockAllTransactionsV1.filter(tx => tx.accountId === accountId).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

// Finder function for London transactions
export const findLondonTransactions = (query: string = "london", limit: number = 10): TransactionV1[] => {
    const queryLower = query.toLowerCase();
    // Filter primarily by GBP currency or address/merchant containing London/query
    return mockAllTransactionsV1
        .filter(tx =>
            tx.currency === 'GBP' ||
            (tx.address && tx.address.toLowerCase().includes('london')) ||
            (tx.address && tx.address.toLowerCase().includes(queryLower)) ||
            tx.merchantName.toLowerCase().includes(queryLower)
        )
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .slice(0, limit);
};

