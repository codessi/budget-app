import { Button, Container, Stack } from "react-bootstrap";
import AddBudgetModal from "./components/AddBudgetModal";
import BudgetCard from "./components/BudgetCard"

function App() {

  const handleClose = () => {
    
  }
  return (
    <>
      <Container className="my-4">
        <Stack direction="horizontal" gap="2" className="mb-4">
          <h1 className="me-auto">Budget</h1>
          <Button varient="primary">Add Budget</Button>
          <Button varient="primary">Add Expense</Button>
        </Stack>
        <div style= {{display: "grid", gridTemplateColumns:"Repeat(auto-fit, minmax(300px, 1fr))",gap:"1rem", alignItems:"start"}}>
          <BudgetCard name={"entertainment"} amount={800 } gray={true} max={1000} />
        </div>
      </Container>
      <AddBudgetModal show={true} handleClose={handleClose} />
    </>
  );
}

export default App;
