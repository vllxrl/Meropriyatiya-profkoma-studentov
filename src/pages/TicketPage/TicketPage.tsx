import {useParams} from "react-router-dom";
import {useEffect} from "react";
import {Col, Container, Row} from "reactstrap";
import {useAppDispatch, useAppSelector} from "store/store.ts";
import {fetchTicket, removeSelectedTicket} from "store/slices/ticketsSlice.ts";
import {formatDate} from "utils/utils.ts";

const TicketPage = () => {
    const { id } = useParams<{id: string}>();

    const dispatch = useAppDispatch()

    const {ticket} = useAppSelector((state) => state.tickets)

    useEffect(() => {
        dispatch(fetchTicket(id))
        return () => dispatch(removeSelectedTicket())
    }, []);

    if (!ticket) {
        return (
            <div>

            </div>
        )
    }

    return (
        <Container>
            <Row>
                <Col md="6">
                    <img
                        alt=""
                        src={ticket.image}
                        className="w-100"
                    />
                </Col>
                <Col md="6">
                    <h1 className="mb-3">{ticket.name}</h1>
                    <p className="fs-5">Описание: {ticket.description}</p>
                    <p className="fs-5">Дата: {formatDate(ticket.date)} </p>
                </Col>
            </Row>
        </Container>
    );
};

export default TicketPage