import {useNavigate} from "react-router-dom";
import {useMemo} from "react";
import {Button} from "reactstrap";
import {T_Ticket} from "modules/types.ts";
import CustomTable from "components/CustomTable/CustomTable.tsx";
import {deleteTicket} from "store/slices/ticketsSlice.ts";
import {useAppDispatch} from "store/store.ts";

type Props = {
    tickets: T_Ticket[]
}

const TicketsTable = ({tickets}: Props) => {

    const navigate = useNavigate();

    const dispatch = useAppDispatch();

    const handleClick = (ticket_id) => {
        navigate(`/tickets/${ticket_id}`);
    }

    const openProductEditPage = (ticket_id) => {
        navigate(`/tickets/${ticket_id}/edit`);
    }

    const handleDeleteTicket = async (ticket_id) => {
        dispatch(deleteTicket(ticket_id));
    }

    const columns = useMemo(
        () => [
            {
                Header: '№',
                accessor: 'id',
            },
            {
                Header: 'Фото',
                accessor: 'image',
                Cell: ({ value }) => (
                    <img
                        alt="ticket"
                        src={value}
                        style={{ width: '100px', height: 'auto', objectFit: 'cover' }}
                    />
                )
            },
            {
                Header: 'Название',
                accessor: 'name',
                Cell: ({ value }) => value
            },
            {
                Header: 'Дата',
                accessor: 'date',
                Cell: ({ value }) => value
            },
            {
                Header: "Действие",
                accessor: "edit_button",
                Cell: ({ cell }) => (
                    <Button color="primary" onClick={() => openProductEditPage(cell.row.values.id)}>Редактировать</Button>
                )
            },
            {
                Header: "Удалить",
                accessor: "delete_button",
                Cell: ({ cell }) => (
                    <Button color="danger" onClick={() => handleDeleteTicket(cell.row.values.id)}>Удалить</Button>
                )
            }
        ],
        []
    );

    if (!tickets.length) {
        return (
            <></>
        );
    }

    return (
        <CustomTable columns={columns} data={tickets} onClick={handleClick} />
    );
};

export default TicketsTable;
