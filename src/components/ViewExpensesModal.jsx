import { Button, Modal } from "react-bootstrap";

import {
  UNCATEGORIZED_BUDGET_ID,
  useBudgets,
} from "../contexts/BudgetsContext";
import { currencyFormatter } from "./../utils";

export default function ViewExpensesModal({ show, handleClose, budgetId }) {
  const { getBudgetExpenses, expenses, deleteBudget, deleteExpense, budgets } =
    useBudgets();

  let expensesArr = () => {
    if (budgetId !== undefined) {
      return getBudgetExpenses(budgetId);
    }
    return expenses;
  };
  
  expensesArr = expensesArr();

  const handleDeleteBudget = () => {
    // match the  BudgetId
    deleteBudget(budgetId);

    };
  const handleDeleteExpense = (expenseId) => {
    deleteExpense(expenseId);
  };

  // 
  let name;

  if (budgetId == UNCATEGORIZED_BUDGET_ID) {
    name = "Uncategorized";
  } else if (budgetId == undefined) {
    name = "All";
  } else if(budgetId){
    name = budgets?.find((obj) => obj.budgetId === budgetId)?.name;
  }



  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{name} Expense </Modal.Title>
        { budgetId !== UNCATEGORIZED_BUDGET_ID && budgetId !== undefined ?<Button size="sm" className="ms-auto" onClick={handleDeleteBudget}>
          Delete Budget
        </Button>: <></>}
      </Modal.Header>
      <Modal.Body>
        <div>
          {expensesArr.map((expense) => (
            <div key={expense.id}>
              <div className="mx-3 my-2 d-flex align-items-baseline  ">
                <div className="w-75">{expense.description}</div>
                <div className="me-4 w-25" style={{ textAlign: "right" }}>
                  {currencyFormatter.format(expense.amount)}
                </div>
                <Button
                  variant="outline-primary"
                  size="sm"
                  onClick={() => handleDeleteExpense(expense.id)}
                >
                  x
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Modal.Body>
    </Modal>
  );
}
