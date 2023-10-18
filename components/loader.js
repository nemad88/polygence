import classes from "./loader.module.css";

export default function Loader() {
  return (
    <div className={classes["lds-facebook"]} data-testid="loader-id">
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
}
