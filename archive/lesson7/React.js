import React, { useState, useEffect } from 'react';
import './styles.css';
import axios from 'axios';
// https://randomuser.me/api
// interface UserName {
//   first: string;
//   last: string;
//   title: string;
// }

// interface UserPicture {
//   thumbnail: string;
// }

// interface UserInfo {
//   name: UserName;
//   picture: UserPicture;
// }

const fetchRandomDate = (pageNumber = 1) => {
  // ?page=2
  return axios
    .get(`https://randomuser.me/api?page=${pageNumber}`)
    .then(({ data }) => {
      console.log(data);
      return data;
    })
    .catch((err) => console.log(err));
};
const getFullUserName = (userInfo) => {
  const {
    name: { first, last },
  } = userInfo;
  return `${first} ${last}`;
};

export default function App() {
  const [counter, setCounter] = useState(0);
  const [nextPageNumber, setNextPageNumber] = useState(1);
  const [userInfos, setUserInfos] = useState([]);
  const [randomUserDataJSON, setRadomUserDataJSON] = useState('');

  const fetchNewUser = () => {
    fetchRandomDate(nextPageNumber).then((randomData) => {
      // setRadomUserDataJSON(
      //   JSON.stringify(randomData, null, 2) || "not user data"
      // );
      if (randomData === undefined) return;
      const newUserInfos = [...userInfos, ...randomData.results];
      setUserInfos(newUserInfos);
      setNextPageNumber(randomData.info.page + 1);
    });
  };
  useEffect(() => {
    fetchNewUser();
    fetchRandomDate(nextPageNumber).then((randomData) => {
      setUserInfos(randomData.results);
      setNextPageNumber(randomData.info.page + 1);
      return setRadomUserDataJSON(
        JSON.stringify(randomData, null, 2) || 'not user data'
      );
    });
  }, []);
  return (
    <div className='App'>
      <h1>Hello React</h1>
      <h2>Counter {counter}</h2>
      <button onClick={() => setCounter(counter + 1)}>Increase Counter</button>
      <button onClick={() => fetchRandomDate()}>Fetch random data</button>
      <p>{randomUserDataJSON}</p>
      <p>USER INFO</p>
      {userInfos.map((userInfo, idx) => (
        <div key={idx}>
          <p>{getFullUserName(userInfo)}</p>
          <img src={userInfo.picture.thumbnail} />
        </div>
      ))}

      <button onClick={() => fetchNewUser()}>Next page</button>
    </div>
  );
}
