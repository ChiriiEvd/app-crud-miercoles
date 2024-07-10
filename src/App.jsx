import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Row, Col, Container, Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'; // Import the CSS file for custom styles

function App() {
  const [reminders, setReminders] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [important, setImportant] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    const newReminder = { title, description, date, important };

    if (editIndex !== null) {
      const newReminders = [...reminders];
      newReminders[editIndex] = newReminder;
      setReminders(newReminders);
      setEditIndex(null);
    } else {
      setReminders([...reminders, newReminder]);
    }

    setTitle('');
    setDescription('');
    setDate('');
    setImportant(false);
  };

  const handleDelete = (index) => {
    const newReminders = [...reminders];
    newReminders.splice(index, 1);
    setReminders(newReminders);
  };

  const handleEdit = (index) => {
    setTitle(reminders[index].title);
    setDescription(reminders[index].description);
    setDate(reminders[index].date);
    setImportant(reminders[index].important);
    setEditIndex(index);
  };

  return (
    <Container className="app-container">
      <Row className="justify-content-center">
        <Col md={8}>
          <Form onSubmit={handleSubmit} className="form-container">
            <Form.Group className="mb-3">
              <Form.Label>Recordatorio</Form.Label>
              <Form.Control placeholder="Ingrese Título" value={title} onChange={(e) => setTitle(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Descripción </Form.Label>
              <Form.Control placeholder="Ingrese Descripción" value={description} onChange={(e) => setDescription(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Fecha </Form.Label>
              <Form.Control type="date" value={date} onChange={(e) => setDate(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Check type="checkbox" label="Importante" checked={important} onChange={(e) => setImportant(e.target.checked)} />
            </Form.Group>
            <Button type="submit" className="submit-button">
              {editIndex !== null ? "Actualizar Recordatorio" : "Agregar Recordatorio"}
            </Button>
          </Form>
        </Col>
      </Row>
      <Row className="justify-content-center" style={{ padding: 10 }}>
        {reminders.map((reminder, index) => (
          <Col md={8} key={index}>
            <Card className={`reminder-card ${reminder.important ? 'important' : ''}`}>
              <Card.Body>
                <Card.Title>{reminder.title}</Card.Title>
                <Card.Text>{reminder.description}</Card.Text>
                <Card.Text>Fecha: {reminder.date}</Card.Text>
                {reminder.important && <Card.Text className="important-text">¡Importante!</Card.Text>}
                <Button variant="danger" onClick={() => handleDelete(index)} className="action-button">Eliminar</Button>
                <Button variant="warning" onClick={() => handleEdit(index)} className="action-button">Modificar</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default App;
