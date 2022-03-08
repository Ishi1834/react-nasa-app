import classes from "./Container.module.css";

export default function Container(props) {
  const style = `container my-4  ${classes.cardWrapper} p-3`;
  return <div className={style}>{props.children}</div>;
}
