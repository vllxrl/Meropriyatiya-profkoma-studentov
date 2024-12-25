import {useNavigate, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {Button, Col, Container, Row} from "reactstrap";
import {useAppDispatch, useAppSelector} from "store/store.ts";
import {
    deleteTicket,
    fetchTicket,
    removeSelectedTicket,
    updateTicket,
    updateTicketImage
} from "store/slices/ticketsSlice.ts";
import UploadButton from "components/UploadButton/UploadButton.tsx";
import CustomInput from "components/CustomInput/CustomInput.tsx";
import CustomTextarea from "components/CustomTextarea/CustomTextarea.tsx";

const TicketEditPage = () => {
    const { id } = useParams<{id: string}>();

    const dispatch = useAppDispatch()

    const {ticket} = useAppSelector((state) => state.tickets)

    const {is_superuser} = useAppSelector((state) => state.user)

    const [name, setName] = useState<string>(ticket?.name)

    const [description, setDescription] = useState<string>(ticket?.description)

    const [date, setDate] = useState<number>(ticket?.date)

    useEffect(() => {
        if (!is_superuser) {
            navigate("/403/")
        }
    }, [is_superuser]);

    const navigate = useNavigate()

    const [imgFile, setImgFile] = useState<File>()
    const [imgURL, setImgURL] = useState<string>(ticket?.image)

    const handleFileChange = (e) => {
        if (e.target.files) {
            const file = e.target?.files[0]
            setImgFile(file)
            setImgURL(URL.createObjectURL(file))
        }
    }

    const saveTicket = async() => {
        if (imgFile) {
            const form_data = new FormData()
            form_data.append('image', imgFile, imgFile.name)
            await dispatch(updateTicketImage({
                ticket_id: ticket.id,
                data: form_data
            }))
        }

        const data = {
            name,
            description,
            date
        }

        await dispatch(updateTicket({
            ticket_id: ticket.id,
            data
        }))

        navigate("/tickets-table/")
    }

    useEffect(() => {
        dispatch(fetchTicket(id))
        return () => dispatch(removeSelectedTicket())
    }, []);

    useEffect(() => {
        setName(ticket?.name)
        setDescription(ticket?.description)
        setDate(ticket?.date)
        setImgURL(ticket?.image)
    }, [ticket]);

    const handleDeleteTicket = async () => {
        await dispatch(deleteTicket(id))
        navigate("/tickets-table/")
    }

    if (!ticket) {
        return (
            <div>

            </div>
        )
    }

    return (
        <Container>
            <Row>
                <Col md={6}>
                    <img src={imgURL} alt="" className="w-100"/>
                    <Container className="mt-3 d-flex justify-content-center">
                        <UploadButton handleFileChange={handleFileChange} />
                    </Container>
                </Col>
                <Col md={6}>
                    <CustomInput label="Название" placeholder="Введите название" value={name} setValue={setName}/>
                    <CustomTextarea label="Описание" placeholder="Введите описание" value={description} setValue={setDescription}/>
                    <CustomInput label="Дата" placeholder="Введите цену" value={date} setValue={setDate}/>
                    <Col className="d-flex justify-content-center gap-5 mt-5">
                        <Button color="success" className="fs-4" onClick={saveTicket}>Сохранить</Button>
                        <Button color="danger" className="fs-4" onClick={handleDeleteTicket}>Удалить</Button>
                    </Col>
                </Col>
            </Row>
        </Container>
    );
};

export default TicketEditPage