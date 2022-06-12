/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import "./App.css";

function App() {
  const host = "https://reqres.in/api/users";
  const [render, setrender] = React.useState(true);
  const [userno, setuserno] = React.useState(0);
  const [userid, setuserid] = React.useState(0);
  const [username, setusername] = React.useState('');
  const [useremail, setuseremail] = React.useState('');
  const [useravatar, setuseravatar] = React.useState('');
  const getusersno = async () => {
    const response = await fetch(`${host}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    const json = await response.json();
    setuserno(json["total"]);
  };
  const showmess = async (b) => {
    const response = await fetch(`${host}/${b}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    const json = await response.json();
    setuserid(json["data"]['id']);
    setuseremail(json["data"]['email']);
    setuseravatar(json["data"]['avatar']);
    setusername(json["data"]['first_name']+" "+json["data"]['last_name']);
  };
  React.useEffect(() => {
    if (render) {
      const fetchData = async () => {
        if (userno === 0) {
          await getusersno();
        } else {
          setrender(false);
        }
      };
      fetchData();
    }
  }, [userno]);

  return (
    <div className="app">
      {userid !== 0 ? (
        <div className="box">
          <p><strong>{username}</strong></p>
          <p>{useremail}</p>
          <p><img src={useravatar} alt={username} /></p>
        </div>
      ) : (<></>)}
      {!render ? (
        <div className="pagination">
          {[...Array(userno).keys()].map((t, i) => {
            return (
              <div key={i} onClick={async () => {await showmess(i + 1);}}>
                <span>{t + 1}</span>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="loader"></div>
      )}
    </div>
  );
}
export default App;
