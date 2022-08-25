import { useBudgets } from "../contexts/BudgetsContext";
import BudgetCard from "./BudgetCard";
import { UNCATEGORIZED_BUDGET_ID } from "../contexts/BudgetsContext";

// how does it work
//
export default function UncategorizedBudgetCard({
  expenses,
  onAddExpenseClick,
  onViewExpensesClick,
}) {
  const { getBudgetExpenses, getUncategorizedExpenses } = useBudgets();

  const amount1 = getBudgetExpenses(UNCATEGORIZED_BUDGET_ID).reduce(
    (a, b) => a + b,
    0
  )


  const amount2 =getUncategorizedExpenses(UNCATEGORIZED_BUDGET_ID).reduce(
    (a, b) => a + parseFloat(b.amount),
    0
    );
  // console.log("uncat ", typeof amount1[0])

  return (
    <BudgetCard
      name={UNCATEGORIZED_BUDGET_ID}
      amount={amount1+amount2}
      gray
      onAddExpenseClick={onAddExpenseClick}
      onViewExpensesClick={onViewExpensesClick}
    />
  );
}
