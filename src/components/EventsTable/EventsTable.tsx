import {useAppSelector} from "store/store.ts";
import {Card, Col, Row} from "reactstrap";
import EventCard from "components/EventCard/EventCard.tsx";
import {T_Event} from "modules/types.ts";
import "./EventTable.css"

type Props = {
    events:T_Event[]
}

const EventsTable = ({events}:Props) => {

    const {is_superuser} = useAppSelector((state) => state.user)

    return (
        <div className="mb-5">
            <div className="mb-2" style={{fontWeight: "bold"}}>
                <Card style={{padding: "10px"}}>
                    <Row>
                        <Col md={1}>
                            №
                        </Col>
                        <Col md={1}>
                            Статус
                        </Col>
                        <Col>
                            Номер бронирования
                        </Col>
                        <Col>
                            Дата создания
                        </Col>
                        <Col>
                            Дата формирования
                        </Col>
                        <Col>
                            Дата завершения
                        </Col>
                        {!is_superuser &&
                            <Col>
                                Действие
                            </Col>
                        }
                        {is_superuser &&
                            <>
                                <Col>
                                    Пользователь
                                </Col>
                                <Col>
                                    Действие
                                </Col>
                                <Col>
                                    Действие
                                </Col>
                            </>
                        }
                    </Row>
                </Card>
            </div>
            <div className="d-flex flex-column gap-2">
                {events.map((event, index) => (
                    <EventCard event={event} index={index} key={index}/>
                ))}
            </div>
        </div>
    )
};

export default EventsTable