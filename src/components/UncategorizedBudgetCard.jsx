import { useBudgets } from "../contexts/BudgetsContext";
import BudgetCard from "./BudgetCard";
import { UNCATEGORIZED_BUDGET_ID } from "../contexts/BudgetsContext";

// how does it work
// 
export default function UncategorizedBudgetCard({expenses, onAddExpenseClick, onViewExpensesClick}) {
  const { getBudgetExpenses,getUncategorizedExpense } = useBudgets()


  const amount =  getBudgetExpenses(UNCATEGORIZED_BUDGET_ID).reduce((a,b) => a+ parseFloat(b.amount), 0)
  
  return (
    <BudgetCard name={UNCATEGORIZED_BUDGET_ID} amount={amount} gray onAddExpenseClick={onAddExpenseClick,getUncategorizedExpense}
      onViewExpensesClick={ onViewExpensesClick} />
  )
}
