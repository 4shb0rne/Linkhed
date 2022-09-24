import axios from "axios";
import { useModal } from "../../../utils/modalContext";
import Cookies from "universal-cookie";

const deletemodal = (post: any) => {
  const modal = useModal();
  const cookies = new Cookies();
  const token = cookies.get("token");
  const posts = post.post;
  console.log(posts);
  return (
    <div>
      <div>Are you sure to delete this post ?</div>
      <div className="mt-2">
        <button
          className="yes-btn"
          onClick={async () => {
            await axios.delete("http://localhost:8080/deletepost/" + posts.id, {
              headers: {
                Authorization: "Bearer " + token,
              },
            });
            post.fetch_posts();
            modal.setIsOpen2(false);
          }}
        >
          Yes
        </button>
        <button
          className="no-btn"
          onClick={() => {
            modal.setIsOpen2(false);
          }}
        >
          No
        </button>
      </div>
    </div>
  );
};

export default deletemodal;
