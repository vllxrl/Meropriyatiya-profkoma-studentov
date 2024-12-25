import {Link} from "react-router-dom";
import {Badge, Button} from "reactstrap";

type Props = {
    isActive: boolean,
    draft_event_id: string,
    tickets_count: number
}

const Bin = ({isActive, draft_event_id, tickets_count}:Props) => {

    if (!isActive) {
        return <Button color={"secondary"} className="bin-wrapper" disabled>Корзина</Button>
    }

    return (
        <Link to={`/events/${draft_event_id}/`} className="bin-wrapper">
            <Button color={"primary"} className="w-100 bin">
                Корзина
                <Badge>
                    {tickets_count}
                </Badge>
            </Button>
        </Link>
    )
}

export default Bin