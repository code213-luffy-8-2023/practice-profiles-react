import { useState } from "react";
import "./App.css";
import PropTypes from "prop-types";
import { getAllUsers, updateUser, deleteUser } from "./utils/api-utils";
import { useEffect } from "react";

/**
 *  This component will show a loading animation while the image is loading
 */
const LoadingVisibleImage = ({ src, alt }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <>
      <img
        src={src}
        alt={alt}
        onLoad={() => setIsLoaded(true)}
        style={{
          opacity: isLoaded ? 1 : 0,
          display: isLoaded ? "block" : "none",
        }}
      />
      {!isLoaded && <div className="loading"></div>}
    </>
  );
};

// This is a way to declare the types of the props
// it is optional but it is a good practice
LoadingVisibleImage.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
};

function App() {
  const [usersArray, setUsersArray] = useState([]);

  const [search, setSearch] = useState("");

  useEffect(() => {
    const abortController = new AbortController();

    getAllUsers(abortController.signal)
      .then((users) => {
        setUsersArray(users);
      })
      .catch((e) => {
        // only log the error if it is not an abort error
        // abort errors are expected
        if (e.name !== "AbortError") console.error(e.message);
      });

    return () => {
      // abort the fetch request when the component unmounts
      abortController.abort();
    };
  }, []);

  return (
    <>
      <header>
        <div className="max-width-container">
          <h1>Profiles</h1>
          <form>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              type="search"
              placeholder="Search"
            />
          </form>
        </div>
      </header>
      <main>
        {usersArray.map((user, i) => {
          if (!user.name.toLowerCase().includes(search.toLowerCase()))
            return null;
          return (
            <article className="card" key={i}>
              <div className="avatar-container">
                <LoadingVisibleImage src={user.avatar} alt={user.name} />
                {false && <img src={user.avatar} alt={user.name} />}
                <h2>{user.name}</h2>
              </div>
              <div className="contact">
                <PhoneIcon />
                <span>{user.phone}</span>
              </div>
              <div className="contact">
                <JobIcon />
                <span>{user.job}</span>
              </div>
              <div className="country">
                <img
                  src={`https://flagsapi.com/${user.country}/flat/24.png`}
                  onError={(e) => {
                    // in case the image fails to load
                    // probably because the flag does not exist
                    // we can replace it with a placeholder
                    // e this is the event object
                    // e.target is the element that triggered the event (this very image)
                    // e.target.src is the src attribute of the image
                    // meaning if there is a loading error we can replace the src
                    e.target.src = `https://placehold.co/24x16/333/fff?text=${user.country}`;
                  }}
                />
                <span>{user.country}</span>
              </div>
              <div>
                <button
                  onClick={() => {
                    const updatedUser = {
                      isFollowed: !user.isFollowed,
                    };

                    // save the original array
                    // we use this to update the state optimistically
                    // then if the update request fails we can revert the state
                    let original = usersArray.map((u) => ({ ...u }));
                    // using map to create a new array
                    const newArray = usersArray.map((u) => {
                      if (u.id === user.id) {
                        u.isFollowed = !u.isFollowed;
                      }
                      return u;
                    });

                    // or using spread operator
                    // const newArray = [...usersArray];
                    // newArray[i].isFollowed = !newArray[i].isFollowed;

                    // update on the server
                    updateUser(user.id, updatedUser).catch((e) => {
                      // print the error message to the console
                      console.error(e.message);
                      // if the update fails, revert the state
                      setUsersArray(original);
                    });

                    // optimistic update
                    setUsersArray(newArray);
                  }}
                  className={user.isFollowed ? "unfollow" : "follow"}
                >
                  {user.isFollowed ? "Unfollow" : "Follow"}
                </button>
                <button
                  onClick={() => {
                    const userToDelete = usersArray.find(
                      (u) => u.id === user.id
                    );
                    const newArray = [...usersArray];
                    newArray.splice(i, 1);
                    setUsersArray(newArray);

                    deleteUser(userToDelete.id).catch((e) => {
                      console.error(e.message);
                      newArray.splice(i, 0, userToDelete);

                      setUsersArray([...newArray]);
                    });
                  }}
                  className="block"
                >
                  Block
                </button>
              </div>
            </article>
          );
        })}
      </main>
    </>
  );
}

function PhoneIcon({ width, height, color }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width || "24"}
      height={height || "24"}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color || "currentColor"}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="feather feather-phone"
    >
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
    </svg>
  );
}

// This is a way to declare the types of the props
// it is optional but it is a good practice
PhoneIcon.propTypes = {
  width: PropTypes.string,
  height: PropTypes.string,
  color: PropTypes.string,
};

function JobIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
    </svg>
  );
}

export default App;
