import { createContext, useContext, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import {useLocalStorage} from './../hooks/useLocalStorge'

export const BudgetsContext = createContext();

export const UNCATEGORIZED_BUDGET_ID = "uncategorized" 


export const useBudgets = () => {
  return useContext(BudgetsContext);
};

export const BudgetsContextProvider = ({ children }) => {
  const [budgets, setBudgets] = useLocalStorage("budgets", []);
  const [expenses, setExpenses] = useLocalStorage("expenses", []);

  const getBudgetExpenses = ( budgetId ) => {
   
    return expenses.filter((expense) => expense.budgetId === budgetId);
  };
  // this creates an array of all the expese object is intit ? then a it will 
  const addExpense = ({amount, description, budgetId}) => {
    setExpenses((prevExpesne) => [
      ...prevExpesne,
      { id: uuidv4(), amount, description, budgetId },
    ]);
  };
  const addBudget = ({name, max}) => {
    setBudgets(prevBudgets => {
      if (budgets.find(budget => budget.name === name)) {
        return prevBudgets
      }
      return [...prevBudgets, {budgetId: uuidv4(), name, max}]
    })
  };

  const deleteBudget = ({budgetId}) => {
    setBudgets(prevBudgets => {
      prevBudgets.filter(budget => budget.budgetId === budgetId)
    })
    
  };
  const deleteExpense = (id) => {
    setExpenses(prevExpenses => {
      prevExpenses.filter(expense => expense.id === id)
    })
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
      }}
    >
      {children}
    </BudgetsContext.Provider>
  );
};