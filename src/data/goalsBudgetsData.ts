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
  logoUrl?: string; // Bank logo
  availableBalance?: number;
  lastUpdated?: string;
  accountType?: "checking" | "savings" | "credit";
  changePercent?: string;
}

// --- Transaction Interface (Added merchantLogoUrl) ---
export interface TransactionV1 {
  id: string;
  accountId: string;
  merchantName: string;
  merchantLogoUrl?: string | null; // Allow null explicitly
  amount: number;
  currency: string;
  type: "expense" | "income"; // Strict type
  category: string;
  date: string; // YYYY-MM-DD format
  time: string; // HH:MM AM/PM or HH:MM format
  status: "completed" | "pending" | "failed";
  latitude?: number;
  longitude?: number;
  address?: string;
  notes?: string;
  cardLastFour?: string;
  cardNetwork?: string;
  icon?: React.ElementType; // Category icon
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
  nextPaymentDate: string; // Consider Date object if needed
  logoUrl?: string; // Subscription service logo (different from merchant logo)
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

// --- Upcoming Transaction Interface ---
export interface UpcomingTransaction {
     id: string;
     date: string; // Can be relative like "Apr 28" or specific YYYY-MM-DD
     description: string;
     amount: number;
     source: "predicted" | "scheduled" | "manual" | "invoice";
     sourceIcon: React.ElementType;
};


// --- Mock Data ---

// Centralized Accounts List
export const mockAccountsV1: AccountV1[] = [
  { id: "acc1", name: "SAB Current Account", accountNumber: "****1234", balance: 45000, currency: "SAR", logoUrl: "/bank-logos/1.png", accountType: 'checking', changePercent: "+1.5%", lastUpdated: "Today, 05:30 AM" },
  { id: "acc2", name: "Al Rajhi Current Account", accountNumber: "****4321", balance: 12500, currency: "SAR", logoUrl: "/bank-logos/3.png", accountType: 'checking', changePercent: "-0.8%", lastUpdated: "Yesterday, 11:00 PM" },
  { id: "acc3", name: "Riyad Bank Current Account", accountNumber: "****1122", balance: 25000, currency: "SAR", logoUrl: "/bank-logos/4.png", accountType: 'checking', changePercent: "+5.2%", lastUpdated: "2 days ago" },
  { id: "acc4", name: "SNB Savings Account", accountNumber: "****9870", balance: 78000, currency: "SAR", logoUrl: "/bank-logos/2.png", accountType: 'savings', changePercent: "+0.1%", lastUpdated: "1 week ago" },
  { id: "acc5", name: "SAB Savings Account", accountNumber: "****5678", balance: 900000.00, currency: "SAR", logoUrl: "/bank-logos/1.png", accountType: 'savings', changePercent: "+0.05%", lastUpdated: "Today, 05:30 AM" },
];

// Helper to map category to Lucide Icon
const getIconForCategory = (category: string): React.ElementType => {
    switch (category.toLowerCase()) {
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
        case 'refund': return Coins;
        case 'souvenirs': return Gift;
        case 'coffee': return Coffee;
        default: return Package;
    }
};

// Define the raw transaction data first
// Added 'as const' to enforce literal types and fix TS2322
const rawTransactions = [
    // --- Account 1 (SAB Current) Transactions ---
    { accountId: "acc1", id: "t1", merchantName: "Tamimi Markets", merchantLogoUrl: "/merchant-logos/1.png", amount: -287.5, currency: "SAR", type: "expense", category: "Groceries", date: "2025-04-22", time: "5:15 PM", status: "completed", latitude: 24.7136, longitude: 46.6753, address: "123 King Fahd Rd, Riyadh 12211, Saudi Arabia", notes: "Weekly grocery shopping", cardLastFour: "4432", cardNetwork: "Visa" },
    { accountId: "acc1", id: "t3", merchantName: "Al Baik", merchantLogoUrl: "/merchant-logos/3.png", amount: -89.9, currency: "SAR", type: "expense", category: "Food & Drink", date: "2025-04-19", time: "8:45 PM", status: "completed", latitude: 24.7139, longitude: 46.6689, address: "789 Takhassusi St, Riyadh 12345, Saudi Arabia", notes: "Dinner with friends", cardLastFour: "3222", cardNetwork: "Mastercard" },
    { accountId: "acc1", id: "t5", merchantName: "STC", merchantLogoUrl: "/merchant-logos/5.png", amount: -199.0, currency: "SAR", type: "expense", category: "Utilities", date: "2025-04-15", time: "10:00 AM", status: "completed", latitude: 24.713, longitude: 46.6755, address: "321 King Abdullah Rd, Riyadh 11564, Saudi Arabia", notes: "Mobile bill payment", cardLastFour: "8622", cardNetwork: "Mada" },
    { accountId: "acc1", id: "t8", merchantName: "Amazon.sa", merchantLogoUrl: "/merchant-logos/8.png", amount: -219.4, currency: "SAR", type: "expense", category: "Shopping", date: "2025-04-15", time: "11:12 AM", status: "completed", latitude: 24.7137, longitude: 46.6758, address: "Delivery: 12 King Salman Rd, Riyadh", notes: "Office supplies order", cardLastFour: "3222", cardNetwork: "Mastercard" },
    { accountId: "acc1", id: "t9", merchantName: "Saudi Electricity Co.", merchantLogoUrl: "/merchant-logos/9.png", amount: -427.8, currency: "SAR", type: "expense", category: "Utilities", date: "2025-04-14", time: "9:30 PM", status: "completed", latitude: 24.7138, longitude: 46.6759, address: "100 Power Ave, Riyadh 11564, Saudi Arabia", notes: "Monthly electricity bill", cardLastFour: "8622", cardNetwork: "Mada" },
    { accountId: "acc1", id: "t18", merchantName: "Lulu Hypermarket", merchantLogoUrl: "/merchant-logos/18.png", amount: -152.75, currency: "SAR", type: "expense", category: "Groceries", date: "2025-04-12", time: "5:50 PM", status: "completed", latitude: 24.7142, longitude: 46.6792, address: "456 Lulu Ave, Riyadh 12345, Saudi Arabia", notes: "Snacks and essentials", cardLastFour: "8622", cardNetwork: "Mada" },
    { accountId: "acc1", id: "inc2", merchantName: "Bonus Received", merchantLogoUrl: null, amount: 5000, currency: "SAR", type: "income", category: "Income", date: "2025-03-15", time: "11:00 AM", status: "completed"},
    // London Transactions for acc1
    { accountId: "acc1", id: "lon_s2", merchantName: "Refund from Saint Espresso", merchantLogoUrl: "/merchant-logos/27.png", amount: 6, currency: "GBP", type: "income", category: "Refund", date: "2025-01-06", time: "10:14 AM", status: "completed", notes: "Coffee refund", cardLastFour: "4432", cardNetwork: "Visa" },
    { accountId: "acc1", id: "lon_s3", merchantName: "Discover Gourmet", merchantLogoUrl: null, amount: -14.05, currency: "GBP", type: "expense", category: "Food & Drink", date: "2025-01-04", time: "4:30 PM", status: "completed", notes: "Lunch", cardLastFour: "4432", cardNetwork: "Visa" },
    { accountId: "acc1", id: "lon1", merchantName: "Pret A Manger", merchantLogoUrl: "/merchant-logos/29.png", amount: -8.50, currency: "GBP", type: "expense", category: "Food & Drink", date: "2025-04-22", time: "1:15 PM", status: "completed", latitude: 51.5145, longitude: -0.1299, address: "Covent Garden, London", notes: "Lunch sandwich", cardLastFour: "4432", cardNetwork: "Visa" },
    { accountId: "acc1", id: "lon2", merchantName: "TfL Oyster Top-up", merchantLogoUrl: "/merchant-logos/30.png", amount: -15.00, currency: "GBP", type: "expense", category: "Transport", date: "2025-04-22", time: "9:00 AM", status: "completed", latitude: 51.5074, longitude: -0.1278, address: "Westminster Station", notes: "Tube travel", cardLastFour: "4432", cardNetwork: "Visa" },
    { accountId: "acc1", id: "lon3", merchantName: "Selfridges", merchantLogoUrl: "/merchant-logos/31.png", amount: -175.00, currency: "GBP", type: "expense", category: "Shopping", date: "2025-04-21", time: "4:45 PM", status: "completed", latitude: 51.5144, longitude: -0.1524, address: "Oxford St, London", notes: "New Shirt", cardLastFour: "4432", cardNetwork: "Visa" },
    { accountId: "acc1", id: "lon4", merchantName: "Nando's", merchantLogoUrl: "/merchant-logos/32.png", amount: -25.60, currency: "GBP", type: "expense", category: "Food & Drink", date: "2025-04-21", time: "7:30 PM", status: "completed", latitude: 51.5113, longitude: -0.1197, address: "Soho, London", notes: "Dinner", cardLastFour: "4432", cardNetwork: "Visa" },
    { accountId: "acc1", id: "lon5", merchantName: "British Museum Shop", merchantLogoUrl: "/merchant-logos/33.png", amount: -30.00, currency: "GBP", type: "expense", category: "Souvenirs", date: "2025-04-20", time: "3:00 PM", status: "completed", latitude: 51.5194, longitude: -0.1270, address: "Great Russell St, London", notes: "Gifts", cardLastFour: "4432", cardNetwork: "Visa" },
    { accountId: "acc1", id: "lon6", merchantName: "Costa Coffee", merchantLogoUrl: "/merchant-logos/34.png", amount: -4.20, currency: "GBP", type: "expense", category: "Coffee", date: "2025-04-20", time: "11:00 AM", status: "completed", latitude: 51.5074, longitude: -0.1278, address: "Trafalgar Square, London", notes: "Morning coffee", cardLastFour: "4432", cardNetwork: "Visa" },

    // --- Account 2 (Al Rajhi) Transactions ---
    { accountId: "acc2", id: "t2", merchantName: "Jarir Bookstore", merchantLogoUrl: "/merchant-logos/2.png", amount: -190.0, currency: "SAR", type: "expense", category: "Shopping", date: "2025-04-21", time: "4:15 PM", status: "completed", latitude: 24.72, longitude: 46.68, address: "456 Olaya St, Riyadh 54321, Saudi Arabia", notes: "Purchased new notebook.", cardLastFour: "1122", cardNetwork: "Mada" },
    { accountId: "acc2", id: "t6", merchantName: "Apple Store", merchantLogoUrl: "/merchant-logos/6.png", amount: -1799.0, currency: "SAR", type: "expense", category: "Shopping", date: "2025-04-17", time: "6:05 PM", status: "completed", latitude: 24.7112, longitude: 46.6745, address: "222 Riyadh Park Mall, Riyadh 13511, Saudi Arabia", notes: "Bought AirPods Pro", cardLastFour: "4432", cardNetwork: "Visa" }, // Assuming Visa used here
    { accountId: "acc2", id: "t10", merchantName: "McDonald's", merchantLogoUrl: "/merchant-logos/10.png", amount: -55.0, currency: "SAR", type: "expense", category: "Food & Drink", date: "2025-04-16", time: "1:10 PM", status: "completed", latitude: 24.715, longitude: 46.678, address: "321 Tahlia St, Riyadh 12333, Saudi Arabia", notes: "Lunch", cardLastFour: "4432", cardNetwork: "Visa" }, // Assuming Visa used here
    { accountId: "acc2", id: "t20", merchantName: "Shell", merchantLogoUrl: "/merchant-logos/35.png", amount: -164.8, currency: "SAR", type: "expense", category: "Transport", date: "2025-04-22", time: "7:42 PM", status: "completed", latitude: 24.721, longitude: undefined, address: "Alyasmin, Riyadh 13325, Saudi Arabia", notes: "Fuel", cardLastFour: undefined, cardNetwork: undefined },

    // --- Account 3 (Riyad Bank) Transactions ---
    { accountId: "acc3", id: "t4", merchantName: "Uber", merchantLogoUrl: "/merchant-logos/4.png", amount: -66.5, currency: "SAR", type: "expense", category: "Transport", date: "2025-04-21", time: "12:57 PM", status: "completed", latitude: 24.7131, longitude: 46.675, address: "Pickup: 101 King Saud Rd, Riyadh", notes: "Ride to client meeting", cardLastFour: "1896", cardNetwork: "Visa" },
    { accountId: "acc3", id: "t7", merchantName: "Careem", merchantLogoUrl: "/merchant-logos/7.png", amount: -44.41, currency: "SAR", type: "expense", category: "Transport", date: "2025-04-15", time: "3:30 PM", status: "completed", latitude: 24.726, longitude: 46.67, address: "Pickup: 654 Airport Rd, Riyadh", notes: "Ride from airport", cardLastFour: "1122", cardNetwork: "Mastercard" },

    // --- Account 4 (SNB Savings) Transactions ---
     { accountId: "acc4", id: "inc1", merchantName: "Monthly Savings Transfer", merchantLogoUrl: null, amount: 2000, currency: "SAR", type: "income", category: "Savings", date: "2025-04-01", time: "10:00 AM", status: "completed"},

    // --- Account 5 (SAB Savings) Transactions ---
    { accountId: "acc5", id: "inc3", merchantName: "Monthly Savings Transfer", merchantLogoUrl: null, amount: 2000, currency: "SAR", type: "income", category: "Savings", date: "2025-03-01", time: "10:00 AM", status: "completed"},

] as const; // <<<<< ***** 'as const' Added Here *****


// Centralized Transaction List (with mapped icons)
// This assignment should now be type-correct
export const mockAllTransactionsV1: TransactionV1[] = rawTransactions.map(tx => ({
    ...tx, // Spread properties from the accurately typed rawTransactions
    icon: getIconForCategory(tx.category),
    // Explicitly handle potential undefined if needed, though 'as const' helps
    merchantLogoUrl: tx.merchantLogoUrl !== undefined ? tx.merchantLogoUrl : undefined,
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

// --- Upcoming Transactions Data ---
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
    { date: new Date(2025, 3, 28), description: "Salary Deposit", amount: 60000 }, // Note: Month is 0-indexed (3 = April)
    { date: new Date(2025, 4, 1), description: "Rent Payment", amount: -5000 }, // 4 = May
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
  const currency = 'SAR'; // Assuming SAR for forecast

  for (let i = 0; i < days; i++) {
    const currentDate = new Date(startDate);
    currentDate.setDate(startDate.getDate() + i);

    // Find transactions matching the current date (ignoring time)
    const todaysTransactions = majorTransactions.filter(t =>
        t.date.getFullYear() === currentDate.getFullYear() &&
        t.date.getMonth() === currentDate.getMonth() &&
        t.date.getDate() === currentDate.getDate()
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
    if (amount === undefined || amount === null || isNaN(amount)) {
        return `0.00 ${currency || ''}`; // Return default or handle error
    }
    const numberFormatter = new Intl.NumberFormat('en-US', { style: 'decimal', minimumFractionDigits: 2, maximumFractionDigits: 2 });
    let symbol = ` ${currency}`;
    let symbolPosition: 'before' | 'after' = 'after'; // Default

    if (currency === 'SAR') {
        symbol = ' SAR';
        symbolPosition = 'after';
    } else if (currency === 'EUR') {
        symbol = '€';
        symbolPosition = 'before';
    } else if (currency === 'GBP') {
        symbol = '£';
        symbolPosition = 'before';
    } // Add other currencies if needed

    const sign = amount < 0 ? "-" : amount > 0 ? "+" : ""; // Show + for positive amounts
    const formattedAbs = numberFormatter.format(Math.abs(amount));

    return symbolPosition === 'before' ? `${sign}${symbol}${formattedAbs}` : `${sign}${formattedAbs}${symbol}`;
};


// Format Date
export const formatDateV1 = (dateString: string, options?: Intl.DateTimeFormatOptions): string => {
    try {
        if (!dateString || typeof dateString !== 'string') return '';
        if (!/^\d{4}-\d{2}-\d{2}$/.test(dateString)) {
             return dateString; // Return original if not expected format
        }
        const defaultOptions: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' };
        const date = new Date(dateString.includes('T') ? dateString : dateString + 'T00:00:00Z');
        if (isNaN(date.getTime())) {
            return dateString;
        }
        return date.toLocaleDateString('en-GB', { ...defaultOptions, ...options });
    } catch (e) {
        console.error("Error formatting date:", e, dateString);
        return dateString; // Fallback to original string on error
    }
};

// --- Finder Functions ---

// Find account by ID
export const findAccountById = (id: string): AccountV1 | undefined => {
    if (!id) return undefined;
    return mockAccountsV1.find(acc => acc.id === id);
};

// Find goal by ID
export const findGoalById = (id: string): GoalV1 | undefined => {
    if (!id) return undefined;
    return mockGoalsV1.find(goal => goal.id === id);
};

// Find budget by ID
export const findBudgetById = (id: string): BudgetV1 | undefined => {
    if (!id) return undefined;
    return mockBudgetsV1.find(budget => budget.id === id);
};

// Find subscription detail by ID
export const findSubscriptionDetailById = (id: string): SubscriptionDetailV1 | undefined => {
    if (!id) return undefined;
    return mockSubscriptionDetailsV1[id];
};

// Find multiple transactions by their IDs
export const findTransactionsByIds = (ids: string[]): TransactionV1[] => {
    if (!ids || !Array.isArray(ids) || ids.length === 0) return [];
    return mockAllTransactionsV1.filter(tx => ids.includes(tx.id));
};

// Find transactions by category name (case-insensitive)
export const findTransactionsByCategory = (category: string, limit: number = 10): TransactionV1[] => {
    if (!category) return [];
    const categoryLower = category.toLowerCase();
    return mockAllTransactionsV1
        .filter(tx => tx.category.toLowerCase() === categoryLower)
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()) // Sort descending by date
        .slice(0, limit);
};

// Find transactions by account ID (sorted by date descending)
export const findTransactionsByAccountId = (accountId: string): TransactionV1[] => {
    if (!accountId) return []; // Return empty array if no accountId provided
    // Directly filter the final mockAllTransactionsV1 which includes icons and correct types
    const results = mockAllTransactionsV1
        .filter(tx => tx.accountId === accountId)
        .sort((a, b) => {
            // Combine date and time for more accurate sorting if time exists
             const dateA = new Date(`${a.date}T${a.time && a.time !== "N/A" ? a.time : '00:00:00'}`);
             const dateB = new Date(`${b.date}T${b.time && b.time !== "N/A" ? b.time : '00:00:00'}`);
             const timeA = !isNaN(dateA.getTime()) ? dateA.getTime() : 0;
             const timeB = !isNaN(dateB.getTime()) ? dateB.getTime() : 0;
             return timeB - timeA; // Descending order (most recent first)
        });

    // ***** START DEBUG LOGGING *****
    console.log(`[findTransactionsByAccountId] Found ${results.length} txs for accountId: ${accountId}. Sample (first 3):`,
        results.slice(0, 3).map(tx => ({
            id: tx?.id,
            merchant: tx?.merchantName,
            logoUrl: tx?.merchantLogoUrl, // Check the value here
            logoUrlType: typeof tx?.merchantLogoUrl
        }))
    );
    // ***** END DEBUG LOGGING *****

    return results; // Return the sorted, filtered results
};

// Finder function for London transactions (example of more complex filtering)
export const findLondonTransactions = (query: string = "london", limit: number = 10): TransactionV1[] => {
    const queryLower = query.toLowerCase();
    // Using mockAllTransactionsV1 as the base data source
    return mockAllTransactionsV1
        .filter(tx =>
            tx.currency === 'GBP' ||
            (tx.address && tx.address.toLowerCase().includes('london')) || // Check address
            (tx.merchantName && tx.merchantName.toLowerCase().includes(queryLower)) || // Check merchant name
            (tx.notes && tx.notes.toLowerCase().includes(queryLower)) // Optionally check notes
        )
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()) // Sort descending
        .slice(0, limit); // Apply limit
};