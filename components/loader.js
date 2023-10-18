import classes from "./loader.module.css";

export default function Loader() {
  return (
    <div className={classes["lds-facebook"]}>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
}
