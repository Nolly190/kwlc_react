import Link from "next/link";
import { useRouter } from "next/router";

interface props {
  title: string;
  iconTitle: string;
  url?: string;
  action?: () => void;
}

const AdminNavItem: React.FC<props> = ({
  title,
  iconTitle,
  url,
  action,
}) => {
  const { pathname } = useRouter();
  const pathArray = pathname.split("/");
  const path = `/${pathArray[1]}/${pathArray[2]}`;
  const active = url === pathname || url === path;

  return (
    <Link href={url} passHref>
      <li
        className={`nav-item ${active ? "active" : ""}`}
        onClick={action}
      >
        <a className="nav-link">
          <i className="material-icons">{iconTitle}</i>
          <p>{title}</p>
        </a>
      </li>
    </Link>
  );
};

export default AdminNavItem;
