import {useState} from "react";
import Header from "components/Header";
import Breadcrumbs from "components/Breadcrumbs";
import TicketPage from "pages/TicketPage";
import TicketsListPage from "pages/TicketsListPage";
import {Route, Routes} from "react-router-dom";
import {T_Ticket} from "src/modules/types.ts";
import {Container, Row} from "reactstrap";
import HomePage from "pages/HomePage";
import "./styles.css"

function App() {

    const [tickets, setTickets] = useState<T_Ticket[]>([])

    const [selectedTicket, setSelectedTicket] = useState<T_Ticket | null>(null)

    const [isMock, setIsMock] = useState(false);

    {/* Хук для реализации поиска */}
    {/* "" – это аргумент, который служит начальным значением, стартовое  */}
    {/* ticketName – переменная состояния, setTicketName – функция для обновления состояния */}
    const [ticketName, setTicketName] = useState<string>("")

    return (
        <div>
            <Header/>
            <Container className="pt-4">
                <Row className="mb-3">
                    <Breadcrumbs selectedTicket={selectedTicket} />
                </Row>
                <Row>
                    <Routes>
						<Route path="/" element={<HomePage />} />
                        {/* начиная с tickets={tickets} – это пропсы, которые нужны для получения информации и которые мы передаём в компонент*/}
                        <Route path="/tickets/" element={<TicketsListPage tickets={tickets} setTickets={setTickets} isMock={isMock} setIsMock={setIsMock} ticketName={ticketName} setTicketName={setTicketName}/>} />
                        <Route path="/tickets/:id" element={<TicketPage selectedTicket={selectedTicket} setSelectedTicket={setSelectedTicket} isMock={isMock} setIsMock={setIsMock}/>} />
                    </Routes>
                </Row>
            </Container>
        </div>
    )
}

export default App
