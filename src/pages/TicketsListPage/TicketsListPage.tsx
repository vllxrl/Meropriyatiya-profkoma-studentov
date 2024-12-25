import {Button, Col, Container, Form, Input, Row} from "reactstrap";
import {ChangeEvent, useEffect} from "react";
import {useAppDispatch, useAppSelector} from "store/store.ts";
import {fetchTickets, updateTicketName} from "store/slices/ticketsSlice.ts";
import TicketCard from "components/TicketCard/TicketCard.tsx";
import Bin from "components/Bin/Bin.tsx";

const TicketsListPage = () => {

    const dispatch = useAppDispatch()

    const {tickets, ticket_name} = useAppSelector((state) => state.tickets)

    const {is_authenticated, is_superuser} = useAppSelector((state) => state.user)

    const {draft_event_id, tickets_count} = useAppSelector((state) => state.events)

    const hasDraft = draft_event_id != null

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
                {is_authenticated && !is_superuser &&
                    <Col className="d-flex flex-row justify-content-end" md="6">
                        <Bin isActive={hasDraft} draft_event_id={draft_event_id} tickets_count={tickets_count} />
                    </Col>
                }
            </Row>
            <Row className="mt-5 d-flex">
                {tickets?.map(ticket => (
                    <Col key={ticket.id} className="mb-5 d-flex justify-content-center" sm="12" md="6" lg="4">
                        <TicketCard ticket={ticket} showAddBtn={is_authenticated} />
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default TicketsListPage