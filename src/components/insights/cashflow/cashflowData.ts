
// Ingresos (salary) = 5200 €
export const moneyInData = [
  { name: "salary", amount: 5200, transactions: 1, percentage: "100%" },
];

// Gastos por categoría (sum = 3600)
export const moneyOutData = [
  { name: "Restaurantes", amount: 700, transactions: 6, percentage: "19.4%" },
  { name: "Compras", amount: 450, transactions: 3, percentage: "12.5%" },
  { name: "Transporte", amount: 500, transactions: 8, percentage: "13.9%" },
  { name: "Entretenimiento", amount: 350, transactions: 2, percentage: "9.7%" },
  { name: "Comestibles", amount: 800, transactions: 5, percentage: "22.2%" },
  { name: "Facturas", amount: 600, transactions: 3, percentage: "16.7%" },
  { name: "Bienestar", amount: 200, transactions: 2, percentage: "5.6%" },
];

// Total gastado = 3600
export const totalExpenses = moneyOutData.reduce((sum, item) => sum + item.amount, 0);

// Saldo actual = 5200 - 3600 = 1600
export const currentBalance = moneyInData[0].amount - totalExpenses;

// Próximas transacciones (ejemplo)
export const upcomingTransactions = [
  { name: "Matrícula Universitaria", amount: 8000, dueIn: "5 días" },
  { name: "Suscripción a Netflix", amount: 15, dueIn: "3 días" },
  { name: "Spotify Premium", amount: 10, dueIn: "7 días" },
];

// Suma de próximas transacciones
export const upcomingTotal = upcomingTransactions.reduce((sum, tx) => sum + tx.amount, 0);

// Saldo proyectado
export const predictedBalance = currentBalance - upcomingTotal;
