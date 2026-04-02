import { Link, useLocation } from "react-router-dom";

const breadcrumbsNames: Record<string, string> = {
  catalog: "Каталог",
  news: "Новости",
  product: "Продукт",
  galery: "Галерея",
  about: "О компании",
  contacts: "Контакты",
  laminate: "Ламинат",
  parquet: "Паркет",
  search: "Поиск",
  doors: "Двери",
  compare: "Сравнение",
};

function Breadcrumbs() {
  const { pathname } = useLocation();
  const path = pathname.split("/").filter(Boolean);

  return (
    <section className="py-2.5 bg-[#ecececb3]">
      <div className="container">
        <div className="flex justify-between items-center">
          <ul className="flex gap-2.5">
            {path.map((str, i) => {
              const to = "/" + path.slice(0, i + 1).join("/");

              return (
                <Link key={str} to={to}>
                  <li
                    className={`first-letter:uppercase flex gap-2.5 items-center underline cursor-pointer ${str === path.at(-1) && "text-(--prime) cursor-text no-underline!"}`}
                  >
                    {i > 0 && (
                      <svg
                        width="9"
                        height="12"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M1 1.427l5.5 4.878L1 11.183"
                          stroke="#C4C4C4"
                          strokeWidth="2"
                        />
                      </svg>
                    )}
                    {breadcrumbsNames[str] || str}
                  </li>
                </Link>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}

export default Breadcrumbs;
