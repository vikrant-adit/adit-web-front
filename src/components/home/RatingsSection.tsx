
import "../../styles/Ratings.css";
import { buildImageUrl } from "../../lib/defaults";

const RatingsSection = () => {
  return (
    <section>
      <div className="ratings">
      <div className="hmratingstrip-line"></div>
      <div className="ratings-section">
        <img
          src={buildImageUrl("uploads/software_advice_rating_e558d5a6a8.svg")}
          loading="lazy"
          alt="software-advice-rating"
        />
        <img
          src={buildImageUrl("uploads/g2_rating_3e83a9ed91.svg")}
          loading="lazy"
          alt="g2-rating"
        />

        <img
          src={buildImageUrl("uploads/capterra_rating_7de1721209.svg")}
          loading="lazy"
          alt="capterra-rating"
        />
      </div>
      <div className="hmratingstrip-line"></div>
    </div>
    </section>
  );
};

export default RatingsSection;
