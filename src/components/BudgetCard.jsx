import React from "react";
import { Button, Card, ProgressBar, Stack } from "react-bootstrap";
import { currencyFormatter } from "../utils";

export default function BudgetCard({
  name,
  amount,
  max,
  gray,
  onAddExpenseClick,
  noButton,
  onViewExpensesClick,
}) {
  const classNames = [];

  if (amount > max) {
    classNames.push("bg-danger", "bg-opacity-10");
  } else if (gray) {
    classNames.push("bg-light");
  }

  return (
    <Card className={classNames.join(" ")}>
      <Card.Body>
        <Card.Title className="d-flex justify-content-between align-items-baseline fw-normal mb-3">
          <div className="me-2">{name} </div>
          <div className="d-flex align-items-baseline">
            {currencyFormatter.format(amount)}
            {max ? (
              <>
                /
                <span className="fs-6 text-muted ms-1">
                  {" "}
                  {currencyFormatter.format(max)}
                </span>
              </>
            ) : (
              <></>
            )}
          </div>
        </Card.Title>

        {max ? (
          <ProgressBar
            min={0}
            max={max}
            now={amount}
            className="rounded-pill"
            variant={getProgressBarVarient(amount, max)}
          />
        ) : (
          <></>
        )}

        <Stack
          direction="horizontal"
          gap="2"
          className="mt-4 justify-content-end "
        >
          {noButton ? (
            <></>
          ) : (
            <>
              <Button
                variant="outline-primary"
                className="ms-auto"
                onClick={onAddExpenseClick}
              >
                Add Expense
              </Button>{" "}
            </>
          )}
          <Button
            variant="outline-secondary"
            className="ms-1"
            onClick={onViewExpensesClick}
          >
            View Expense
          </Button>
        </Stack>
      </Card.Body>
    </Card>
  );
}

const getProgressBarVarient = (amount, max) => {
  let ratio = amount / max;

  return ratio < 0.5 ? "primary" : ratio < 0.75 ? "warning" : "danger";
};
