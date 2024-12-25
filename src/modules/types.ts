export type T_Ticket = {
    id: string
    name: string
    description: string
    date: number
    image: string
    status: number
    count?: string
}

export type T_Event = {
    id: string | null
    status: E_EventStatus
    date_complete: string
    date_created: string
    date_formation: string
    owner: string
    moderator: string
    tickets: T_Ticket[]
    name: string
    phone: string
}

export enum E_EventStatus {
    Draft=1,
    InWork,
    Completed,
    Rejected,
    Deleted
}

export type T_User = {
    id: number
    username: string
    is_authenticated: boolean
    is_superuser: boolean
}

export type T_EventsFilters = {
    date_formation_start: string
    date_formation_end: string
    status: number
    owner: string
}

export type T_TicketsListResponse = {
    tickets: T_Ticket[],
    draft_event_id?: number,
    tickets_count?: number
}

export type T_LoginCredentials = {
    username: string
    password: string
}

export type T_RegisterCredentials = {
    name: string
    email: string
    password: string
}

export type T_TicketAddData = {
    name: string;
    description: string;
    date: number;
    image?: File | null;
}