import Container from "./ui/Container";

export default function Loading() {
  return (
    <Container>
      <div className="d-flex flex-column align-items-center">
        <h3 data-testid="loading">Loading data from api...</h3>
      </div>
    </Container>
  );
}
