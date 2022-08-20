import "../styles/mainpage.scss";

const home = () => {
  return (
    <div id="main-wrapper">
      <main id="main-section">
        <div id="share-box">
          <div id="button-box">
            <button id="btn-post">
              <span className="fas fa-edit"></span>
              <span id="btn-text">Start a post</span>
            </button>
            <button id="btn-picture">
              <span className="fas fa-camera"></span>
            </button>
            <button id="btn-video">
              <span className="fas fa-video"></span>
            </button>
            <button id="btn-document">
              <span className="fas fa-file"></span>
            </button>
          </div>
          <div id="link-box">
            <a href="#">Write an article</a>
            <span> on LinkedIn</span>
          </div>
        </div>
        <div id="feed-sort">
          <hr />
        </div>
        <article>
          <div id="post-author">
            <a href="#">
              <div>
                <img src="amepp.jfif" alt="" />
                <div>
                  <div>
                    <strong id="post-author-name">Amelia wattson</strong>
                    <span>
                      <span>&nbsp;·&nbsp;</span>
                      1st
                    </span>
                  </div>
                  <span>Your mother</span>
                  <span>12h</span>
                </div>
              </div>
            </a>
            <div>
              <span className="fas fa-circle"></span>
              <span className="fas fa-circle"></span>
              <span className="fas fa-circle"></span>
            </div>
          </div>
          <div id="post-data">
            <p>
              <span>smol ame </span>power
            </p>
            <img src="smolame.gif" alt="" className="image-size" />
          </div>
          <div id="post-interactions">
            <div id="interactions-amount">
              <span
                id="like-icon"
                className="fas fa-thumbs-up fa-flip-horizontal"
              ></span>
              <span id="heart-icon" className="fas fa-heart"></span>
              <span id="amount-info">
                6969 <span>&nbsp;·&nbsp;</span> 100 Comments
              </span>
            </div>
            <div id="interactions-btns">
              <button>
                <span className="far fa-thumbs-up fa-flip-horizontal"></span>
                <span>Like</span>
              </button>
              <button>
                <span className="far fa-comment-dots fa-flip-horizontal"></span>
                <span>Comment</span>
              </button>
              <button>
                <span className="far fa-share-square"></span>
                <span>Share</span>
              </button>
            </div>
          </div>
        </article>
      </main>
    </div>
  );
};

export default home;
