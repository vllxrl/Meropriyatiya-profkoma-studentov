import {Breadcrumb, BreadcrumbItem} from "reactstrap";
import {Link, useLocation} from "react-router-dom";
import {T_Ticket} from "modules/types.ts";
import {isHomePage, isTicketPage} from "utils/utils.ts";

interface BreadcrumbsProps {
    selectedTicket: T_Ticket | null
}

const Breadcrumbs = ({ selectedTicket }: BreadcrumbsProps) => {

    const location = useLocation()

    return (
        <Breadcrumb className="fs-5">
			{isHomePage(location.pathname) &&
				<BreadcrumbItem>
					<Link to="/">
						Главная
					</Link>
				</BreadcrumbItem>
			}
			{location.pathname.includes("/tickets") &&
                <BreadcrumbItem active>
                    <Link to="/tickets">
						Билеты
                    </Link>
                </BreadcrumbItem>
			}
            {isTicketPage(location.pathname) &&
                <BreadcrumbItem active>
                    <Link to={location.pathname}>
                        { selectedTicket?.name }
                    </Link>
                </BreadcrumbItem>
            }
			<BreadcrumbItem />
        </Breadcrumb>
    );
};

export default Breadcrumbs