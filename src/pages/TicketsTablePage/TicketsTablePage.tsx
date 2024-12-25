import {Button, Col, Container, Form, Input, Row} from "reactstrap";
import {ChangeEvent, useEffect} from "react";
import {useAppDispatch, useAppSelector} from "store/store.ts";
import {fetchTickets, updateTicketName} from "store/slices/ticketsSlice.ts";
import {Link, useNavigate} from "react-router-dom";
import TicketsTable from "components/TicketsTable/TicketsTable.tsx";

const TicketsTablePage = () => {

    const dispatch = useAppDispatch()

    const navigate = useNavigate()

    const {is_authenticated, is_superuser} = useAppSelector((state) => state.user)

    const {tickets, ticket_name} = useAppSelector((state) => state.tickets)

    const handleChange = (e:ChangeEvent<HTMLInputElement>) => {
        dispatch(updateTicketName(e.target.value))
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(fetchTickets())
    }

    useEffect(() => {
        dispatch(fetchTickets())
    }, [])

    useEffect(() => {
        if (!is_superuser) {
            navigate("/403/")
        }
    }, [is_authenticated, is_superuser]);

    return (
        <Container>
            <Row className="mb-5">
                <Col md="6">
                    <Form onSubmit={handleSubmit}>
                        <Row>
                            <Col xs="8">
                                <Input value={ticket_name} onChange={handleChange} placeholder="Поиск..."></Input>
                            </Col>
                            <Col>
                                <Button color="primary" className="w-100 search-btn">Поиск</Button>
                            </Col>
                        </Row>
                    </Form>
                </Col>
                <Col className="d-flex flex-row justify-content-end" md="6">
                    <Link to="/tickets/add">
                        <Button color="primary">Новый билет</Button>
                    </Link>
                </Col>
            </Row>
            <Row className="mt-5 d-flex">
                {tickets.length > 0 ? <TicketsTable tickets={tickets} fetchTickets={fetchTickets}/> : <h3 className="text-center mt-5">Билеты не найдены</h3>}
            </Row>
        </Container>
    );
};

export default TicketsTablePage