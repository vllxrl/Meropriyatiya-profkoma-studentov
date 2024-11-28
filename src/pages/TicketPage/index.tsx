import * as React from 'react';
import {useParams} from "react-router-dom";
import {useEffect} from "react";
import {T_Ticket} from "src/modules/types.ts";
import {Col, Container, Row} from "reactstrap";
import {TicketMocks} from "src/modules/mocks.ts";
import mockImage from "assets/mock.png";

type TicketPageProps = {
    selectedTicket: T_Ticket | null,
    setSelectedTicket: React.Dispatch<React.SetStateAction<T_Ticket | null>>,
    isMock: boolean,
    setIsMock: React.Dispatch<React.SetStateAction<boolean>>
}

const TicketPage = ({selectedTicket, setSelectedTicket, isMock, setIsMock}: TicketPageProps) => {
    const { id } = useParams<{id: string}>();

    const fetchData = async () => {
        try {
            const response = await fetch(`/api/tickets/${id}`,{ signal: AbortSignal.timeout(1000) })
            const data = await response.json()
            setSelectedTicket(data)
        } catch {
            createMock()
        }
    }

    const createMock = () => {
        setIsMock(true)
        setSelectedTicket(TicketMocks.find(ticket => ticket?.id == parseInt(id as string)) as T_Ticket)
    }

    useEffect(() => {
        if (!isMock) {
            fetchData()
        } else {
            createMock()
        }

        return () => setSelectedTicket(null)
    }, []);

    if (!selectedTicket) {
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
                        src={isMock ? mockImage as string : selectedTicket.image}
                        className="w-100"
                    />
                </Col>
                <Col md="6">
                    <h1 className="mb-3">{selectedTicket.name}</h1>
                    <p className="fs-5">Описание: {selectedTicket.description}</p>
                    <p className="fs-5">Дата: {selectedTicket.date}</p>
                </Col>
            </Row>
        </Container>
    );
};

export default TicketPage