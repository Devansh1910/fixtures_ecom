import { Link, useNavigate } from "react-router-dom";
import SvgIcon from "../MiniComponents/SvgIcon";
import s from "./CategoryCard.module.scss";

const CategoryCard = ({ categoryData }) => {
  const { _id, name, svgImage } = categoryData;
  const categoryType = name.toLowerCase();
  const navigateTo = useNavigate();

  function navigateToCategory() {
    navigateTo(`/category?type=${_id}`);
  }
  return (
    <Link
      className={s.card}
      title={name + " category"}
      onClick={() => navigateToCategory(categoryType)}
    >
      <span dangerouslySetInnerHTML={{ __html: svgImage }} />
      <span>{name}</span>
    </Link>
  );
};
export default CategoryCard;
