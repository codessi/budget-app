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
   // check first if budgetId has category
    // const expenseWithBudget = budgets.find(budget => budget.budgetID === budgetId)
    
    // if(expenseWithBudget){
    //   return expenses.filter((expense) => expense.budgetId === budgetId);
    // }
    // if budgetId we prvide  find in budget 
    // then take that expense filter
    return expenses.filter((expense) => expense.budgetId === budgetId)
    // if expense doesn hav cata then 
    // fiter all expesn
    
  };
  const getUncategorizedExpense = () => {
    const uncategorizedExpense =[]
    // go through each expense
    // make array of budgetId
      const budgetIds = budgets.map(budget => budget.bugetId)
    // check exp1 is part of budgetIds
      //  budgetIds.include(exp[2].budgetId)
    // exp1 
  }
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

  const deleteBudget = (budgetId) => {
    setBudgets(prevBudgets => {
      return prevBudgets.filter(budget => budget.budgetId !== budgetId)
    })
   
    // const filtered = budgets.filter(budget => budget.budgetId !== budgetId)
    // setBudgets(filtered)
    //  console.log(filtered, "from context delete")
  };
  const deleteExpense = (id) => {
    setExpenses(prevExpenses => {
      return prevExpenses.filter(expense => expense.id !== id)
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
        getUncategorizedExpense
      }}
    >
      {children}
    </BudgetsContext.Provider>
  );
};
