import styles from "./page.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGithub,
  faCoffee,
  faCheckCircle,
  faGitlab,
  faGitkraken,
  faHouse,
  faTwitter,
  faImage,
} from "@fortawesome/free-solid-svg-icons";

export default function Home() {
  return (
    <div className={styles.page}>
      <div>
        <h1>Welcome!</h1>
        <p>
          Check out my GitHub <FontAwesomeIcon icon={faGithub} />
          <FontAwesomeIcon icon={faGitlab} />
          <FontAwesomeIcon icon={faGitkraken} />
          <FontAwesomeIcon icon={faHouse} />
          <FontAwesomeIcon icon={faTwitter} />
          <FontAwesomeIcon icon={faImage} />
        </p>
        <p>
          Have a coffee <FontAwesomeIcon icon={faCoffee} />
        </p>
      </div>
      <div>
        <h1>Welcome to My Next.js App!</h1>
        <p>
          Enjoy a coffee <FontAwesomeIcon icon={faCoffee} />
        </p>
        <p>
          Operation Successful <FontAwesomeIcon icon={faCheckCircle} />
        </p>
      </div>
      <h1 className={styles.h1}>Hello world in next js</h1>
      <i className="fa-solid fa-pen-to-square"></i>
    </div>
  );
}
