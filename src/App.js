import { useState } from "react";
import { Button, Container, Stack } from "react-bootstrap";
import AddBudgetModal from "./components/AddBudgetModal";
import AddExpenseModal from "./components/AddExpenseModal";
import BudgetCard from "./components/BudgetCard";
import { useBudgets } from "./contexts/BudgetsContext";
import UncategorizedBudgetCard from "./components/UncategorizedBudgetCard";

function App() {
  const [showAddBudgetModal, setShowAddBudgetModal] = useState(true);
  const [showAddExpenseModal, setShowAddExpenseModal] = useState(false);
  const [addExpenseModalBudgetId, setAddExpenseModalBudgetId] = useState("asdf");

  const openAddExpenseModal = (budgetId) => {
    setShowAddExpenseModal(true);
    setAddExpenseModalBudgetId(budgetId);
  };

  const { budgets, getBudgetExpenses } = useBudgets();
   
  const amount = (budgetId) => {
    const expenseObjArr = getBudgetExpenses(budgetId);
   const result = expenseObjArr.reduce((total, expense) => {
      
      return parseFloat(total + expense.amount)
    }, 0);

    return result
  };


  return (
    <>
      <Container className="my-4">
        <Stack direction="horizontal" gap="2" className="mb-4">
          <h1 className="me-auto">Budget</h1>
          <Button varient="primary" onClick={() => setShowAddBudgetModal(true)}>
            Add Budget
          </Button>
          <Button varient="primary" onClick={openAddExpenseModal}>
            Add Expense
          </Button>
        </Stack>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "Repeat(auto-fit, minmax(300px, 1fr))",
            gap: "1rem",
            alignItems: "start",
          }}
        >
          {budgets.map((budget) => (
            <BudgetCard
              key={budget.budgetId}
              name={budget.name}
              amount={amount(budget.budgetId) }
              gray={true}
              max={budget.max}
              onAddExpenseClick = {() => openAddExpenseModal(budget.budgetId)}
            />
          ))}
          <UncategorizedBudgetCard  />
        </div>
      </Container>
      <AddBudgetModal
        show={showAddBudgetModal}
        handleClose={() => setShowAddBudgetModal(false)}
      />
      <AddExpenseModal
        show={showAddExpenseModal}
        handleClose={() => setShowAddExpenseModal(false)}
        defaultBudgetId={addExpenseModalBudgetId}

      />
    </>
  );
}

export default App;
