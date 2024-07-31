import axios from "axios";
import { useState, useEffect } from "react";
import User from "../components/User";

const AllUsers = () => {
  const [usersData, setUsersData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: users } = await axios.get("http://localhost:8000/users");
        const { data: usersFileData } = await axios.get(
          "http://localhost:8000/files/read-users-file"
        );
        const { data: permissionsFile } = await axios.get(
          "http://localhost:8000/files/read-permissions-file"
        );

        const combinedArray = users.map((user) => {
          const userFile = usersFileData.users.find((file) => file.id === user._id);
          const userPermissions = permissionsFile.permissions.find(
            (permission) => permission.userId === user._id
          );

          return {
            firstName: userFile.firstName,
            lastName: userFile.lastName,
            username: user.username,
            sessionTimeOut: userFile.sessionTimeOut,
            createdDate: userFile.CreatedDate,
            permissions: userPermissions.permissions,
          };
        });

        setUsersData(combinedArray);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();

    const interval = setInterval(fetchData, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {usersData.map((user, index) => {
        return <User key={index} user={user} />;
      })}
    </>
  );
};

export default AllUsers;
