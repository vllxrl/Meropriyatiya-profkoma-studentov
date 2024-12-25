import {Button, Card, CardBody, CardText, CardTitle, Col, Row} from "reactstrap";
import {Link, useLocation} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "store/store.ts";
import {T_Ticket} from "modules/types.ts";
import {
    removeTicketFromDraftEvent,
    updateTicketValue
} from "store/slices/eventsSlice.ts";
import {useEffect, useState} from "react";
import CustomInput from "components/CustomInput/CustomInput.tsx";
import {addTicketToEvent, fetchTickets} from "store/slices/ticketsSlice.ts";
import {formatDate} from "utils/utils.ts";

type Props = {
    ticket: T_Ticket,
    showAddBtn?: boolean,
    showRemoveBtn?: boolean,
    editMM?: boolean
}

const TicketCard = ({ticket, showAddBtn=false, showRemoveBtn=false, editMM=false}:Props) => {

    const dispatch = useAppDispatch()

    const {is_superuser} = useAppSelector((state) => state.user)

    const {save_mm} = useAppSelector(state => state.events)

    const [local_count, setLocal_count] = useState(ticket.count)

    const location = useLocation()

    const isEventPage = location.pathname.includes("events")

    const handeAddToDraftEvent = async () => {
        await dispatch(addTicketToEvent(ticket.id))
        await dispatch(fetchTickets())
    }

    const handleRemoveFromDraftEvent = async () => {
        await dispatch(removeTicketFromDraftEvent(ticket.id))
    }

    useEffect(() => {
        save_mm && updateValue()
    }, [save_mm]);

    const updateValue = async () => {
        dispatch(updateTicketValue({
            ticket_id: ticket.id,
            count: local_count
        }))
    }

    if (isEventPage) {
        return (
            <Card key={ticket.id}>
                <Row>
                    <Col>
                        <img
                            alt=""
                            src={ticket.image}
                            style={{"width": "100%"}}
                        />
                    </Col>
                    <Col md={8}>
                        <CardBody>
                            <CardTitle tag="h5">
                                {ticket.name}
                            </CardTitle>
                            <CardText>
                                Дата: {formatDate(ticket.date)}
                            </CardText>
                            <CustomInput label="Количество билетов" type="number" value={local_count} setValue={setLocal_count} disabled={!editMM || is_superuser} className={"w-25"}/>
                            <Col className="d-flex gap-5">
                                <Link to={`/tickets/${ticket.id}`}>
                                    <Button color="primary" type="button">
                                        Открыть
                                    </Button>
                                </Link>
                                {showRemoveBtn &&
                                    <Button color="danger" onClick={handleRemoveFromDraftEvent}>
                                        Удалить
                                    </Button>
                                }
                            </Col>
                        </CardBody>
                    </Col>
                </Row>
            </Card>
        );
    }

    return (
        <Card key={ticket.id} style={{width: '18rem' }}>
            <img
                alt=""
                src={ticket.image}
                style={{"height": "200px"}}
            />
            <CardBody>
                <CardTitle tag="h5">
                    {ticket.name}
                </CardTitle>
                <CardText>
                    Дата: {formatDate(ticket.date)}
                </CardText>
                <Col className="d-flex justify-content-between">
                    <Link to={`/tickets/${ticket.id}`}>
                        <Button color="primary" type="button">
                            Открыть
                        </Button>
                    </Link>
                    {!is_superuser && showAddBtn &&
                        <Button color="secondary" onClick={handeAddToDraftEvent}>
                            Добавить
                        </Button>
                    }
                </Col>
            </CardBody>
        </Card>
    );
};

export default TicketCard