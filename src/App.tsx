import styles from "./App.module.scss";
import Routers from "./Routers";

function App() {
  return (
    <div className={styles.global}>
      <Routers />
    </div>
  );
}

export default App;
