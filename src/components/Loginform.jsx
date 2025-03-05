const Loginform = ({
    handleLogin,
    username,
    setUsername,
    password,
    setPassword
}) => {
    return (
        <div>
            <form onSubmit={handleLogin}>
                <h2>log in to the application</h2>
                <div>
                    username
                    <input
                        name="username"
                        type="text"
                        value={username}
                        onChange={({target}) => setUsername(target.value)} 
                    />
                </div>
                <div>
                    password
                    <input 
                        name="password"
                        type="password"
                        value={password}
                        onChange={({target}) => setPassword(target.value)}
                    />
                </div>
                <button type="submit">login</button>
            </form>
        </div>
    )
}

export default Loginform