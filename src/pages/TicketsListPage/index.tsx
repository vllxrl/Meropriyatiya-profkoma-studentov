import {Button, Col, Container, Form, Input, Row} from "reactstrap";
import {T_Ticket} from "src/modules/types.ts";
import TicketCard from "components/TicketCard";
import {TicketMocks} from "src/modules/mocks.ts";
import {FormEvent, useEffect} from "react";
import * as React from "react";
import "../../styles.css"

type TicketsListPageProps = {
    tickets: T_Ticket[],
    setTickets: React.Dispatch<React.SetStateAction<T_Ticket[]>>
    isMock: boolean,
    setIsMock: React.Dispatch<React.SetStateAction<boolean>>
    ticketName: string,
    setTicketName: React.Dispatch<React.SetStateAction<string>>
}

{/* ниже описан метод SetTicketName для обновление состояния ticketName*/}
const TicketsListPage = ({tickets, setTickets, isMock, setIsMock, ticketName, setTicketName}:TicketsListPageProps) => {

    const fetchData = async () => {
        try {
            const response = await fetch(`/api/tickets/?ticket_name=${ticketName.toLowerCase()}`,{ signal: AbortSignal.timeout(1000) })
            const data = await response.json()
            setTickets(data.tickets)
            setIsMock(false)
        } catch {
            createMocks()
        }
    }

    const createMocks = () => {
        setIsMock(true)
        setTickets(TicketMocks.filter(ticket => ticket.name.toLowerCase().includes(ticketName.toLowerCase())))
    }

    const handleSubmit = async (e:FormEvent) => {
        e.preventDefault()
        if (isMock) {
            createMocks()
        } else {
            await fetchData()
        }
    }

    useEffect(() => {
        fetchData()
    }, []);

    return (
        <Container>
            <Row className="mb-5">
                <Col md="6">
                    <Form onSubmit={handleSubmit}>
                        <Row>
                            <Col md="8">
                                {/* Здесь в инпут пишем нужное значение и заносим в переменную TicketName */}
                                {/* Затем функция setTicketName передаёт значение в состояние (файл App.tsx)*/}
                                <Input value={ticketName} onChange={(e) => setTicketName(e.target.value)} placeholder="хочу посетить ..."></Input>
                            </Col>
                            <Col>
                                <Button color="primary" className="w-100 search-btn">Поиск</Button>
                            </Col>
                        </Row>
                    </Form>
                </Col>
            </Row>
            <Row>
                {tickets?.map(ticket => (
                    <Col key={ticket.id} xs="4">
                        <TicketCard ticket={ticket} isMock={isMock} />
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default TicketsListPage