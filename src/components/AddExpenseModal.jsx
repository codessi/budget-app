import { Button, Form, Modal } from "react-bootstrap";
import { useRef } from "react";
import { UNCATEGORIZED_BUDGET_ID, useBudgets } from "../contexts/BudgetsContext";
export default function AddExpenseModal({ show, handleClose, defaultBudgetId }) {
  

  const { addExpense, budgets } = useBudgets();

  const amountRef = useRef();
  const descriptionRef = useRef();
  const budgetIdRef = useRef();


  const handleSubmit = (e) => {
    e.preventDefault();
    addExpense({

      description: descriptionRef.current.value,
      amount: amountRef.current.value,
      budgetId: budgetIdRef.current.value 
    });
    

    handleClose();
    
  };

    // console.log("fromExpensModal  ",budgetIdRef?.current?.value)

  return (
    <Modal show={show} onHide={handleClose}>
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>New Expense</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3" controlId="name">
            <Form.Label>Description</Form.Label>
            <Form.Control
              ref={descriptionRef}
              placeholder="Description"
              type="text"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="max">
            <Form.Label>Amount</Form.Label>
            <Form.Control
              ref={amountRef}
              placeholder="Maximum Spending"
              type="number"
              min={0}
              step={0.01}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="max">
            <Form.Label>Budget</Form.Label>
            <Form.Select ref={budgetIdRef} defaultValue={defaultBudgetId} aria-label="Default blah example">
              <option id= {UNCATEGORIZED_BUDGET_ID}>uncategorized </option>
              {budgets.map(budget => (
                <option key={budget.budgetId } value ={budget.budgetId} >{budget.name}</option>
              ))}
          
            </Form.Select>
            
          </Form.Group>

          <div className="d-flex justify-content-end">
            <Button variant="primary" type="submit">
              Add
            </Button>
          </div>
        </Modal.Body>
      </Form>
    </Modal>
  );
}
