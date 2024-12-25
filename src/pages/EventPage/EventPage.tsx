import {useNavigate, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "store/store.ts";
import {
    deleteDraftEvent,
    fetchEvent,
    removeEvent, sendDraftEvent,
    triggerUpdateMM, updateEvent
} from "store/slices/eventsSlice.ts";
import {Button, Col, Form, Row} from "reactstrap";
import {E_EventStatus, T_Ticket} from "modules/types.ts";
import TicketCard from "components/TicketCard/TicketCard.tsx";
import CustomInput from "components/CustomInput/CustomInput.tsx";

const EventPage = () => {
    const { id } = useParams<{id: string}>();

    const dispatch = useAppDispatch()

    const navigate = useNavigate()

    const {is_authenticated, is_superuser} = useAppSelector((state) => state.user)

    const event = useAppSelector((state) => state.events.event)

    const [name, setName] = useState<string>(event?.name)

    const [phone, setPhone] = useState<string>(event?.phone)

    useEffect(() => {
        if (!is_authenticated) {
            navigate("/403/")
        }
    }, [is_authenticated]);

    useEffect(() => {
        is_authenticated && dispatch(fetchEvent(id))
        return () => dispatch(removeEvent())
    }, []);

    useEffect(() => {
        setName(event?.name)
        setPhone(event?.phone)
    }, [event]);

    const sendEvent = async (e) => {
        e.preventDefault()

        await saveEvent()

        await dispatch(sendDraftEvent())

        navigate("/events/")
    }

    const saveEvent = async (e?) => {
        e?.preventDefault()

        const data = {
            name
        }

        await dispatch(updateEvent(data))
        await dispatch(triggerUpdateMM())
        await dispatch(triggerUpdateMM())
    }

    const deleteEvent = async () => {
        await dispatch(deleteDraftEvent())
        navigate("/tickets/")
    }

    if (!event) {
        return (
            <></>
        )
    }

    const isDraft = event.status == E_EventStatus.Draft
    const isCompleted = event.status == E_EventStatus.Completed

    return (
        <Form onSubmit={sendEvent} className="pb-5">
            <h2 className="mb-5">{isDraft ? "Черновое мероприятие" : `Получение №${id}` }</h2>
            <Row className="mb-5 fs-5 w-25">
                <CustomInput label="ФИО" placeholder="Введите фио" value={name} setValue={setName} disabled={!isDraft || is_superuser}/>
                {isCompleted && <CustomInput label="Номер бронирования" value={phone} disabled={true}/>}
            </Row>
            <Row>
                {event.tickets.length > 0 ? event.tickets.map((ticket:T_Ticket) => (
                    <Row key={ticket.id} className="d-flex justify-content-center mb-5">
                        <TicketCard ticket={ticket} showRemoveBtn={isDraft} editMM={isDraft}/>
                    </Row>
                )) :
                    <h3 className="text-center">Билеты не добавлены</h3>
                }
            </Row>
            {isDraft && !is_superuser &&
                <Row className="mt-5">
                    <Col className="d-flex gap-5 justify-content-center">
                        <Button color="success" className="fs-4" onClick={saveEvent}>Сохранить</Button>
                        <Button color="primary" className="fs-4" type="submit">Отправить</Button>
                        <Button color="danger" className="fs-4" onClick={deleteEvent}>Удалить</Button>
                    </Col>
                </Row>
            }
        </Form>
    );
};

export default EventPage