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

    //if budgetId of exp does exit in budget list 
    if (budgetId === UNCATEGORIZED_BUDGET_ID) {
      let array = []
      expenses.forEach(expense => 
      {
        const found = budgets.find(budget => budget.budgetId !== expense.budgetId)
        if(found){array.push(expense)}
      }
        
        )
        console.log(array)
      // budgets
      return array
    }
    return expenses.filter((expense) => expense.budgetId === budgetId)

    
  };
  const getUncategorizedExpense = () => {
    const uncategorizedExpense =[]
  
      const budgetIds = budgets.map(budget => budget.bugetId)

  }

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

    console.log(budgetId)
   
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
