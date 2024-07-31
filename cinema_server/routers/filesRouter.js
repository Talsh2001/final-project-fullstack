const express = require("express");
const fs = require("fs");

const router = express.Router();

router.get("/read-users-file", (req, res) => {
  try {
    const filePath = "./files/users.json";
    fs.readFile(filePath, (err, data) => {
      if (err) {
        res.status(500).send("Error reading file");
        return;
      }
      res.send(data);
    });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.get("/read-permissions-file", (req, res) => {
  try {
    const filePath = "./files/permissions.json";
    fs.readFile(filePath, (err, data) => {
      if (err) {
        res.status(500).send("Error reading file");
        return;
      }
      res.send(data);
    });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.post("/write-users-file", (req, res) => {
  const filePath = "./files/users.json";
  const newUser = req.body;

  // Read the existing users file
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      res.status(500).send("Error reading file");
      return;
    }

    try {
      // Parse the existing users
      const usersData = JSON.parse(data);

      // Add the new user to the users array
      usersData.users.push(newUser);

      // Write the updated users back to the file
      fs.writeFile(filePath, JSON.stringify(usersData, null, 2), (err) => {
        if (err) {
          res.status(500).send("Error writing to file");
          return;
        }
        res.send("Data written to file successfully");
      });
    } catch (parseErr) {
      res.status(500).send("Error parsing JSON data");
    }
  });
});

router.post("/write-permissions-file", (req, res) => {
  const filePath = "./files/permissions.json";
  const newPermission = req.body;

  // Read the existing permissions file
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      res.status(500).send("Error reading file");
      return;
    }

    try {
      // Parse the existing permissions
      const permissionsData = JSON.parse(data);

      // Add the new permission to the permissions array
      permissionsData.permissions.push(newPermission);

      // Write the updated permissions back to the file
      fs.writeFile(filePath, JSON.stringify(permissionsData, null, 2), (err) => {
        if (err) {
          res.status(500).send("Error writing to file");
          return;
        }
        res.send("Data written to file successfully");
      });
    } catch (parseErr) {
      res.status(500).send("Error parsing JSON data");
    }
  });
});

router.post("/update-user/:userId", (req, res) => {
  try {
    const { userId } = req.params;
    const filePath = "./files/users.json";
    const updatedUserData = req.body;

    // Read the existing users data
    fs.readFile(filePath, "utf8", (err, data) => {
      if (err) {
        return res.status(500).send("Error reading the file");
      }

      console.log("Data before parsing:", data); // Debug statement

      let usersData;
      try {
        usersData = JSON.parse(data);
      } catch (parseErr) {
        console.error("Error parsing JSON data:", parseErr); // Debug statement
        return res.status(500).send("Error parsing the file data");
      }

      // Find the user by id and update their data
      const userIndex = usersData.users.findIndex((user) => user.id === userId);
      if (userIndex === -1) {
        return res.status(404).send("User not found");
      }

      usersData.users[userIndex] = { ...usersData.users[userIndex], ...updatedUserData };

      // Write the updated data back to the file
      fs.writeFile(filePath, JSON.stringify(usersData, null, 2), (writeErr) => {
        if (writeErr) {
          return res.status(500).send("Error writing to the file");
        }

        res.send("User updated successfully");
      });
    });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.post("/update-permissions/:userId", (req, res) => {
  try {
    const { userId } = req.params;
    const filePath = "./files/permissions.json";
    const updatedPermissions = req.body.permissions; // Assuming the body contains an object with a 'permissions' property

    // Read the existing permissions data
    fs.readFile(filePath, "utf8", (err, data) => {
      if (err) {
        return res.status(500).send("Error reading the file");
      }

      let permissionsData;
      try {
        permissionsData = JSON.parse(data);
      } catch (parseErr) {
        return res.status(500).send("Error parsing the file data");
      }

      // Find the permissions by userId and update them
      const userPermissions = permissionsData.permissions.find(
        (perm) => perm.userId === userId
      );
      if (!userPermissions) {
        return res.status(404).send("Permissions not found for the user");
      }

      userPermissions.permissions = updatedPermissions;

      // Write the updated data back to the file
      fs.writeFile(filePath, JSON.stringify(permissionsData, null, 2), (writeErr) => {
        if (writeErr) {
          return res.status(500).send("Error writing to the file");
        }

        res.send("Permissions updated successfully");
      });
    });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.post("/remove-user/:userId", (req, res) => {
  try {
    const filePath = "./files/users.json";
    const { userId: idToRemove } = req.params; // Assuming the ID of the user to remove is sent in the request body

    // Read the existing data from the file
    fs.readFile(filePath, "utf8", (err, data) => {
      if (err) {
        res.status(500).send("Error reading file");
        return;
      }

      // Parse the JSON data into an array
      const jsonData = JSON.parse(data);

      // Find the index of the user to remove
      const indexToRemove = jsonData.users.findIndex((user) => user.id === idToRemove);

      // If the user is found, remove it from the array
      if (indexToRemove !== -1) {
        jsonData.users.splice(indexToRemove, 1);
      } else {
        res.status(404).send("User not found");
        return;
      }

      // Write the updated data back to the file
      fs.writeFile(filePath, JSON.stringify(jsonData), (err) => {
        if (err) {
          res.status(500).send("Error writing to file");
          return;
        }
        res.send("User removed successfully");
      });
    });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.post("/remove-permission/:userId", (req, res) => {
  try {
    const filePath = "./files/permissions.json";
    const { userId: userIdToRemove } = req.params; // Assuming the user ID to remove is sent in the request body

    // Read the existing data from the file
    fs.readFile(filePath, "utf8", (err, data) => {
      if (err) {
        res.status(500).send("Error reading file");
        return;
      }

      // Parse the JSON data into an array
      const jsonData = JSON.parse(data);

      // Find the index of the permission entry to remove
      const indexToRemove = jsonData.permissions.findIndex(
        (permission) => permission.userId === userIdToRemove
      );

      // If the permission entry is found, remove it from the array
      if (indexToRemove !== -1) {
        jsonData.permissions.splice(indexToRemove, 1);
      } else {
        res.status(404).send("Permission not found");
        return;
      }

      // Write the updated data back to the file
      fs.writeFile(filePath, JSON.stringify(jsonData), (err) => {
        if (err) {
          res.status(500).send("Error writing to file");
          return;
        }
        res.send("Permission removed successfully");
      });
    });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = router;
