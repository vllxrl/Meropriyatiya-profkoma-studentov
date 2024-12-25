import {Route, Routes} from "react-router-dom";
import {Container, Row} from "reactstrap";
import "./styles.css"
import HomePage from "pages/HomePage/HomePage.tsx";
import LoginPage from "pages/LoginPage/LoginPage.tsx";
import RegisterPage from "pages/RegisterPage/RegisterPage.tsx";
import TicketsListPage from "pages/TicketsListPage/TicketsListPage.tsx";
import TicketPage from "pages/TicketPage/TicketPage.tsx";
import EventsPage from "pages/EventsPage/EventsPage.tsx";
import EventPage from "pages/EventPage/EventPage.tsx";
import ProfilePage from "pages/ProfilePage/ProfilePage.tsx";
import AccessDeniedPage from "pages/AccessDeniedPage/AccessDeniedPage.tsx";
import NotFoundPage from "pages/NotFoundPage/NotFoundPage.tsx";
import Header from "components/Header/Header.tsx";
import Breadcrumbs from "components/Breadcrumbs/Breadcrumbs.tsx";
import TicketsTablePage from "pages/TicketsTablePage/TicketsTablePage.tsx";
import TicketEditPage from "pages/TicketEditPage/TicketEditPage.tsx";
import TicketAddPage from "pages/TicketAddPage/TicketAddPage.tsx";

function App() {
    return (
        <div>
            <Header />
            <Container className="pt-4">
                <Row className="mb-3">
                    <Breadcrumbs />
                </Row>
                <Row>
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/login/" element={<LoginPage />} />
                        <Route path="/register/" element={<RegisterPage />} />
                        <Route path="/tickets/" element={<TicketsListPage />} />
                        <Route path="/tickets-table/" element={<TicketsTablePage />} />
                        <Route path="/tickets/:id/" element={<TicketPage />} />
                        <Route path="/tickets/:id/edit" element={<TicketEditPage />} />
                        <Route path="/tickets/add" element={<TicketAddPage />} />
                        <Route path="/events/" element={<EventsPage />} />
                        <Route path="/events/:id/" element={<EventPage />} />
                        <Route path="/profile/" element={<ProfilePage />} />
                        <Route path="/403/" element={<AccessDeniedPage />} />
                        <Route path="/404/" element={<NotFoundPage />} />
                        <Route path='*' element={<NotFoundPage />} />
                    </Routes>
                </Row>
            </Container>
        </div>
    )
}

export default App
