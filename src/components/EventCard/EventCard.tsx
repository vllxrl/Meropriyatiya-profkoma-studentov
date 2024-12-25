import {Button, Card, Col, Row} from "reactstrap";
import {T_Event} from "modules/types.ts";
import {formatDate} from "utils/utils.ts";
import {useNavigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "store/store.ts";
import {acceptEvent, fetchEvents, rejectEvent} from "store/slices/eventsSlice.ts";

type Props = {
    event: T_Event
    index: number
}

const EventCard = ({event, index}:Props) => {

    const {is_superuser} = useAppSelector((state) => state.user)

    const dispatch = useAppDispatch()

    const handleAcceptEvent = async (event_id) => {
        await dispatch(acceptEvent(event_id))
        await dispatch(fetchEvents())
    }

    const handleRejectEvent = async (event_id) => {
        await dispatch(rejectEvent(event_id))
        await dispatch(fetchEvents())
    }

    const navigate = useNavigate()

    const openEventPage = () => {
        navigate(`/events/${event.id}`)
    }

    const STATUSES = {
        1: "Введен",
        2: "В работе",
        3: "Завершен",
        4: "Отменён",
        5: "Удалён"
    }

    return (
        <Card style={{padding: "10px"}}>
            <Row>
                <Col md={1}>
                    {index + 1}
                </Col>
                <Col md={1}>
                    {STATUSES[event.status]}
                </Col>
                <Col>
                    {event.phone}
                </Col>
                <Col>
                    {formatDate(event.date_created)}
                </Col>
                <Col>
                    {formatDate(event.date_formation)}
                </Col>
                <Col>
                    {formatDate(event.date_complete)}
                </Col>
                {!is_superuser &&
                    <Col>
                        <Button color="primary" onClick={openEventPage}>Открыть</Button>
                    </Col>
                }
                {is_superuser &&
                    <>
                        <Col>
                            {event.owner}
                        </Col>
                        <Col>
                            {event.status == 2 && <Button color="primary" onClick={() => handleAcceptEvent(event.id)}>Принять</Button>}
                        </Col>
                        <Col>
                            {event.status == 2 && <Button color="danger" onClick={() => handleRejectEvent(event.id)}>Отклонить</Button>}
                        </Col>
                    </>
                }
            </Row>
        </Card>
    )
}

export default EventCard