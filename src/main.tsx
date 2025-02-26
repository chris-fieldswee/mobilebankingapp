import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './index.css'
import i18next from 'i18next'
import { initReactI18next } from 'react-i18next'

// Import translations
const enTranslations = {
  "nav": {
    "home": "Home",
    "payments": "Payments",
    "advisor": "Advisor",
    "card": "Card",
    "search": "Search..."
  },
  "actions": {
    "addMoney": "Add Money",
    "transfer": "Transfer",
    "details": "Details",
    "seeAll": "See all"
  },
  "budget": {
    "monthlyBudget": "Monthly Budget",
    "spent": "spent",
    "goal": "goal",
    "overBudget": "over budget"
  },
  "spending": {
    "spentThisMonth": "Spent this month",
    "percentChange": "2.3%"
  },
  "transactions": {
    "recent": "Recent Transactions",
    "upcoming": "Upcoming Transactions",
    "dueIn": "Due in {{days}} days",
    "dueOn": "Due on {{date}}"
  },
  "wealth": {
    "totalWealth": "Total Wealth",
    "assets": "Assets",
    "currentAccount": "Current Account",
    "savings": "Savings"
  }
};

const arTranslations = {
  "nav": {
    "home": "الرئيسية",
    "payments": "المدفوعات",
    "advisor": "المستشار",
    "card": "البطاقة",
    "search": "بحث..."
  },
  "actions": {
    "addMoney": "إضافة أموال",
    "transfer": "تحويل",
    "details": "تفاصيل",
    "seeAll": "عرض الكل"
  },
  "budget": {
    "monthlyBudget": "الميزانية الشهرية",
    "spent": "تم إنفاق",
    "goal": "الهدف",
    "overBudget": "تجاوز الميزانية"
  },
  "spending": {
    "spentThisMonth": "تم إنفاقه هذا الشهر",
    "percentChange": "2.3%"
  },
  "transactions": {
    "recent": "المعاملات الأخيرة",
    "upcoming": "المعاملات القادمة",
    "dueIn": "مستحق خلال {{days}} أيام",
    "dueOn": "مستحق في {{date}}"
  },
  "wealth": {
    "totalWealth": "إجمالي الثروة",
    "assets": "الأصول",
    "currentAccount": "الحساب الجاري",
    "savings": "المدخرات"
  }
};

const esTranslations = {
  "nav": {
    "home": "Inicio",
    "payments": "Pagos",
    "advisor": "Asesor",
    "card": "Tarjeta",
    "search": "Buscar..."
  },
  "actions": {
    "addMoney": "Agregar Dinero",
    "transfer": "Transferir",
    "details": "Detalles",
    "seeAll": "Ver todo"
  },
  "budget": {
    "monthlyBudget": "Presupuesto Mensual",
    "spent": "gastado",
    "goal": "objetivo",
    "overBudget": "sobre presupuesto"
  },
  "spending": {
    "spentThisMonth": "Gastado este mes",
    "percentChange": "2.3%"
  },
  "transactions": {
    "recent": "Transacciones Recientes",
    "upcoming": "Próximas Transacciones",
    "dueIn": "Vence en {{days}} días",
    "dueOn": "Vence el {{date}}"
  },
  "wealth": {
    "totalWealth": "Riqueza Total",
    "assets": "Activos",
    "currentAccount": "Cuenta Corriente",
    "savings": "Ahorros"
  }
};

// Initialize i18next
i18next
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: enTranslations
      },
      ar: {
        translation: arTranslations
      },
      es: {
        translation: esTranslations
      }
    },
    lng: 'en', // default language
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

// Render the app immediately instead of waiting for i18next initialization
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
);
