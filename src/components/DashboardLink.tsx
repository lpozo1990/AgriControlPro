import { FunctionComponent } from "react";
import { NavLink } from "react-router-dom";

interface DashboardLink {
  linkLabel: string;
  icon: JSX.Element;
  to: string;
}

const DashboardLink: FunctionComponent<DashboardLink> = ({
  linkLabel,
  icon,
  to,
}) => {
  const commonStyles =
    "flex items-center p-2 text-base font-medium text-gray-900 rounded-lg transition duration-75 hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white group";
  return (
    <NavLink
      end
      to={to}
      className={({ isActive }) =>
        [isActive ? commonStyles + " bg-primary-100" : commonStyles].join(" ")
      }
    >
      {icon}
      <span className="ml-3">{linkLabel}</span>
    </NavLink>
  );
};

export default DashboardLink;
