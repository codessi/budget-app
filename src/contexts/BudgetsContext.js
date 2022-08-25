import { createContext, useContext, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useLocalStorage } from "./../hooks/useLocalStorge";

export const BudgetsContext = createContext();

export const UNCATEGORIZED_BUDGET_ID = "uncategorized";

export const useBudgets = () => {
  return useContext(BudgetsContext);
};

export const BudgetsContextProvider = ({ children }) => {
  const [budgets, setBudgets] = useLocalStorage("budgets", []);
  const [expenses, setExpenses] = useLocalStorage("expenses", []);

  const getUncategorizedExpenses = (budgetId) => {
    if (budgets === [])
      return expenses.filter((expense) => expense.budgetId == budgetId);
    return [];
  };

  const getBudgetExpenses = (budgetId) => {
    //if budgetId of exp does exit in budget list
    if (budgetId === UNCATEGORIZED_BUDGET_ID) {
      let array = [];
      if (budgets !==[])
      {budgets.forEach((budget) => {
        const found = expenses.find(
          (expense) => expense.budgetId !== budget.budgetId
        );
        // found that budge that has not same as id
        console.log("found is ", found);

        array.push(parseFloat(found.amount));
      });
       
      // if (budgets ===[])  {return array;}
      }
      return expenses.map(expense => parseFloat(expense.amount)) 
    }
    return expenses.filter((expense) => expense.budgetId === budgetId);
  };

  const addExpense = ({ amount, description, budgetId }) => {
    setExpenses((prevExpesne) => [
      ...prevExpesne,
      { id: uuidv4(), amount, description, budgetId },
    ]);
  };
  const addBudget = ({ name, max }) => {
    setBudgets((prevBudgets) => {
      if (budgets.find((budget) => budget.name === name)) {
        return prevBudgets;
      }
      return [...prevBudgets, { budgetId: uuidv4(), name, max }];
    });
  };

  const deleteBudget = (budgetId) => {
    setBudgets((prevBudgets) => {
      return prevBudgets.filter((budget) => budget.budgetId !== budgetId);
    });
  };
  const deleteExpense = (id) => {
    setExpenses((prevExpenses) => {
      return prevExpenses.filter((expense) => expense.id !== id);
    });
  };

  return (
    <BudgetsContext.Provider
      value={{
        budgets,
        expenses,
        getBudgetExpenses,
        addExpense,
        addBudget,
        deleteBudget,
        deleteExpense,
        getUncategorizedExpenses,
      }}
    >
      {children}
    </BudgetsContext.Provider>
  );
};
