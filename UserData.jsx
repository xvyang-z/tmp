import {useState, useEffect} from 'react';


export default function UserData({userId}){
    const [state, setState] = useState({
        user: null,
        seconds: 0,
    })

    const fetchUserData = () => {
        fetch(`https://secret.url/user/${userId}`)
            .then(response => response.json())
            .then(data => setState({...state, user: data }))
            .catch(error => console.error('Error fetching user data:', error));
    }

    useEffect(() => {
        fetchUserData()
    }, [userId]);

    useEffect(() => {
        let intervalId = setInterval(() => {
            setState(prevState => ({...state, seconds: prevState.seconds + 1 }));
        }, 1000);

        return ()=> {clearInterval(intervalId)}
    }, []);

    return (
        <div>
            <h1>User Data Component</h1>
            {state.user ? (
                <div>
                    <p>Name: {state.user.name}</p>
                    <p>Email: {state.user.email}</p>
                </div>
            ) : (
                <p>Loading user data...</p>
            )}
            <p>Timer: {state.seconds} seconds</p>
        </div>
    );

}