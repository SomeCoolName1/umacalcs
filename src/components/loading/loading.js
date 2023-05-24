import loadingGif from "../../assets/loading.gif";
import ayabeChibi from "../../assets/skillimages/Ayabe_Chibi.webp";
import "./loading.scss";

const Loading = () => {
  return (
    <div className="loading_container">
      <div className="loading_image">
        <img src={ayabeChibi} className="loading_ayabe" />
        <div className="loading_test" />
      </div>
    </div>
  );
};

export default Loading;
