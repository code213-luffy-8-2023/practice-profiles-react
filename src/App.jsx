import { useState } from "react";
import "./App.css";
import PropTypes from "prop-types";

const users = [
  {
    createdAt: "2023-08-11T06:04:32.270Z",
    name: "Ms. Tara Waters",
    avatar:
      "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/866.jpg",
    country: "FJ",
    phone: "986-875-9380",
    isFollowed: false,
    job: "Officer",
    id: "1",
  },
  {
    createdAt: "1996-04-27T13:01:53.907Z",
    name: "Maria Waters",
    avatar:
      "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/1071.jpg",
    country: "MK",
    phone: "918-419-3842",
    isFollowed: false,
    job: "Consultant",
    id: "2",
  },
  {
    createdAt: "2050-07-26T19:53:03.634Z",
    name: "Mr. Olivia Dibbert",
    avatar:
      "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/410.jpg",
    country: "KZ",
    phone: "559-467-5820",
    isFollowed: false,
    job: "Engineer",
    id: "3",
  },
  {
    createdAt: "2028-11-05T22:27:27.464Z",
    name: "Martin McCullough",
    avatar:
      "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/213.jpg",
    country: "GB",
    phone: "981-541-3913",
    isFollowed: false,
    job: "Executive",
    id: "4",
  },
  {
    createdAt: "2038-03-09T05:00:41.213Z",
    name: "Yvonne Hagenes",
    avatar:
      "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/75.jpg",
    country: "SO",
    phone: "795-564-9848",
    isFollowed: false,
    job: "Associate",
    id: "5",
  },
  {
    createdAt: "2078-08-19T13:54:07.962Z",
    name: "Julian Hartmann DDS",
    avatar:
      "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/901.jpg",
    country: "MG",
    phone: "415-748-4884",
    isFollowed: false,
    job: "Supervisor",
    id: "6",
  },
  {
    createdAt: "2093-12-20T17:40:39.562Z",
    name: "Moses Stanton",
    avatar:
      "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/494.jpg",
    country: "EC",
    phone: "328-268-7768",
    isFollowed: false,
    job: "Agent",
    id: "7",
  },
  {
    createdAt: "2083-05-09T11:27:04.027Z",
    name: "Toni Champlin",
    avatar:
      "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/492.jpg",
    country: "CL",
    phone: "853-805-4014",
    isFollowed: false,
    job: "Designer",
    id: "8",
  },
  {
    createdAt: "2086-05-28T07:30:39.311Z",
    name: "Mrs. Ellis Johnson",
    avatar:
      "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/512.jpg",
    country: "TG",
    phone: "496-435-8667",
    isFollowed: false,
    job: "Agent",
    id: "9",
  },
  {
    createdAt: "2016-06-18T12:15:12.165Z",
    name: "Lora Brekke",
    avatar:
      "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/645.jpg",
    country: "GN",
    phone: "235-205-9947",
    isFollowed: false,
    job: "Liaison",
    id: "10",
  },
  {
    createdAt: "2096-09-18T23:37:52.620Z",
    name: "Christian Walter",
    avatar:
      "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/1235.jpg",
    country: "BL",
    phone: "459-432-8345",
    isFollowed: false,
    job: "Planner",
    id: "11",
  },
  {
    createdAt: "2097-10-21T06:15:54.408Z",
    name: "Wendy Bednar",
    avatar:
      "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/598.jpg",
    country: "MQ",
    phone: "827-550-7395",
    isFollowed: false,
    job: "Facilitator",
    id: "12",
  },
  {
    createdAt: "2053-10-10T19:25:01.118Z",
    name: "Hubert Ebert I",
    avatar:
      "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/637.jpg",
    country: "HT",
    phone: "838-773-8582",
    isFollowed: false,
    job: "Consultant",
    id: "13",
  },
  {
    createdAt: "2010-05-06T01:02:55.116Z",
    name: "Adrienne Pagac DDS",
    avatar:
      "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/156.jpg",
    country: "GS",
    phone: "954-620-3069",
    isFollowed: false,
    job: "Representative",
    id: "14",
  },
  {
    createdAt: "2096-03-21T02:43:11.639Z",
    name: "Katherine Marquardt",
    avatar:
      "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/600.jpg",
    country: "BE",
    phone: "768-865-2064",
    isFollowed: false,
    job: "Coordinator",
    id: "15",
  },
  {
    createdAt: "2078-09-28T05:25:11.835Z",
    name: "Mr. Ruben Nienow",
    avatar:
      "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/500.jpg",
    country: "HK",
    phone: "823-418-2280",
    isFollowed: false,
    job: "Designer",
    id: "16",
  },
  {
    createdAt: "2017-03-09T18:27:02.980Z",
    name: "Amanda Gerhold",
    avatar:
      "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/761.jpg",
    country: "SE",
    phone: "252-891-3215",
    isFollowed: false,
    job: "Supervisor",
    id: "17",
  },
  {
    createdAt: "2032-01-22T18:36:51.577Z",
    name: "Darlene Hegmann",
    avatar:
      "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/1215.jpg",
    country: "NP",
    phone: "631-273-8635",
    isFollowed: false,
    job: "Strategist",
    id: "18",
  },
  {
    createdAt: "2067-04-29T02:11:44.905Z",
    name: "Esther Purdy",
    avatar:
      "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/497.jpg",
    country: "KG",
    phone: "316-889-5489",
    isFollowed: false,
    job: "Orchestrator",
    id: "19",
  },
];

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
  const [usersArray, setUsersArray] = useState(users);

  const [search, setSearch] = useState("");

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
                <img src={`https://flagsapi.com/${user.country}/flat/24.png`} />
                <span>{user.country}</span>
              </div>
              <div>
                <button
                  onClick={() => {
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

                    setUsersArray(newArray);
                  }}
                  className={user.isFollowed ? "unfollow" : "follow"}
                >
                  {user.isFollowed ? "Unfollow" : "Follow"}
                </button>
                <button
                  onClick={() => {
                    setUsersArray(usersArray.filter((u) => u.id !== user.id));
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
