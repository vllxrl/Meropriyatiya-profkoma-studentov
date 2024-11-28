import {Button, Card, CardBody, CardImg, CardText, CardTitle} from "reactstrap";
import mockImage from "assets/mock.png";
import {Link} from "react-router-dom";
import {T_Ticket} from "modules/types.ts";

interface TicketCardProps {
    ticket: T_Ticket,
    isMock: boolean
}

const TicketCard = ({ticket, isMock}: TicketCardProps) => {
    return (
        <Card key={ticket.id} style={{width: '18rem', margin: "0 auto 50px", height: "calc(100% - 50px)" }}>
            <CardImg
                src={isMock ? mockImage as string : ticket.image}
                style={{"height": "200px"}}
            />
            <CardBody className="d-flex flex-column justify-content-between">
                <CardTitle tag="h5">
                    {ticket.name}
                </CardTitle>
                <CardText>
                    Дата {ticket.date}
                </CardText>
                <Link to={`/tickets/${ticket.id}`}>
                    <Button color="primary">
                        Открыть
                    </Button>
                </Link>
            </CardBody>
        </Card>
    );
};

export default TicketCard