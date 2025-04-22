// src/data/goalsBudgetsData.ts

import React from 'react';
// Import Lucide icons needed for Goals and Budgets
import {
    ShoppingCart, Utensils, Car, ShoppingBag, // Budgets
    ShieldCheck, Landmark, Laptop // Goals
} from 'lucide-react';

// --- TransactionV1 Interface (needed for the main list) ---
export interface TransactionV1 {
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

// --- GoalV1 Interface (Add relatedTransactionIds) ---
export interface GoalV1 {
  id: string;
  title: string;
  targetAmount: number;
  currentAmount: number;
  currency: string;
  icon?: React.ElementType;
  deadline?: string;
  relatedTransactionIds?: string[]; // <-- ADDED: IDs of related transactions
}

// --- BudgetV1 Interface (No changes needed here if filtering by category) ---
export interface BudgetV1 {
  id: string;
  category: string;
  allocated: number;
  spent: number;
  currency: string;
  period: string;
  icon?: React.ElementType;
}

// --- *** Centralized Transaction List (Moved from TransactionDetails) *** ---
// Populated from your transactions_array - Sheet1.csv data
export const mockAllTransactionsV1: TransactionV1[] = [
  { id: "t1", merchantName: "Tamimi Markets", amount: -287.5, currency: "SAR", type: "expense", category: "Groceries", date: "2025-04-21", time: "5:15 PM", status: "completed", latitude: 24.7136, longitude: 46.6753, address: "123 King Fahd Rd, Riyadh 12211, Saudi Arabia", notes: "Weekly grocery shopping", cardLastFour: "4432" },
  { id: "t2", merchantName: "Jarir Bookstore", amount: -190.0, currency: "SAR", type: "expense", category: "Shopping", date: "2025-04-21", time: "4:15 PM", status: "completed", latitude: 24.72, longitude: 46.68, address: "456 Olaya St, Riyadh 54321, Saudi Arabia", notes: "Purchased new notebook.", cardLastFour: "1122" },
  { id: "t3", merchantName: "Al Baik", amount: -89.9, currency: "SAR", type: "expense", category: "Food & Drink", date: "2025-04-19", time: "8:45 PM", status: "completed", latitude: 24.7139, longitude: 46.6689, address: "789 Takhassusi St, Riyadh 12345, Saudi Arabia", notes: "Dinner with friends", cardLastFour: "3222" },
  { id: "t4", merchantName: "Uber", amount: -66.5, currency: "SAR", type: "expense", category: "Transport", date: "2025-04-21", time: "12:57 PM", status: "completed", latitude: 24.7131, longitude: 46.675, address: "Pickup: 101 King Saud Rd, Riyadh", notes: "Ride to client meeting", cardLastFour: "1896" },
  { id: "t5", merchantName: "STC", amount: -199.0, currency: "SAR", type: "expense", category: "Utilities", date: "2025-04-15", time: "10:00 AM", status: "completed", latitude: 24.713, longitude: 46.6755, address: "321 King Abdullah Rd, Riyadh 11564, Saudi Arabia", notes: "Mobile bill payment", cardLastFour: "8622" },
  { id: "t6", merchantName: "Apple Store", amount: -1799.0, currency: "SAR", type: "expense", category: "Shopping", date: "2025-04-17", time: "6:05 PM", status: "completed", latitude: 24.7112, longitude: 46.6745, address: "222 Riyadh Park Mall, Riyadh 13511, Saudi Arabia", notes: "Bought AirPods Pro", cardLastFour: "4432" },
  { id: "t7", merchantName: "Careem", amount: -44.41, currency: "SAR", type: "expense", category: "Transport", date: "2025-04-15", time: "3:30 PM", status: "completed", latitude: 24.726, longitude: 46.67, address: "Pickup: 654 Airport Rd, Riyadh", notes: "Ride from airport", cardLastFour: "1122" },
  { id: "t8", merchantName: "Amazon.sa", amount: -219.4, currency: "SAR", type: "expense", category: "Shopping", date: "2025-04-15", time: "11:12 AM", status: "completed", latitude: 24.7137, longitude: 46.6758, address: "Delivery: 12 King Salman Rd, Riyadh", notes: "Office supplies order", cardLastFour: "3222" },
  { id: "t9", merchantName: "Saudi Electricity Co.", amount: -427.8, currency: "SAR", type: "expense", category: "Utilities", date: "2025-04-14", time: "9:30 PM", status: "completed", latitude: 24.7138, longitude: 46.6759, address: "100 Power Ave, Riyadh 11564, Saudi Arabia", notes: "Monthly electricity bill", cardLastFour: "8622" },
  { id: "t10", merchantName: "McDonald's", amount: -55.0, currency: "SAR", type: "expense", category: "Food & Drink", date: "2025-04-16", time: "1:10 PM", status: "completed", latitude: 24.715, longitude: 46.678, address: "321 Tahlia St, Riyadh 12333, Saudi Arabia", notes: "Lunch", cardLastFour: "4432" },
  { id: "t11", merchantName: "Riyadh Cinema City", amount: -210.0, currency: "SAR", type: "expense", category: "Entertainment", date: "2025-04-13", time: "9:00 PM", status: "completed", latitude: 24.7122, longitude: 46.6733, address: "88 Cinema Rd, Riyadh 11564, Saudi Arabia", notes: "Movie tickets for family", cardLastFour: "1896" },
  { id: "t12", merchantName: "Zain", amount: -299.0, currency: "SAR", type: "expense", category: "Utilities", date: "2025-04-11", time: "8:45 AM", status: "completed", latitude: 24.7132, longitude: 46.676, address: "555 Telecom St, Riyadh 11461, Saudi Arabia", notes: "Home internet bill", cardLastFour: "3222" },
  { id: "t13", merchantName: "Pharmacy Plus", amount: -87.3, currency: "SAR", type: "expense", category: "Health", date: "2025-04-20", time: "7:20 PM", status: "completed", latitude: 24.714, longitude: 46.679, address: "77 Health Ave, Riyadh 12321, Saudi Arabia", notes: "Prescription refill", cardLastFour: "8622" },
  { id: "t14", merchantName: "Saudi Post", amount: -32.0, currency: "SAR", type: "expense", category: "Services", date: "2025-04-14", time: "2:00 PM", status: "completed", latitude: 24.7135, longitude: 46.6752, address: "23 Post St, Riyadh 11564, Saudi Arabia", notes: "Sent documents", cardLastFour: "4432" },
  { id: "t15", merchantName: "SNB Loan Payment", amount: -2300.0, currency: "SAR", type: "expense", category: "Transfer", date: "2025-04-10", time: "10:00 AM", status: "completed", latitude: 24.7133, longitude: 46.6756, address: "1 SNB Tower, Riyadh 11564, Saudi Arabia", notes: "Car loan installment", cardLastFour: "1122" },
  { id: "t16", merchantName: "Starbucks", amount: -38.0, currency: "SAR", type: "expense", category: "Food & Drink", date: "2025-04-20", time: "8:30 AM", status: "completed", latitude: 24.7155, longitude: 46.6785, address: "234 Coffee St, Riyadh 12345, Saudi Arabia", notes: "Morning coffee", cardLastFour: "4432" },
  { id: "t17", merchantName: "Noon.com", amount: -320.0, currency: "SAR", type: "expense", category: "Shopping", date: "2025-04-18", time: "2:55 PM", status: "completed", latitude: 24.7134, longitude: 46.6754, address: "Delivery: 50 King Khalid Rd, Riyadh", notes: "Electronics order", cardLastFour: "3222" },
  { id: "t18", merchantName: "Lulu Hypermarket", amount: -152.75, currency: "SAR", type: "expense", category: "Groceries", date: "2025-04-12", time: "5:50 PM", status: "completed", latitude: 24.7142, longitude: 46.6792, address: "456 Lulu Ave, Riyadh 12345, Saudi Arabia", notes: "Snacks and essentials", cardLastFour: "8622" },
  { id: "t19", merchantName: "Netflix", amount: -69.0, currency: "SAR", type: "expense", category: "Entertainment", date: "2025-04-16", time: "10:42 PM", status: "completed", latitude: undefined, longitude: undefined, address: "Online", notes: "Monthly subscription", cardLastFour: "1122" },
  { id: "t20", merchantName: "Fuel Station", amount: -164.8, currency: "SAR", type: "expense", category: "Transport", date: "2025-04-22", time: "7:42 PM", status: "completed", latitude: 24.721, longitude: undefined, address: undefined, notes: undefined, cardLastFour: undefined },
  // Add a few income/transfer examples potentially related to goals
  { id: "inc1", merchantName: "Monthly Savings Transfer", amount: 2000, currency: "SAR", type: "income", category: "Savings", date: "2025-04-01", time: "10:00 AM", status: "completed"},
  { id: "inc2", merchantName: "Bonus Received", amount: 5000, currency: "SAR", type: "income", category: "Income", date: "2025-03-15", time: "11:00 AM", status: "completed"},
  { id: "inc3", merchantName: "Monthly Savings Transfer", amount: 2000, currency: "SAR", type: "income", category: "Savings", date: "2025-03-01", time: "10:00 AM", status: "completed"},
];

// --- Updated mockGoalsV1 (Adding relatedTransactionIds) ---
export const mockGoalsV1: GoalV1[] = [
   {
     id: "g1", title: "Emergency Fund", targetAmount: 20000, currentAmount: 15750, currency: "SAR", icon: ShieldCheck, deadline: "Dec 2025",
     relatedTransactionIds: ["inc1", "inc3"] // Example: Link savings transfers
    },
   {
     id: "g2", title: "Hajj Fund", targetAmount: 35000, currentAmount: 12340, currency: "SAR", icon: Landmark, deadline: "July 2026",
     relatedTransactionIds: ["inc2"] // Example: Link bonus
    },
   {
     id: "g3", title: "New Laptop", targetAmount: 7000, currentAmount: 6850, currency: "SAR", icon: Laptop,
     relatedTransactionIds: ["t6", "t2"] // Example: Link related shopping transactions (or maybe savings deposits)
    },
];

// --- mockBudgetsV1 (remains same as previous fix) ---
export const mockBudgetsV1: BudgetV1[] = [
  { id: "b1", category: "Groceries", allocated: 1500, spent: 1125.75, currency: "SAR", period: "Monthly", icon: ShoppingCart },
  { id: "b2", category: "Food & Drink", allocated: 800, spent: 785.50, currency: "SAR", period: "Monthly", icon: Utensils },
  { id: "b3", category: "Transport", allocated: 500, spent: 325.80, currency: "SAR", period: "Monthly", icon: Car },
  { id: "b4", category: "Shopping", allocated: 1000, spent: 950.00, currency: "SAR", period: "Monthly", icon: ShoppingBag },
];

// --- Helper Functions (Keep formatCurrencyV1) ---
export const formatCurrencyV1 = (amount: number, currency: string) => {
    // ... (implementation unchanged)
    const numberFormatter = new Intl.NumberFormat('en-US', { style: 'decimal', minimumFractionDigits: 2, maximumFractionDigits: 2 });
    const symbol = currency === 'SAR' ? ' SAR' : ` ${currency}`;
    return `${numberFormatter.format(amount)}${symbol}`;
};

// --- Finder Functions (Keep findGoalById, findBudgetById) ---
export const findGoalById = (id: string): GoalV1 | undefined => {
  return mockGoalsV1.find(goal => goal.id === id);
};
export const findBudgetById = (id: string): BudgetV1 | undefined => {
  return mockBudgetsV1.find(budget => budget.id === id);
};

// --- NEW: Helper to find multiple transactions by IDs ---
export const findTransactionsByIds = (ids: string[]): TransactionV1[] => {
    if (!ids || ids.length === 0) return [];
    return mockAllTransactionsV1.filter(tx => ids.includes(tx.id));
};

// --- NEW: Helper to find transactions by category ---
export const findTransactionsByCategory = (category: string, limit: number = 10): TransactionV1[] => {
    if (!category) return [];
    return mockAllTransactionsV1
        .filter(tx => tx.category.toLowerCase() === category.toLowerCase())
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()) // Sort newest first
        .slice(0, limit); // Limit results
}