import { useState } from "react";
import { Button, Container, Stack } from "react-bootstrap";
import AddBudgetModal from "./components/AddBudgetModal";
import AddExpenseModal from "./components/AddExpenseModal";
import BudgetCard from "./components/BudgetCard";
import { UNCATEGORIZED_BUDGET_ID, useBudgets } from "./contexts/BudgetsContext";
import UncategorizedBudgetCard from "./components/UncategorizedBudgetCard";
import TotalBudgetCard from "./components/TotalBudgetCard";
import ViewExpensesModal from "./components/ViewExpensesModal";
// test test
function App() {
  const [showAddBudgetModal, setShowAddBudgetModal] = useState(false);
  const [showAddExpenseModal, setShowAddExpenseModal] = useState(false);
  const [showViewExpensesModal, setShowViewExpensesModal] = useState(false);

  const [addExpenseModalBudgetId, setAddExpenseModalBudgetId] =
    useState();
  const [viewExpensesModalBudgetId, setViewExpensesModalBudgetId] = useState();

  const openAddExpenseModal = (budgetId) => {
    setShowAddExpenseModal(true);
    setAddExpenseModalBudgetId(budgetId);
  };
  const openViewExpensesModal = (budgetId) => {
    setShowViewExpensesModal(true);
    setViewExpensesModalBudgetId(budgetId);
  };

  const { budgets, getBudgetExpenses } = useBudgets();

  const amount = (budgetId) => {
    const expenseObjArr = getBudgetExpenses(budgetId);
    const result = expenseObjArr.reduce((total, expense) => {
      return total + parseFloat( expense.amount);
    }, 0);

    return result;
  };

  return (
    <>
      <Container className="my-4 w-75">
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
              amount={amount(budget.budgetId)}
              gray={true}
              max={budget.max}
              onAddExpenseClick={() => openAddExpenseModal(budget.budgetId)}
              onViewExpensesClick={() => openViewExpensesModal(budget.budgetId)}
            />
          ))}
          <UncategorizedBudgetCard
            onAddExpenseClick={() =>
              openAddExpenseModal(UNCATEGORIZED_BUDGET_ID)
            }
            onViewExpensesClick={() =>
              openViewExpensesModal(UNCATEGORIZED_BUDGET_ID)
            }
          />
          <TotalBudgetCard   onViewExpensesClick={() =>
              openViewExpensesModal()
            } />
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

      <ViewExpensesModal
        show={showViewExpensesModal}
        handleClose={() => setShowViewExpensesModal(false)}
        budgetId={viewExpensesModalBudgetId}
      />
    </>
  );
}

export default App;
