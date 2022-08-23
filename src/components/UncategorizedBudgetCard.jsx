import { useBudgets } from "../contexts/BudgetsContext";
import BudgetCard from "./BudgetCard";

// making UncategorizedBudget Card 
// it will have total of Uncategorized
// no max no bar [x]
// add expense and view expense yes
export default function UncategorizedBudgetCard({expenses}) {
  const { getBudgetExpenses } = useBudgets()


  const amount = () => {
     return getBudgetExpenses("uncategorized").reduce((a,b) => a+ parseFloat(b.amount), 0)
  }
  console.log('amount:',typeof amount())
//  console.log(' getBudgetExpenses("uncategorized"):',  getBudgetExpenses("uncategorized"))
  return (
    <BudgetCard name ="Uncategorized" amount = {amount()} gray />
  )
}
