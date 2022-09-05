const notification = () => {
  return (
    <div className="container">
      <div id="left-aside-wrapper">
        <aside id="left-aside">
          <div className="box-shadow p-1">
            <div className="network-menu p-1">Notifications</div>
          </div>
        </aside>
      </div>
      <div id="main-wrapper">
        <main id="main-section">
          <div className="box-shadow">
            <div className="flex flex-space-between btm-border">
              <h1 className="p-3">Notification</h1>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default notification;
