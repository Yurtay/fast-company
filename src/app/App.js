import React, { useState, useEffect } from "react";
import Users from "./components/users";
import api from "./api";

function App() {
    const [users, setUsers] = useState();
    useEffect(() => {
        api.users.fetchAll().then((data) => setUsers(data));
    }, []);
   

    return (
        <>
        {users && (
            <div>
            <Users
                users={users}
            />
        </div>
        )}
        </>
    );
}

export default App;
